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
	maxLines: Infinity,
	wrap: true
});

editor.renderer.setScrollMargin(5, 0, 0, 0);

const format = (x: Date | number, chosenLocale: string | null, formatOptions: Record<string, unknown>) =>
	x.toLocaleString(
		chosenLocale === null ? [] : chosenLocale,
		formatOptions
	);

const getFunction = () => ({
	[Mode.DATE]: 'const formatDate = d => d',
	[Mode.NUMBER]: 'const formatNumber = x => x',
})[CURRENT_MODE];

const stringifyObject = (x: unknown): string =>
	JSON.stringify(x, null, "\t")
		.replaceAll(/(?<=^\t+)"((?:[$_\p{ID_Start}])(?:[$_\u200C\u200D\p{ID_Continue}])*)"(?=: )/ugm, "$1");

export const updatePreview = (x: number | Date | string, chosenLocale: string | null, formatOptions: Record<string, unknown> | null) => {
	const formatted = typeof x === "string" ? x : format(x, chosenLocale, formatOptions!);
	previewElement.textContent = formatted;
};

export const updateCodeOutput = (chosenLocale: string | null, formatOptions: Record<string, unknown>) => {
	editor.setOption("mode", "ace/mode/javascript");
	const locale = chosenLocale === null ? "[]" : `"${chosenLocale}"`;
	editor.setValue(`${getFunction()}.toLocaleString(${locale}, ${stringifyObject(formatOptions)});`, 1);
};

export const displayErrorsInCodeOutput = (errors: string[]) => {
	editor.setOption("mode", "ace/mode/text");
	editor.setValue("Cannot generate code:\n" + errors.join('\n'), 1);
};

const scrollDown = document.getElementById("scrollDown") as HTMLButtonElement;
scrollDown.addEventListener("click", () => {
	editor.renderer.getContainerElement().scrollIntoView({ behavior: "smooth" });
});

const copyButton = document.getElementById("copyButton") as HTMLButtonElement;
copyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(editor.getValue());
});
