const info = document.getElementById('info');
info.onclick = function() {
    alert('Developer: Etay Gozlan\nVersion: 1\nThis is a calculator web app')
};

const mode = document.getElementById('mode');
const body = document.body;

mode.addEventListener('click', function() {
    if (body.className === "light") {
        body.className = "dark";
    } else {
        body.className = "light";
    }
});

const sciDisplay = document.getElementById('sci-display');

document.getElementById('sci').addEventListener('click', function() {
    if (sciDisplay.style.display === 'none') {
        sciDisplay.style.display = 'block';
    } else {
        sciDisplay.style.display = 'none';
    }
});

const historyDisplay = document.getElementById('history-display')

document.getElementById('history').addEventListener('click', function() {
    if (historyDisplay.style.display === 'none') {
        historyDisplay.style.display = 'block';
    } else {
        historyDisplay.style.display = 'none';
    }
});