const info: HTMLElement = document.getElementById("info");
info.onclick = function (): void {
	alert("Developer: Etay Gozlan\nVersion: 1\nThis is a calculator web app");
};

const mode: HTMLElement = document.getElementById("mode");
const body: HTMLElement = document.body;

mode.addEventListener("click", function (): void {
	if (body.className === "light") {
		body.className = "dark";
	} else {
		body.className = "light";
	}
});

const sciDisplay: HTMLElement = document.getElementById("sci-display");
const sciButton: HTMLElement = document.getElementById("sci");
const sciButtonColor = sciButton.style.backgroundColor;

document.getElementById("sci").addEventListener("click", function (): void {
	if (sciDisplay.style.display !== "block") {
		sciDisplay.style.display = "block";
		sciButton.style.border = "3px solid black";
	} else {
		sciDisplay.style.display = "none";
		sciButton.style.border = "none";
	}
});

const historyDisplay: HTMLElement = document.getElementById("history-display");

document.getElementById("history").addEventListener("click", function (): void {
	if (historyDisplay.style.display !== "block") {
		historyDisplay.style.display = "block";
	} else {
		historyDisplay.style.display = "none";
	}
});
