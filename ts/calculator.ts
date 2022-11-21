let last: string;
let a: string = "";
let operator: string = "";
let b: string = "";
let operator2: string = "";
let c: string = "";

let state: string = "simple";

function reset(): void {
	a = "";
	b = "";
	operator = "";
	myScreen.innerHTML = "";
}

document.getElementById("sci").addEventListener("click", function (): void {
	state = state === "simple" ? "scientific mode" : "simple";
	reset();
	console.log(state);
});

const myScreen: Element = document.querySelector("#screen");

function equal(x: string, oper: string, y: string): string {
	if (oper === "X") {
		oper = "*";
	}
	return String(eval(`${x} ${oper} ${y}`));
}

function checkInput(userIn): void {
	if (!operator) {
		if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === ".") {
			a += userIn;
		}
	} else if (operator && !operator2) {
		if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === ".") {
			b += userIn;
		}
	} else {
		if (userIn in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] || userIn === ".") {
			c += userIn;
		}
	}
}

let input: string = "";

Array.from(document.getElementsByClassName("operand")).forEach(
	(button: Element) => {
		button.addEventListener("click", function () {
			input = button.getAttribute("value");
			checkInput(input);
			if (!operator) {
				myScreen.innerHTML = a.toLocaleString();
			} else if (
				state === "simple" ||
				(state === "scientific mode" && operator in ["/", "*"])
			) {
				myScreen.innerHTML = a.toLocaleString() + operator + b.toLocaleString();
			} else {
				myScreen.innerHTML =
					a.toLocaleString() +
					operator +
					b.toLocaleString() +
					operator2 +
					c.toLocaleString();
			}
		});
	}
);

Array.from(document.getElementsByClassName("operator")).forEach(
	(button: Element) => {
		button.addEventListener("click", function () {
			if (!operator) {
				operator = button.getAttribute("value");
				myScreen.innerHTML += operator;
			} else if (operator) {
				if (
					state === "simple" ||
					(state === "scientific mode" && operator in ["/", "*"])
				) {
					if (operator === "/" && b === "0") {
						a = "";
						operator = "";
						b = "";
						myScreen.innerHTML = "ERORR";
					} else {
						if (b) {
							a = equal(a, operator, b);
							b = "";
							operator = button.getAttribute("value");
							myScreen.innerHTML = a.toLocaleString() + operator;
						} else {
							operator = button.getAttribute("value");
							myScreen.innerHTML = a.toLocaleString() + operator;
						}
					}
				} else {
					operator2 = button.getAttribute("value");
					myScreen.innerHTML += operator2;
				}
			}
		});
	}
);

function simpleEqual() {
	if (!operator) {
		last = a;
		a = "";
		myScreen.innerHTML = last.toLocaleString();
	} else if (operator) {
		if (operator === "/" && b === "0") {
			a = "";
			operator = "";
			b = "";
			myScreen.innerHTML = "ERORR";
		} else {
			last = equal(a, operator, b);
			b = "";
			operator = "";
			a = last;
			myScreen.innerHTML = a.toLocaleString();
		}
	}
}

function sciEqual() {
	if (!operator2) {
		simpleEqual();
	} else {
		if (["+", "-"].includes(operator2)) {
			last = equal(equal(a, operator, b), operator2, c);
			a = last;
			myScreen.innerHTML = a.toLocaleString();
		} else if (
			["+", "-"].includes(operator) &&
			["X", "/"].includes(operator2)
		) {
			if (operator2 === "/" && c === "0") {
				myScreen.innerHTML = "ERROR";
			} else {
				last = equal(a, operator, equal(b, operator2, c));
				a = last;
				myScreen.innerHTML = a.toLocaleString();
			}
		}
	}
	b = "";
	c = "";
	operator = "";
	operator2 = "";
}

document.getElementById("equal").addEventListener("click", function () {
	if (state === "simple") {
		simpleEqual();
	} else {
		sciEqual();
	}
});

document.getElementById("c").addEventListener("click", reset);

document.getElementById("back").addEventListener("click", function () {
	if (c) {
		c = c.slice(0, -1);
	} else if (operator2) {
		operator2 = "";
	} else if (b) {
		b = b.slice(0, -1);
	} else if (operator) {
		operator = "";
	} else if (a) {
		a = a.slice(0, -1);
	}
	myScreen.innerHTML = myScreen.innerHTML.slice(0, -1);
});