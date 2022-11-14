function displayButtonInfo(value){
    alert(value);
}

Array.from(document.getElementsByTagName('button')).forEach(button =>{
    button.onclick = function() {displayButtonInfo(button.value)}
});

let info = document.getElementById('info');
info.onclick = function() {
    alert('Developer: Etay Gozlan\nVersion: 1\nThis is a calculator web app')
};