import DATE_OPTIONS from "./date-props.js";
import { locales } from "./locales.js";
import { update } from "./code-output.js";

const optionElements = new Map<string, { select: HTMLSelectElement; label: HTMLLabelElement; }>();
const formatOptions = new Map<string, unknown>();

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

let chosenLocale = "";
const setValue = ({ target }: Event) => {
	if (target === null || !(target instanceof HTMLSelectElement)) return;
	const { name, value } = target;
	const isRemovingOption = value === "";

	// 'locale' is a fake property - it actually refers to the first parameter of toLocaleString
	if (name === "locale") {
		if (!isRemovingOption)
			chosenLocale = JSON.parse(value);
	} else {

		if (isRemovingOption) {
			formatOptions.delete(name);
		} else {
			formatOptions.set(name, JSON.parse(value));
		}

		for (const blockedProp of DATE_OPTIONS[name].blocked) {
			const { select, label } = optionElements.get(blockedProp)!;
			// When adding an option, disable all properties which it blocks
			// When removing an option, enable all properties which it blocks
			select.disabled = !isRemovingOption;
			label.classList.toggle("disabled", !isRemovingOption);
		}
	}

	update(chosenLocale, Object.fromEntries(formatOptions));
};

const optionsContainer = document.getElementById("options") as HTMLDivElement;
const createOption = (name: string, values: Record<string, unknown>, description: string): void => {
	const select = create("select", { name }, [
		create("option"), // Empty <option> indicates unspecified property
		...Object.entries(values).map(([textContent, value]) =>
			create("option", { // Each possible value for this property gets an <option> element
				value: JSON.stringify(value),
				textContent // Key is textContent
			})
		),
	]);
	select.addEventListener("input", setValue);

	const label = create("label", { textContent: description });

	optionElements.set(name, { select, label });

	optionsContainer.append(create("div", { className: "option" }, [
		label,
		select
	]));
};

createOption("locale", locales, "Locale");
for (const [name, { values, description }] of Object.entries(DATE_OPTIONS)) {
	createOption(name, values, description);
}
update("", {}); // Initial update