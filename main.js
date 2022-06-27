// @ts-check
"use strict";;
/** @type {HTMLHeadingElement} */
// @ts-ignore
const result = document.getElementById("result");

/** @type {HTMLDivElement} */
// @ts-ignore
const optionsContainer = document.getElementById("options");

/** @type {HTMLPreElement} */
// @ts-ignore
const codeElement = document.getElementById("codebox");

const optionElements = {};
const formatOptions = {};

let chosenLocale = "";

const getFormattedDate = () => new Date().toLocaleString(chosenLocale === "" ? [] : chosenLocale, formatOptions);

function update() {
	const stringifiedLocale = chosenLocale === "" ? "[]" : `"${chosenLocale}"`;
	const stringifiedFormatOptions = JSON.stringify(formatOptions, undefined, "\t");
	const formattedDate = getFormattedDate();
	
	result.textContent = formattedDate;
	codeElement.textContent = `const formatDate = d => d.toLocaleString(${stringifiedLocale}, ${stringifiedFormatOptions});\n\nformatDate(new Date()) // ${formattedDate}`;
}

{
	const select = document.createElement("select");
	select.appendChild(document.createElement("option"));
	for (const [readable, language_tag] of Object.entries(locales)) {
		const option = document.createElement("option");
		option.value = language_tag;
		option.appendChild(document.createTextNode(readable));
		select.appendChild(option);
	}

	const label = document.createElement("label");
	label.innerText = "Locale";
	select.name = "locale";
	select.addEventListener("input", () => {
		chosenLocale = select.value;
		update();
	});

	const container = document.createElement("div");
	container.appendChild(label);
	container.appendChild(select);
	container.classList.add("option");
	optionsContainer.appendChild(container);
}

const setValue = ({ target }) => {
	if (target.value === "") {
		delete formatOptions[target.name];
		for (const blockedProp of possibleProps[target.name].blocked) {
			optionElements[blockedProp].select.disabled = false;
			optionElements[blockedProp].label.classList.remove("disabled");
		}
	} else {
		for (const blockedProp of possibleProps[target.name].blocked) {
			optionElements[blockedProp].select.disabled = true;
			optionElements[blockedProp].label.classList.add("disabled");
		}

		formatOptions[target.name] = target.value;
	}

	update();
};

for (const key in possibleProps) {
	const container = document.createElement("div");
	const label = document.createElement("label");
	const select = document.createElement("select");
	const hasReadables = possibleProps[key].readableValues;
	const optionTextValues = hasReadables ? hasReadables : possibleProps[key].values;

	select.appendChild(document.createElement("option"));

	for (let i = 0; i < possibleProps[key].values.length; i++) {
		const option = document.createElement("option");
		option.value = possibleProps[key].values[i];
		option.appendChild(document.createTextNode(optionTextValues[i]));
		select.appendChild(option);
	}

	label.innerText = possibleProps[key].description;
	select.name = key;
	select.addEventListener("input", setValue);
	container.appendChild(label);
	container.appendChild(select);
	container.classList.add("option");
	optionElements[key] = { select, label };
	optionsContainer.appendChild(container);
}

update();

/** @type {HTMLButtonElement} */
// @ts-ignore
const scrollDown = document.getElementById("scrollDown");
scrollDown.addEventListener("click", function () {
	codeElement.scrollIntoView({ behavior: "smooth" });
});

/** @type {HTMLButtonElement} */
// @ts-ignore
const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", function () {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(codeElement.textContent);
	} else {
		const range = document.createRange();
		const sel = window.getSelection();
		range.selectNodeContents(codeElement);
		sel.removeAllRanges();
		sel.addRange(range);

		codeElement.focus();

		try {
			document.execCommand("copy");
		} catch (err) {
		}
	}
});
