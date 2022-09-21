const previewElement = document.getElementById("preview") as HTMLHeadingElement;

const editor = ace.edit("codebox");
editor.setOptions({
	theme: "ace/theme/dracula",
	mode: "ace/mode/javascript",
	fontSize: "1rem",
	fontFamily: "var(--code-font)",
	readOnly: true,
	useWorker: false,
	showPrintMargin: false,
	maxLines: Infinity
});

editor.renderer.setScrollMargin(5, 0, 0, 0);

const getFormattedDate = (chosenLocale: string, formatOptions: Record<string, unknown>) =>
	new Date().toLocaleString(
		chosenLocale === "" ? [] : chosenLocale,
		formatOptions
	);

export const update = (chosenLocale: string, formatOptions: Record<string, unknown>) => {
	const locale = chosenLocale === "" ? "[]" : `"${chosenLocale}"`;
	const formattedDate = getFormattedDate(chosenLocale, formatOptions);

	previewElement.textContent = formattedDate;

	editor.setValue([
		`const formatDate = d => d.toLocaleString(${locale}, ${JSON.stringify(formatOptions, null, "\t")});`,
		'',
		`formatDate(new Date()) // => ${JSON.stringify(formattedDate)}`
	].join("\n"), 1);
};

const scrollDown = document.getElementById("scrollDown") as HTMLButtonElement;
scrollDown.addEventListener("click", () => {
	editor.renderer.getContainerElement().scrollIntoView({ behavior: "smooth" });
});

const copyButton = document.getElementById("copyButton") as HTMLButtonElement;
copyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(editor.getValue());
});
