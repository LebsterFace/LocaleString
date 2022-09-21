import DATE_OPTIONS from "./date-props.js";
import NUMBER_OPTIONS from "./number-props.js";
import { locales } from "./locales.js";
import { displayErrorsInCodeOutput, updateCodeOutput, updatePreview } from "./code-output.js";
import { CURRENT_MODE, Mode } from "./mode-switcher.js";
import { Option } from "./props.js";

const create = <K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	attributes: Record<string, unknown> = {},
	children: HTMLElement[] = []
): HTMLElementTagNameMap[K] => {
	const element = document.createElement(tagName);
	Object.assign(element, attributes);
	element.append(...children);
	return element;
};

const OPTIONS = {
	[Mode.DATE]: DATE_OPTIONS,
	[Mode.NUMBER]: NUMBER_OPTIONS,
}[CURRENT_MODE];

const inputElement = document.querySelector("#main input") as HTMLInputElement;

inputElement.addEventListener("input", () => {
	update();
}, { passive: true });

const inputValue = () => ({
	[Mode.DATE]: new Date(),
	[Mode.NUMBER]: Number(inputElement.value)
})[CURRENT_MODE];

type OptionWrapper = {
	select: HTMLSelectElement;
	label: HTMLLabelElement;
	container: HTMLDivElement;
	name: string;
};
const optionElements = new Map<string, OptionWrapper>();
const formatOptions = new Map<string, unknown>();

const setDisabled = ({ select, container }: OptionWrapper, force: boolean) => {
	select.disabled = force;
	container.classList.toggle("disabled", force);
};

const setTooltip = ({ container }: OptionWrapper, message: string | null) => {
	if (message === null) {
		container.dataset.tooltip = '';
		container.dataset.flow = '';
	} else {
		container.dataset.tooltip = message;
		container.dataset.flow = 'left';
	}
};

const update = () => {
	let valid = true;
	const errorMessages = [];
	const disabledOptions = new Map<OptionWrapper, string>();

	for (const option of optionElements.values()) {
		// Reset options
		setTooltip(option, null);
		setDisabled(option, false);

		const { container, name } = option;
		const { usageCondition, mutuallyExcludes, labelText } = OPTIONS[name];
		const hasValue = option.select.value !== "";

		if (mutuallyExcludes) {
			for (const excludedOptionName of mutuallyExcludes) {
				const excludedOption = optionElements.get(excludedOptionName);

				if (!excludedOption) {
					alert(`Please contact me (Lebster) with the following message:\nNon-existent option '${excludedOptionName}'`);
					continue;
				}

				if (hasValue) {
					disabledOptions.set(excludedOption, labelText);
				}
			}
		} else if (usageCondition) {
			const { prerequisite, optional } = usageCondition;
			const conditionSatisfied = formatOptions.get(prerequisite.name) === prerequisite.value;


			setDisabled(option, !conditionSatisfied);
			if (!conditionSatisfied) {
				setTooltip(option, usageCondition.message);
				continue;
			}

			if (!optional) {
				// Required but not specified
				if (!hasValue) {
					// Is error
					setTooltip(option, usageCondition.message);
					errorMessages.push(usageCondition.message);
					container.classList.add("invalid");
					valid = false;
				} else {
					container.classList.remove("invalid");
				}
			}
		}
	}

	for (const [o, disabledBy] of disabledOptions) {
		setDisabled(o, true);
		setTooltip(o, `"${OPTIONS[o.name].labelText}" cannot be used with "${disabledBy}"`);
	}

	if (valid) {
		// Get all non-disabled options
		const opts = Object.fromEntries(
			[...formatOptions.entries()]
				.filter(([key, value]) => !optionElements.get(key)!.select.disabled)
		);
		updatePreview(inputValue(), chosenLocale, opts);
		updateCodeOutput(chosenLocale, opts);
	} else {
		displayErrorsInCodeOutput(errorMessages);
		updatePreview('-', null, null);
	}
};

let chosenLocale: string | null = null;
const setValue = ({ target }: Event) => {
	if (target === null || !(target instanceof HTMLSelectElement)) return;
	const { name, value } = target;
	const isRemovingOption = value === "";

	// 'locale' is a fake option - it actually refers to the first parameter of toLocaleString
	if (name === "locale") {
		chosenLocale = isRemovingOption ? null : JSON.parse(value);
	} else if (isRemovingOption) {
		formatOptions.delete(name);
	} else {
		formatOptions.set(name, JSON.parse(value));
	}

	update();
};

const optionsContainer = document.getElementById("options") as HTMLDivElement;
const createOption = (name: string, option: Option): OptionWrapper => {
	const select = create("select", {
		name,
		required: option.usageCondition?.optional ?? false
	}, [
		create("option"), // Empty <option> indicates unspecified property
		...Object.entries(option.values).map(([textContent, value]) =>
			create("option", { // Each possible value for this property gets an <option> element
				value: JSON.stringify(value),
				textContent // Key is textContent
			})
		),
	]);
	select.addEventListener("input", setValue);

	const label = create("label", { textContent: option.labelText });
	const container = create("div", { className: "option" }, [
		label,
		select
	]);

	optionsContainer.append(container);

	return { select, label, container, name };
};

createOption("locale", { labelText: "Locale", values: locales });
for (const [name, option] of Object.entries(OPTIONS)) {
	optionElements.set(name, createOption(name, option));
}

update();// Initial update