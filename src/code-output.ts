import { CURRENT_MODE, Mode } from "./mode-switcher.js";

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

const format = (x: Date | number, chosenLocale: string, formatOptions: Record<string, unknown>) =>
	x.toLocaleString(
		chosenLocale === "" ? [] : chosenLocale,
		formatOptions
	);

const getFunction = () => ({
	[Mode.DATE]: 'const formatDate = d => d',
	[Mode.NUMBER]: 'const formatNumber = x => x',
})[CURRENT_MODE];

export const updateCodeOutput = (x: number | Date, chosenLocale: string, formatOptions: Record<string, unknown>) => {
	const locale = chosenLocale === "" ? "[]" : `"${chosenLocale}"`;
	const formatted = format(x, chosenLocale, formatOptions);

	previewElement.textContent = formatted;

	editor.setValue(`${getFunction()}.toLocaleString(${locale}, ${JSON.stringify(formatOptions, null, "\t")});`, 1);
};

const scrollDown = document.getElementById("scrollDown") as HTMLButtonElement;
scrollDown.addEventListener("click", () => {
	editor.renderer.getContainerElement().scrollIntoView({ behavior: "smooth" });
});

const copyButton = document.getElementById("copyButton") as HTMLButtonElement;
copyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(editor.getValue());
});
