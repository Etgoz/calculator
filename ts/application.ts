//info button
const info: HTMLElement = document.getElementById("info");
let screenLight: string = "off";

info.onclick = function (): void {
	alert("Developer: Etay Gozlan\nVersion: 1\nThis is a calculator web app");
};

//light (#mode) button
const mode: HTMLElement = document.getElementById("mode");
const modeButtonColor = mode.style.backgroundColor;
const screenColor = myScreen.style.backgroundColor;
const body: HTMLElement = document.body;

mode.addEventListener("click", function (): void {
	if (screenLight === "off") {
		screenLight = "on";
		myScreen.style.backgroundColor = "yellow";
		mode.style.color = "white";
		if (body.className === "light") {
			mode.style.backgroundColor = "#003b7d";
		} else {
			mode.style.backgroundColor = "#56564f";
		}
	} else {
		screenLight = "off";
		myScreen.style.backgroundColor = screenColor;
		mode.style.color = "black";
		mode.style.backgroundColor = modeButtonColor;
	}
	// if (body.className === "light") {
	// 	body.className = "dark";
	// } else {
	// 	body.className = "light";
	// }
});

//sci button
const sciDisplay: HTMLElement = document.getElementById("sci-display");
const sciButton: HTMLElement = document.getElementById("sci");
const sciButtonColor: string = sciButton.style.backgroundColor;

sciButton.addEventListener("click", function (): void {
	if (sciDisplay.style.display !== "block") {
		sciDisplay.style.display = "block";
		sciButton.style.color = "white";
		if (body.className === "light") {
			sciButton.style.backgroundColor = "#003b7d";
		} else {
			sciButton.style.backgroundColor = "#56564f";
		}
	} else {
		sciDisplay.style.display = "none";
		sciButton.style.color = "black";
		sciButton.style.backgroundColor = sciButtonColor;
	}
});

//history button
const historyDisplay: HTMLElement = document.getElementById("history-display");
const historyButton: HTMLElement = document.getElementById("history");
const historyButtonColor: string = historyButton.style.backgroundColor;

historyButton.addEventListener("click", function (): void {
	if (historyDisplay.style.display !== "block") {
		historyDisplay.style.display = "block";
		historyButton.style.color = "white";
		if (body.className === "light") {
			historyButton.style.backgroundColor = "#003b7d";
		} else {
			historyButton.style.backgroundColor = "#56564f";
		}
	} else {
		historyDisplay.style.display = "none";
		historyButton.style.color = "black";
		historyButton.style.backgroundColor = sciButtonColor;
	}
});

//config button
const configButton = document.getElementById("config");

configButton.addEventListener("click", () => {
	window.location.href = "./config.html";
});

window.document.addEventListener("DOMContentLoaded", () => {
	const url = window.location.search;
	if (url) {
		const configs = new URLSearchParams(url);
		const body = document.querySelector("body");
		body.style.backgroundColor = configs.get("bg-color");
		body.style.fontFamily = configs.get("font-family");
		body.className = configs.get("theme");
	}
});

//history log
function renderHistory(): void {
	if (myHistory) {
		myHistory.slice(-2).forEach((el) => {
			let newDiv: HTMLDivElement = document.createElement("div");
			newDiv.innerText = el;
			historyDisplay.appendChild(newDiv);
		});
	}
}

document.getElementById("equal").addEventListener("click", () => {
	renderHistory();
});
