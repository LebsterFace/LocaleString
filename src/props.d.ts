/**
 * A condition evaluated against a single option's effective value.
 * `values` omitted means "the option is specified, holding any value".
 */
export type RuleCondition = {
	option: string;
	values?: readonly unknown[];
	/** Values of `option` that fail this condition, regardless of `values`. */
	excludeValues?: readonly unknown[];
};

/**
 * Declarative cross-option constraints.
 * Each rule lives in the `rules` array of the option that owns it
 */
export type Rule = {
	type: "requires";
	/**
	 * Restricts this rule to when the owning option itself holds one of these values
	 * Omitted means the rule applies whenever the owning option is specified at all, regardless of its value
	 * Rules without `triggerValues` additionally mark the owning option as ineffective/disabled
	 * whenever the prerequisite isn't met, even before the owning option has a value
	 */
	triggerValues?: readonly unknown[];
	/** The option that must be present for the owning option to be valid. */
	option: string;
	/** If given, `option` must additionally hold this exact value. */
	value?: unknown;
	/** Downgrades a violation from an error to an ineffective/disabled option. */
	optional?: true;
	message: string;
} | {
	type: "excludes";
	/** Same meaning as `requires`' `triggerValues`. Omitted = triggers whenever the owning option is specified. */
	triggerValues?: readonly unknown[];
	/** The option that must not be specified while the trigger holds. */
	option: string;
	/** Restricts the exclusion to these values of `option`. Omitted = any specified value is excluded. */
	values?: readonly unknown[];
	/** Skip this exclusion entirely if any AND-group in this list holds (OR'd together). */
	unless?: readonly (RuleCondition | readonly RuleCondition[])[];
	/**
	 * A soft exclusion only disables `option` in the UI, without producing a validation error
	 */
	soft?: true;
	message: string;
} | ({
	type: "equals";
	/**
	 * Gate: this rule only applies while every condition holds (a single condition, or an AND of several).
	 */
	when: RuleCondition | readonly RuleCondition[];
	/** The option that must equal the expected value while `when` holds. */
	option: string;
	/**
	 * When true, only evaluate if both `option` and the comparison target are explicitly specified
	 * Use this when the real default for one side isn't known generically (e.g. it's currency-specific).
	 */
	requireExplicit?: true;
	message: string;
} & (
		{ value: unknown; equalsOption?: undefined; } |
		{ equalsOption: string; value?: undefined; }
	)
	) | {
		type: "lessThanOrEqual";
		/** The owning option's effective value must be <= this option's effective value. */
		when: { option: string; };
		/**
		 * Skip this check entirely if any AND-group in this list holds (the list is OR'd together, each group is AND'd internally).
		 * A bare `RuleCondition` is shorthand for a single-condition group.
		 */
		unless?: readonly (RuleCondition | readonly RuleCondition[])[];
		message: string;
	};

type OptionBase = {
	defaultValue?: unknown;
	/**
	 * When this option is unspecified, its effective value (for validation purposes) is raised to
	 * at least the effective value of the referenced option, on top of `defaultValue`.
	 * Mirrors Intl.NumberFormat's own default computation for `maximumFractionDigits`,
	 * whose default rises to match an explicitly-larger `minimumFractionDigits`.
	 */
	minimumRelativeTo?: string;
	labelText: string;
	rules?: readonly Rule[];
};

export type Option = OptionBase & ({ values: Record<string, unknown>; } | {
	min: number;
	max: number;
	defaultValue?: number;
});

export type Options = Record<string, Option>;