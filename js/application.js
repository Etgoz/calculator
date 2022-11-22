//info button
const info = document.getElementById("info");
let screenLight = "off";
info.onclick = function () {
    alert("Developer: Etay Gozlan\nVersion: 1\nThis is a calculator web app");
};
//light (#mode) button
const mode = document.getElementById("mode");
const modeButtonColor = mode.style.backgroundColor;
const screenColor = myScreen.style.backgroundColor;
const body = document.body;
mode.addEventListener("click", function () {
    if (screenLight === "off") {
        screenLight = "on";
        myScreen.style.backgroundColor = "yellow";
        mode.style.color = "white";
        if (body.className === "light") {
            mode.style.backgroundColor = "#003b7d";
        }
        else {
            mode.style.backgroundColor = "#56564f";
        }
    }
    else {
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
const sciDisplay = document.getElementById("sci-display");
const sciButton = document.getElementById("sci");
const sciButtonColor = sciButton.style.backgroundColor;
sciButton.addEventListener("click", function () {
    if (sciDisplay.style.display !== "block") {
        sciDisplay.style.display = "block";
        sciButton.style.color = "white";
        if (body.className === "light") {
            sciButton.style.backgroundColor = "#003b7d";
        }
        else {
            sciButton.style.backgroundColor = "#56564f";
        }
    }
    else {
        sciDisplay.style.display = "none";
        sciButton.style.color = "black";
        sciButton.style.backgroundColor = sciButtonColor;
    }
});
//history button
const historyDisplay = document.getElementById("history-display");
const historyButton = document.getElementById("history");
const historyButtonColor = historyButton.style.backgroundColor;
historyButton.addEventListener("click", function () {
    if (historyDisplay.style.display !== "block") {
        historyDisplay.style.display = "block";
        historyButton.style.color = "white";
        if (body.className === "light") {
            historyButton.style.backgroundColor = "#003b7d";
        }
        else {
            historyButton.style.backgroundColor = "#56564f";
        }
    }
    else {
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
function renderHistory() {
    if (myHistory) {
        myHistory.slice(-2).forEach((el) => {
            let newDiv = document.createElement("div");
            newDiv.innerText = el;
            historyDisplay.appendChild(newDiv);
        });
    }
}
document.getElementById("equal").addEventListener("click", () => {
    renderHistory();
});
