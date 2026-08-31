import type { Options, Rule, RuleCondition } from "./props.js";

export type ValidationError = {
	option: string;
	rule: Rule;
	message: string;
};

export type IneffectiveOption = {
	option: string;
	rule: Rule;
	message: string;
};

export type ValidationResult = {
	errors: ValidationError[];
	/** Options that are currently disabled/ineffective (prerequisite unmet), independent of whether they hold a value. */
	ineffective: IneffectiveOption[];
};

const hasOwn = (values: Record<string, unknown>, name: string): boolean => Object.hasOwn(values, name);

/**
 * Validate a set of explicitly-specified option values against the declarative rules attached to `options`.
 * `values` should only contain keys for options the caller actually specified.
 * An option that is absent from `values` is treated as "not specified" even if it has a `defaultValue`
 * defaults are only  consulted when a rule needs an *effective* value
 * (e.g. to compare two numeric options), never to decide whether something was specified.
 */
export const validateOptions = (options: Options, values: Record<string, unknown>): ValidationResult => {
	const errors: ValidationError[] = [];
	const ineffective: IneffectiveOption[] = [];
	const seenExcludePairs = new Set<string>();

	const isSpecified = (name: string) => hasOwn(values, name);
	const effective = (name: string): unknown => {
		if (isSpecified(name)) return values[name];
		const option = options[name];
		let value = option?.defaultValue;
		if (option?.minimumRelativeTo) {
			const floor = effective(option.minimumRelativeTo);
			if (typeof floor === "number" && (typeof value !== "number" || floor > value)) value = floor;
		}
		return value;
	};
	const conditionHolds = (condition: { option: string; values?: readonly unknown[]; excludeValues?: readonly unknown[]; }): boolean => {
		if (condition.values || condition.excludeValues) {
			const value = effective(condition.option);
			if (condition.excludeValues?.includes(value)) return false;
			return !condition.values || condition.values.includes(value);
		}
		// No `values`/`excludeValues` given: the condition is just "specified at all".
		return isSpecified(condition.option);
	};
	const allConditionsHold = (when: { option: string; values?: readonly unknown[]; excludeValues?: readonly unknown[]; } | readonly { option: string; values?: readonly unknown[]; excludeValues?: readonly unknown[]; }[]): boolean => Array.isArray(when) ? when.every(conditionHolds) : conditionHolds(when as { option: string; });
	// A `group` is an AND of conditions (a bare condition is a singleton group);
	// `anyGroupHolds` ORs a list of such groups together.
	const anyGroupHolds = (groups: readonly (RuleCondition | readonly RuleCondition[])[]): boolean => groups.some(group => Array.isArray(group) ? group.every(conditionHolds) : conditionHolds(group as RuleCondition));

	for (const [ownerName, option] of Object.entries(options)) {
		for (const rule of option.rules ?? []) {
			switch (rule.type) {
				case "requires": {
					const triggerActive = rule.triggerValues ? isSpecified(ownerName) && rule.triggerValues.includes(values[ownerName]) : isSpecified(ownerName);

					const prerequisiteMet = isSpecified(rule.option) &&
						(rule.value === undefined || effective(rule.option) === rule.value);

					// Rules without `triggerValues` describe a structural prerequisite for the owning option
					// to have any effect at all, so they mark it ineffective regardless of whether it currently has a value.
					if (!rule.triggerValues && !prerequisiteMet) {
						ineffective.push({ option: ownerName, rule, message: rule.message });
					}

					if (triggerActive && !prerequisiteMet && !rule.optional) {
						errors.push({ option: ownerName, rule, message: rule.message });
					}
					break;
				}

				case "excludes": {
					const triggerActive = rule.triggerValues ? isSpecified(ownerName) && rule.triggerValues.includes(values[ownerName]) : isSpecified(ownerName);
					if (!triggerActive) break;
					if (rule.values && !rule.values.includes(values[rule.option])) break;
					if (rule.unless && anyGroupHolds(rule.unless)) break;

					if (rule.soft) {
						// Disables `option` in the UI regardless of whether it already has a value - never a validation error.
						ineffective.push({ option: rule.option, rule, message: rule.message });
						break;
					}

					if (!isSpecified(rule.option)) break;

					// A mirrored pair of excludes rules (one on each side) must not produce two errors for the same conflict.
					const key = [ownerName, rule.option].sort().join(":");
					if (seenExcludePairs.has(key)) break;
					seenExcludePairs.add(key);

					errors.push({ option: rule.option, rule, message: rule.message });
					break;
				}

				case "equals": {
					if (!allConditionsHold(rule.when)) break;
					const targetName = rule.equalsOption ?? rule.option;
					if (rule.requireExplicit && !(isSpecified(rule.option) && isSpecified(targetName))) break;
					const expected = rule.equalsOption !== undefined ? effective(rule.equalsOption) : rule.value;
					if (effective(rule.option) !== expected) {
						errors.push({ option: rule.option, rule, message: rule.message });
					}
					break;
				}

				case "lessThanOrEqual": {
					if (rule.unless && anyGroupHolds(rule.unless)) break;
					const lhs = effective(ownerName);
					const rhs = effective(rule.when.option);
					if (typeof lhs === "number" && typeof rhs === "number" && lhs > rhs) {
						errors.push({ option: ownerName, rule, message: rule.message });
					}
					break;
				}

				default: break;
			}
		}
	}

	return { errors, ineffective };
};

/**
 * Development-time sanity check: every option name referenced by a rule must actually exist in `options`.
 */
export const assertRulesReferenceKnownOptions = (options: Options): void => {
	const isRuleConditionArray = (value: RuleCondition | readonly RuleCondition[]): value is readonly RuleCondition[] => {
		return Array.isArray(value);
	};

	const flattenGroups = (groups: readonly (RuleCondition | readonly RuleCondition[])[] | undefined): string[] => {
		return (groups ?? []).flatMap((group): string[] => {
			if (isRuleConditionArray(group)) {
				return group.map((condition): string => condition.option);
			}

			return [group.option];
		});
	};

	const getReferencedOptions = (rule: Rule): string[] => {
		switch (rule.type) {
			case "lessThanOrEqual":
				return [
					rule.when.option,
					...flattenGroups(rule.unless)
				];

			case "equals": {
				let whenOptions: string[];

				if (isRuleConditionArray(rule.when)) {
					whenOptions = rule.when.map((condition): string => condition.option);
				} else {
					whenOptions = [rule.when.option];
				}

				const equalsOption: string[] =
					rule.equalsOption !== undefined ? [rule.equalsOption] : [];

				return [
					rule.option,
					...whenOptions,
					...equalsOption
				];
			}

			case "excludes":
				return [
					rule.option,
					...flattenGroups(rule.unless)
				];

			case "requires":
			default:
				return [rule.option];
		}
	};

	for (const [ownerName, option] of Object.entries(options)) {
		for (const rule of option.rules ?? []) {
			const referenced = getReferencedOptions(rule);

			for (const name of referenced) {
				if (!(name in options)) {
					throw new Error(`Rule on option '${ownerName}' references unknown option '${name}'.`);
				}
			}
		}
	}
};