let last;
let a = "";
let operator = "";
let b = "";
let operator2 = "";
let c = "";
let state = "simple";
let myHistory;
function reset() {
    a = "";
    b = "";
    c = "";
    operator = "";
    operator2 = "";
}
document.getElementById("sci").addEventListener("click", function () {
    state = state === "simple" ? "scientific mode" : "simple";
    reset();
    console.log(state);
});
const myScreen = document.getElementById("screen");
function checkInput(userIn) {
    if (!operator) {
        if (".1234567890".includes(userIn)) {
            a += userIn;
        }
    }
    else if (operator && !operator2) {
        if (".1234567890".includes(userIn)) {
            b += userIn;
        }
    }
    else if (operator2) {
        if (".1234567890".includes(userIn)) {
            c += userIn;
        }
    }
}
let input = "";
Array.from(document.getElementsByClassName("operand")).forEach((button) => {
    button.addEventListener("click", function () {
        input = button.getAttribute("value");
        if (last && !operator && !a) {
            reset();
        }
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
        if (last && !a) {
            a = last;
        }
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
            myScreen.innerHTML = "ERORR";
        }
        else if (operator === "X") {
            operator = "*";
        }
        let exp = `${a} ${operator} ${b}`;
        last = eval(exp);
        if (!myHistory) {
            myHistory = [exp.replace("*", "X"), String("= " + last)];
        }
        else {
            myHistory.push(exp.replace("*", "X"));
            myHistory.push(String("= " + last));
        }
        myScreen.innerHTML = last.toLocaleString();
        console.log(myHistory);
    }
    reset();
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
        let exp = `${a} ${operator} ${b} ${operator2} ${c}`;
        last = eval(exp);
        if (!myHistory) {
            myHistory = [exp.replace("*", "X"), String("= " + last)];
        }
        else {
            myHistory.push(exp.replace("*", "X"));
            myHistory.push(String("= " + last));
        }
        myScreen.innerHTML = last.toLocaleString();
        console.log(myHistory);
    }
    reset();
}
document.getElementById("equal").addEventListener("click", function () {
    if (state === "simple") {
        simpleEqual();
    }
    else {
        sciEqual();
    }
});
document.getElementById("c").addEventListener("click", () => {
    reset();
    myScreen.innerHTML = "";
    myHistory = [];
    renderHistory();
});
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
