type Option = {
	values: Record<string, unknown>;
	label: string;
	cannotBeUsedWithOptions?: string[];
	usageCondition?: {
		/** prerequisite property & value */
		prerequisite: { name: string, value: unknown },
		// /** When this option was specified yet the prerequisite option was not */
		// prohibitedUsage: string;
		// /** When the prerequisite option was specified yet this option was not */
		// prohibitedExclusion: string;
		invalidUsage: string; // Acts as both prohibitedUsage & prohibitedExclusion
		notRequired?: never;
	} | {
		/** prerequisite property & value */
		prerequisite: { name: string, value: unknown },
		/** Indicates that the option will simply be disabled if the prerequisite is not specified */
		notRequired: true
	};
};

export type Options = Record<string, Option>;