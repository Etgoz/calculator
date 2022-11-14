let cur;
let a;
let oprator;
let b;

function add(x, y){
    return x+y;
}

function sub(x, y){
    return x-y;
}

function divide(x, y){
    return x/y;
}    

function multiply(x, y){
    return x*y;
}

let input;

Array.from(document.getElementsByClassName('operand')).forEach(button =>{
    button.onclick = function() {
        input = button.value;
        console.log(input);}
});

