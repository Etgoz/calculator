let last;
let a = "";
let operator = "";
let b = "";
let operator2 = "";
let c = "";
let state = "simple";
function reset() {
    a = "";
    b = "";
    operator = "";
    myScreen.innerHTML = "";
}
document.getElementById("sci").addEventListener("click", function () {
    state = state === "simple" ? "scientific mode" : "simple";
    reset();
    console.log(state);
});
const myScreen = document.getElementById("screen");
function checkInput(userIn) {
    if (!operator) {
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === ".") {
            a += userIn;
        }
    }
    else if (operator && !operator2) {
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === ".") {
            b += userIn;
        }
    }
    else if (operator2) {
        if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === ".") {
            c += userIn;
        }
    }
}
let input = "";
Array.from(document.getElementsByClassName("operand")).forEach((button) => {
    button.addEventListener("click", function () {
        input = button.getAttribute("value");
        checkInput(input);
        if (!operator) {
            myScreen.innerHTML = a.toLocaleString();
        }
        else if (state === "simple" ||
            (state === "scientific mode" && operator in ["/", "X"])) {
            myScreen.innerHTML = a.toLocaleString() + operator + b.toLocaleString();
        }
        else {
            myScreen.innerHTML =
                a.toLocaleString() +
                    operator +
                    b.toLocaleString() +
                    operator2 +
                    c.toLocaleString();
        }
    });
});
Array.from(document.getElementsByClassName("operator")).forEach((button) => {
    button.addEventListener("click", function () {
        if (!operator) {
            operator = button.getAttribute("value");
            myScreen.innerHTML += operator;
        }
        else if (operator) {
            if (state === "simple" ||
                (state === "scientific mode" && operator in ["/", "*"])) {
                if (operator === "/" && b === "0") {
                    a = "";
                    operator = "";
                    b = "";
                    myScreen.innerHTML = "ERORR";
                }
                else {
                    if (operator === "X") {
                        operator = "*";
                    }
                    if (b) {
                        a = eval(`${a} ${operator} ${b}`);
                        b = "";
                        operator = button.getAttribute("value");
                        myScreen.innerHTML = a.toLocaleString() + operator;
                    }
                    else {
                        operator = button.getAttribute("value");
                        myScreen.innerHTML = a.toLocaleString() + operator;
                    }
                }
            }
            else if (!operator2) {
                operator2 = button.getAttribute("value");
                myScreen.innerHTML += operator2;
            }
        }
    });
});
function simpleEqual() {
    if (!operator) {
        last = a;
        a = "";
        myScreen.innerHTML = last.toLocaleString();
    }
    else if (operator) {
        if (operator === "/" && b === "0") {
            a = "";
            operator = "";
            b = "";
            myScreen.innerHTML = "ERORR";
        }
        else if (operator === "X") {
            operator = "*";
        }
        last = eval(`${a} ${operator} ${b}`);
        b = "";
        operator = "";
        a = last;
        myScreen.innerHTML = a.toLocaleString();
    }
}
function sciEqual() {
    if (!operator2) {
        simpleEqual();
    }
    else if (operator2 === "/" && c === "0") {
        myScreen.innerHTML = "ERROR";
    }
    else {
        if (operator === "X") {
            operator = "*";
        }
        if (operator2 === "X") {
            operator2 = "*";
        }
        last = eval(`${a} ${operator} ${b} ${operator2} ${c}`);
        a = last;
        myScreen.innerHTML = a;
    }
    b = "";
    c = "";
    operator = "";
    operator2 = "";
}
document.getElementById("equal").addEventListener("click", function () {
    if (state === "simple") {
        simpleEqual();
    }
    else {
        sciEqual();
    }
});
document.getElementById("c").addEventListener("click", reset);
document.getElementById("back").addEventListener("click", function () {
    if (c) {
        c = c.slice(0, -1);
    }
    else if (operator2) {
        operator2 = "";
    }
    else if (b) {
        b = b.slice(0, -1);
    }
    else if (operator) {
        operator = "";
    }
    else if (a) {
        a = a.slice(0, -1);
    }
    myScreen.innerHTML = myScreen.innerHTML.slice(0, -1);
});
