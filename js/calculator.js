let last;
let a = '';
let operator;
let b = '';

const screen = document.querySelector('#screen');

function equal(x, oper, y){
    if (oper === 'X'){
        oper = '*';
    }
    return eval(`${x} ${oper} ${y}`);
};

function checkInput(userIn) {
    if (!operator){
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === '.'){
            a += userIn;
        } 
    } else if (operator){
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === '.'){
            b += userIn;
        } 
    }
};

let input = '';

Array.from(document.getElementsByClassName('operand')).forEach((button) => {
    button.addEventListener('click', function() { 
        // if (last){
        //     reset();
        //     last = undefined;
        // }
        input = button.value;
        checkInput(input);
        if(!operator){
            screen.innerHTML = a.toLocaleString();
        } else {
            screen.innerHTML = a.toLocaleString() + operator + b.toLocaleString();
        }
    }
)});

Array.from(document.getElementsByClassName('operator')).forEach((button) => {
    button.addEventListener('click', function() { 
        if (!operator){
            operator = button.value;
            screen.innerHTML += operator;
        } else if (operator){
            if(operator === '/' && b === '0'){
                a = '';
                operator = undefined;
                b = '';
                screen.innerHTML = 'ERORR';
            }else{
                a = equal(a, operator, b);
                b = '';
                operator = button.value;
                screen.innerHTML = a.toLocaleString() + operator;
            }}
        }
)});

document.getElementById('equal').addEventListener('click', function(){
    if (!operator){
        last = a;
        a = '';
        screen.innerHTML = last.toLocaleString();
    } else if (operator){
        if(operator === '/' && b === '0'){
            a = '';
            operator = undefined;
            b = '';
            screen.innerHTML = 'ERORR';
        }else{
            last = equal(a, operator, b);
            b = '';
            operator = undefined;
            a = last;
            screen.innerHTML = a.toLocaleString();
        }}  
})

function reset(){
    a = '';
    b = '';
    operator = undefined;
    screen.innerHTML = ''
}

document.getElementById('c').addEventListener('click', reset);

document.getElementById('back').addEventListener('click', function (){
    if (b){
        b = b.slice(0,-1);
    } else if (operator){
        operator = undefined;
    } else if (a) {
        a = a.slice(0, -1);
    }
    screen.innerHTML = screen.innerHTML.slice(0, -1)
});
