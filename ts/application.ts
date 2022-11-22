//info button
const info: HTMLElement = document.getElementById("info");

info.onclick = function (): void {
	alert("Developer: Etay Gozlan\nVersion: 1\nThis is a calculator web app");
};

//light button
const mode: HTMLElement = document.getElementById("mode");
const body: HTMLElement = document.body;

mode.addEventListener("click", function (): void {
	if (body.className === "light") {
		body.className = "dark";
	} else {
		body.className = "light";
	}
});

//sci button
const sciDisplay: HTMLElement = document.getElementById("sci-display");
const sciButton: HTMLElement = document.getElementById("sci");
const sciButtonColor: string = sciButton.style.backgroundColor;

document.getElementById("sci").addEventListener("click", function (): void {
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

document.getElementById("history").addEventListener("click", function (): void {
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
