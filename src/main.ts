import DATE_OPTIONS from "./date-props.js";
import NUMBER_OPTIONS from "./number-props.js";
import { locales } from "./locales.js";
import { displayErrorsInCodeOutput, updateCodeOutput, updatePreview } from "./code-output.js";
import { CURRENT_MODE, Mode } from "./mode-switcher.js";
import { Option } from "./props.js";
import COMMON_PROPS from "./common-props.js";
import { validateOptions } from "./validation.js";

const create = <K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	attributes: Record<string, unknown> = {}
): HTMLElementTagNameMap[K] => {
	const element = document.createElement(tagName);
	Object.assign(element, attributes);
	return element;
};

const OPTIONS = {
	[Mode.DATE]: { ...DATE_OPTIONS, ...COMMON_PROPS },
	[Mode.NUMBER]: { ...NUMBER_OPTIONS, ...COMMON_PROPS }
}[CURRENT_MODE];

const inputElement = document.querySelector("#main input") as HTMLInputElement;

const inputValue = () => ({
	[Mode.DATE]: new Date(),
	[Mode.NUMBER]: Number(inputElement.value)
})[CURRENT_MODE];

type OptionWrapper = {
	control: HTMLSelectElement | HTMLInputElement;
	label: HTMLLabelElement;
	container: HTMLDivElement;
	name: string;
};
const optionElements = new Map<string, OptionWrapper>();
const formatOptions = new Map<string, unknown>();

const setDisabled = ({ control, container }: OptionWrapper, force: boolean) => {
	control.disabled = force;
	container.classList.toggle("disabled", force);
};

const setTooltip = ({ container }: OptionWrapper, message: string | null) => {
	if (message === null) {
		container.dataset.tooltip = "";
		container.dataset.flow = "";
	} else {
		container.dataset.tooltip = message;
		container.dataset.flow = "right";
	}
};

let chosenLocale = "runtime-default";
let unitPer: string | null = null;
const SPECIAL_HANDLERS: Record<string, (value: string | null) => void> = {
	// First parameter of toLocaleString
	locale: (value) => {
		chosenLocale = value ?? "runtime-default";
	},

	// '-per-{unit}' suffix for the 'unit' option
	unitPer: (value) => {
		unitPer = value;
	}
};

const update = () => {
	let valid = true;
	const errorMessages = [];

	for (const option of optionElements.values()) {
		// Reset options
		setTooltip(option, null);
		setDisabled(option, false);
		option.container.classList.remove("invalid");
	}

	const { errors, ineffective } = validateOptions(OPTIONS, Object.fromEntries(formatOptions));

	for (const { option: name, message } of ineffective) {
		const wrapper = optionElements.get(name);
		if (!wrapper) continue;
		setDisabled(wrapper, true);
		setTooltip(wrapper, message);
	}

	for (const { option: name, message } of errors) {
		const wrapper = optionElements.get(name);
		if (!wrapper) continue;
		setTooltip(wrapper, message);
		wrapper.container.classList.add("invalid");
		errorMessages.push(message);
		valid = false;
	}

	if (valid) {
		// Get all non-disabled options
		const opts = Object.fromEntries([...formatOptions.entries()]
			.filter(([key]) => !optionElements.get(key)!.control.disabled));

		if (typeof opts.unit === "string" && unitPer !== null) {
			opts.unit += "-per-" + unitPer;
		}

		updatePreview(inputValue(), chosenLocale, opts);
		updateCodeOutput(chosenLocale, opts);
	} else {
		displayErrorsInCodeOutput(errorMessages);
		updatePreview("-", "runtime-default", null);
	}
};

const setValue = ({ target }: Event) => {
	if (target === null || !(target instanceof HTMLSelectElement || target instanceof HTMLInputElement)) return;
	target.reportValidity();
	const { name, value, dataset: { defaultValue } } = target;
	const isRemovingOption = value === "";
	let realValue: unknown;
	if (isRemovingOption) {
		realValue = "";
	} else if (target.type === "number") {
		realValue = Number(value);
	} else {
		realValue = JSON.parse(value);
	}

	const handler = SPECIAL_HANDLERS[name];
	if (handler) {
		handler(isRemovingOption ? null : realValue as string);
	} else if (isRemovingOption || realValue === JSON.parse(defaultValue ?? '""')) {
		formatOptions.delete(name);
	} else {
		formatOptions.set(name, realValue);
	}

	update();
};

const optionsContainer = document.getElementById("options") as HTMLDivElement;
const createOption = (name: string, option: Option): OptionWrapper => {
	let control: HTMLSelectElement | HTMLInputElement;
	if ("min" in option) {
		control = create("input", {
			name,
			type: "number",
			min: option.min,
			max: option.max
		});

		if (typeof option.defaultValue === "number") {
			control.value = option.defaultValue.toString();
		}
	} else {
		control = create("select", { name });

		if (!option.defaultValue) {
			// Empty <option> to indicate non-specified property
			control.append(create("option"));
		}

		control.append(...Object.entries(option.values).map(([key, value]) => create("option", {
			// Each possible value for this property gets an <option> element
			value: option.defaultValue === value ? "" : JSON.stringify(value),
			textContent: option.defaultValue === value ? `${key} (Default)` : key,
			selected: option.defaultValue === value
		})));
	}

	if ("defaultValue" in option) control.dataset.defaultValue = JSON.stringify(option.defaultValue);
	control.addEventListener("input", setValue);

	const label = create("label", { textContent: option.labelText });
	const container = create("div", { className: "option" });
	container.append(label, control);

	optionsContainer.append(container);

	return { control, label, container, name };
};

createOption("locale", {
	labelText: "Locale",
	values: locales,
	defaultValue: "runtime-default"
});

for (const [name, option] of Object.entries(OPTIONS)) {
	optionElements.set(name, createOption(name, option));
}

inputElement.addEventListener("input", () => {
	update();
}, { passive: true });

// Initial update
update();