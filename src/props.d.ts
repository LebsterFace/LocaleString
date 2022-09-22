type Option = ({
	values: Record<string, unknown>;
	labelText: string;
	mutuallyExcludes?: string[];
	usageCondition?: {
		/** prerequisite property & value */
		prerequisite: { name: string, value: unknown; };
		// /** When this option was specified yet the prerequisite option was not */
		// prohibitedUsage: string;
		// /** When the prerequisite option was specified yet this option was not */
		// prohibitedExclusion: string;
		message: string; // Acts as both prohibitedUsage & prohibitedExclusion
		/** Indicates that the option will simply be disabled if the prerequisite is not specified */
		optional?: true;
	};
});

export type Options = Record<string, Option>;