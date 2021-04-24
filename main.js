const result = document.getElementById("result"),
	optionsContainer = document.getElementById("options"),
	optionElements = {},
	codeElement = document.getElementById("codebox"),
	formatOptions = {};

for (const key in possibleProps) {
	const container = document.createElement("div"),
		label = document.createElement("label"),
		select = document.createElement("select"),
		hasReadables = possibleProps[key].readableValues,
		optionTextValues = hasReadables ? hasReadables : possibleProps[key].values;

	select.appendChild(document.createElement("option"));

	for (let i = 0; i < possibleProps[key].values.length; i++) {
		const option = document.createElement("option");
		option.value = possibleProps[key].values[i];
		option.appendChild(document.createTextNode(optionTextValues[i]));
		select.appendChild(option);
	}

	label.innerText = possibleProps[key].description;
	select.name = key;
	select.oninput = setValue;
	container.appendChild(label);
	container.appendChild(select);
	container.classList.add("option");
	optionElements[key] = {select, label};
	optionsContainer.appendChild(container);
}

function setValue(ev) {
	const target = ev.target;

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
}

function getFormattedDate() {
	return new Date().toLocaleString("en-US", formatOptions);
}

function update() {
	result.innerText = getFormattedDate();
	codeElement.textContent = `const formatDate = d => d.toLocaleString("en-US", ${JSON.stringify(formatOptions, undefined, "\t")});\n\nformatDate(new Date()) // ${getFormattedDate()}`;
}

update();

const scrollDown = document.getElementById("scrollDown");
scrollDown.addEventListener("click", function() {
	codeElement.scrollIntoView({behavior: "smooth"});
});

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", function() {
	const range = document.createRange(),
		sel = window.getSelection();

	range.selectNodeContents(codeElement);
	sel.removeAllRanges();
	sel.addRange(range);
	document.execCommand("copy");
});
