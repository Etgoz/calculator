let last;
let a = '';
let operator;
let b = '';

const screen = document.querySelector('#screen');

function add(x, y){
    return x+y;
}

function sub(x, y){
    return x-y;
}

function divide(x, y){
    if (y === 0){
        screen.innerHTML = 'ERROR';
        b = '';
    }
    return x/y;
}    

function multiply(x, y){
    return x*y;
}

function checkInput(userIn) {
    if (!operator){
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.']){
            a += userIn;
            screen.innerHTML = a;
        } 
    } else if (operator){
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.']){
            b += userIn;
            screen.innerHTML += b;
        } 
    }
};

let input = '';

Array.from(document.getElementsByClassName('operand')).forEach((button) => {
    button.addEventListener('click', function() { 
        input = button.value;
        checkInput(input);
        }
)});

Array.from(document.getElementsByClassName('operator')).forEach((button) => {
    button.addEventListener('click', function() { 
        if (!operator){
            operator = button.value;
            screen.innerHTML += operator;
        } else if (operator){
            switch(operator){
                case '+':
                    a = add(Number(a), Number(b));
                    b = '';
                    operator = button.value;
                    break;
                case '-':
                    a = sub(Number(a), Number(b));
                    b = '';
                    operator = button.value;
                    break;
                case 'X':
                    a = multiply(Number(a), Number(b));
                    b = '';
                    operator = button.value;
                    break;
                case '/':
                    a = divide(Number(a), Number(b));
                    b = '';
                    operator = button.value;
                    break;
            }
            screen.innerHTML = a + operator;
        }
    }
)});

document.getElementById('equal').addEventListener('click', function(){
    switch(operator){
        case '+':
            last = add(Number(a), Number(b));
            reset()
            break;
        case '-':
            last = sub(Number(a), Number(b));
            reset()
            break;
        case 'X':
            last = multiply(Number(a), Number(b));
            reset()
            break;
        case '/':
            last = divide(Number(a), Number(b));
            reset()
            break;
    }
    screen.innerHTML = last;
})

function reset(){
    a = '';
    b = '';
    operator = undefined;
    screen.innerHTML = ''
}

document.getElementById('c').addEventListener('click', reset)

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


