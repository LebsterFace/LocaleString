import { CURRENT_MODE, Mode } from "./mode-switcher.js";
declare const ace: typeof import("ace-builds");

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

const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
const updateTheme = () => {
	editor.setTheme(darkMode.matches ? "ace/theme/dracula" : "ace/theme/chrome");
};

darkMode.addEventListener("change", updateTheme, { passive: true });
updateTheme();

const chosenLocaleCode = (chosenLocale: string) => {
	if (chosenLocale === "runtime-default") return "[]";
	if (chosenLocale === "user-preference") return "navigator.languages";
	return JSON.stringify(chosenLocale);
};

const chosenLocaleValue = (chosenLocale: string) => {
	if (chosenLocale === "runtime-default") return [];
	if (chosenLocale === "user-preference") return navigator.languages;
	return chosenLocale;
};

const format = (x: Date | number, chosenLocale: string, formatOptions: Record<string, unknown>) => x.toLocaleString(
	chosenLocaleValue(chosenLocale),
	formatOptions
);

const getFunction = () => ({
	[Mode.DATE]: "const formatDate = d => d",
	[Mode.NUMBER]: "const formatNumber = x => x"
})[CURRENT_MODE];

const stringifyObject = (x: unknown): string => JSON.stringify(x, null, "\t")
	.replaceAll(/(?<whitespace>^\t+)"(?<name>(?:[$_\p{ID_Start}])(?:[$_\u200C\u200D\p{ID_Continue}])*)"(?=: )/ugm, "$1$2");

export const updatePreview = (x: number | Date | string, chosenLocale: string, formatOptions: Record<string, unknown> | null) => {
	const formatted = typeof x === "string" ? x : format(x, chosenLocale, formatOptions!);
	previewElement.textContent = formatted;
};

export const updateCodeOutput = (chosenLocale: string, formatOptions: Record<string, unknown>) => {
	editor.setOption("mode", "ace/mode/javascript");
	const locale = chosenLocaleCode(chosenLocale);
	editor.setValue(`${getFunction()}.toLocaleString(${locale}, ${stringifyObject(formatOptions)});`, 1);
};

export const displayErrorsInCodeOutput = (errors: string[]) => {
	editor.setOption("mode", "ace/mode/text");
	editor.setValue("Cannot generate code:\n" + errors.join("\n"), 1);
};

const copy = document.getElementById("copy") as HTMLButtonElement;
copy.addEventListener("click", async () => {
	await navigator.clipboard.writeText(editor.getValue());
}, { passive: true });