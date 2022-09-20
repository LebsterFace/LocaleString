import DATE_OPTIONS from "./date-props.js";
import { locales } from "./locales.js";

const result = document.getElementById("result") as HTMLHeadingElement;
const optionsContainer = document.getElementById("options") as HTMLDivElement;
const codeElement = document.getElementById("codebox") as HTMLPreElement;

const optionElements = new Map<string, { select: HTMLSelectElement; label: HTMLLabelElement; }>();
const formatOptions = new Map<string, unknown>();

let chosenLocale = "";

const getFormattedDate = () =>
	new Date().toLocaleString(
		chosenLocale === "" ? [] : chosenLocale,
		Object.fromEntries(formatOptions)
	);

const update = () => {
	const stringifiedLocale = chosenLocale === "" ? "[]" : `"${chosenLocale}"`;
	const stringifiedFormatOptions = JSON.stringify(
		Object.fromEntries(formatOptions),
		undefined,
		"\t"
	);
	const formattedDate = getFormattedDate();

	result.textContent = formattedDate;
	codeElement.textContent = `const formatDate = d => d.toLocaleString(${stringifiedLocale}, ${stringifiedFormatOptions});\n\nformatDate(new Date()) // ${formattedDate}`;
};

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

const setValue = ({ target }: Event) => {
	if (target === null || !(target instanceof HTMLSelectElement)) return;
	const { name, value } = target;

	// 'locale' is a fake property - it actually refers to the first parameter of toLocaleString
	if (name === "locale") {
		chosenLocale = value;
	} else {
		const isRemovingOption = value === "";

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

	update();
};

const createOption = (name: string, values: unknown[], displayValues: unknown[], description: string): void => {
	const select = create("select", { name }, [
		create("option"), // Empty <option> indicates unspecified property
		...values.map((value, i) => // Each possible value for this property
			create("option", {
				value: JSON.stringify(value), // Gets an <option> element
				textContent: displayValues[i] as string // Could be simplified if all DATE_OPTIONS had readableValues (no linked arrays needed)
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

createOption("locale", Object.values(locales), Object.keys(locales), "Locale")
for (const [name, { values, readableValues, description }] of Object.entries(DATE_OPTIONS)) {
	createOption(name, values, readableValues ?? values, description);
}

update();

const scrollDown = document.getElementById("scrollDown") as HTMLButtonElement;
scrollDown.addEventListener("click", () => {
	codeElement.scrollIntoView({ behavior: "smooth" });
});

const copyButton = document.getElementById("copyButton") as HTMLButtonElement;
copyButton.addEventListener("click", () => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(codeElement.textContent!);
		return;
	} else {
		codeElement.focus();

		if ('createTextRange' in document.body) {
			// @ts-ignore
			const range = document.body.createTextRange();
			range.moveToElementText(codeElement);
			range.select();
		} else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(codeElement);
			if (!selection) return;
			selection.removeAllRanges();
			selection.addRange(range);
		}

		try {
			document.execCommand("copy");
		} catch { }
	}
});
