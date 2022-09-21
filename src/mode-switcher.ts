const modeDropdown = document.querySelector("#mode select") as HTMLSelectElement;

export enum Mode {
	DATE = "date",
	NUMBER = "number"
};

const getMode = (): Mode | null => {
	const { searchParams } = new URL(location.href);
	const param = searchParams.get("mode");
	return (Object.values(Mode) as unknown[]).includes(param) ? param as Mode : null;
}

export let CURRENT_MODE = getMode() ?? Mode.DATE;
modeDropdown.value = CURRENT_MODE;
document.documentElement.dataset.mode = CURRENT_MODE;

modeDropdown.addEventListener("input", () => {
	const u = new URL(location.href);
	u.searchParams.set("mode", modeDropdown.value);
	location.href = u.toString(); // FIXME: Avoid reload
});
