import DATE_OPTIONS from "./date-props.js";
import NUMBER_OPTIONS from "./number-props.js";
import { locales } from "./locales.js";
import { updateCodeOutput } from "./code-output.js";
import { CURRENT_MODE, Mode } from "./mode-switcher.js";
import { Option } from "./props.js";

const create = <K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	attributes: Record<string, string> = {},
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
	updateCodeOutput(inputValue(), chosenLocale, Object.fromEntries(formatOptions));
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

const update = () => {
	updateCodeOutput(inputValue(), "", {});
	for (const { select, label, container, name } of optionElements.values()) {
		const { usageCondition } = OPTIONS[name];
		if (!usageCondition) continue;
		if (!(usageCondition.notRequired)) {
			const { invalidUsage, prerequisite } = usageCondition;
			const conditionSatisfied = formatOptions.get(prerequisite.name) === prerequisite.value;

			select.disabled = !conditionSatisfied;
			container.classList.toggle("disabled", !conditionSatisfied);

			if (conditionSatisfied) {
				container.dataset.tooltip = '';
				container.dataset.flow = '';
			} else if (!label.querySelector(".tooltip")) {
				container.dataset.tooltip = invalidUsage;
				container.dataset.flow = 'top';
			}
		}
	}
};

let chosenLocale = "";
const setValue = ({ target }: Event) => {
	if (target === null || !(target instanceof HTMLSelectElement)) return;
	const { name, value } = target;
	const isRemovingOption = value === "";

	// 'locale' is a fake option - it actually refers to the first parameter of toLocaleString
	if (name === "locale") {
		if (!isRemovingOption)
			chosenLocale = JSON.parse(value);
	} else {
		if (isRemovingOption) {
			formatOptions.delete(name);
		} else {
			formatOptions.set(name, JSON.parse(value));
		}
	}

	update();
};

const optionsContainer = document.getElementById("options") as HTMLDivElement;
const createOption = (name: string, option: Option): OptionWrapper => {
	const select = create("select", { name }, [
		create("option"), // Empty <option> indicates unspecified property
		...Object.entries(option.values).map(([textContent, value]) =>
			create("option", { // Each possible value for this property gets an <option> element
				value: JSON.stringify(value),
				textContent // Key is textContent
			})
		),
	]);
	select.addEventListener("input", setValue);

	const label = create("label", { textContent: option.label });
	const container = create("div", { className: "option" }, [
		label,
		select
	]);

	optionsContainer.append(container);

	return { select, label, container, name };
};

createOption("locale", { label: "Locale", values: locales });
for (const [name, option] of Object.entries(OPTIONS)) {
	optionElements.set(name, createOption(name, option));
}

update();// Initial update