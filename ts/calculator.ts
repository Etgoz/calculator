let last: string;
let a: string = "";
let operator: string = "";
let b: string = "";
let operator2: string = "";
let c: string = "";

let state: string = "simple";

let myHistory: string[];

function reset(): void {
	a = "";
	b = "";
	c = "";
	operator = "";
	operator2 = "";
}

function renderScreen() {
	myScreen.innerText = `${a}${operator}${b}${operator2}${c}`;
}

//switch to scientific mode
document.getElementById("sci").addEventListener("click", function (): void {
	state = state === "simple" ? "scientific" : "simple";
	reset();
	myScreen.innerText = "";
	console.log(state);
});

//handle user input
const myScreen: HTMLElement = document.getElementById("screen");

function checkInput(userIn: string): void {
	if (!operator) {
		if (".1234567890".includes(userIn)) {
			a += userIn;
		}
	} else if (operator && !operator2) {
		if (".1234567890".includes(userIn)) {
			b += userIn;
		}
	} else if (operator2) {
		if (".1234567890".includes(userIn)) {
			c += userIn;
		}
	}
}

let input: string = "";

Array.from(document.getElementsByClassName("operand")).forEach(
	(button: Element) => {
		button.addEventListener("click", function () {
			input = button.getAttribute("value");
			if (last && !operator && !a) {
				reset();
			}
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
			if (last && !a) {
				a = last;
			}
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
							a = eval(`${a} ${operator} ${b}`);
							b = "";
							operator = button.getAttribute("value");
							myScreen.innerHTML = a.toLocaleString() + operator;
						} else {
							operator = button.getAttribute("value");
							myScreen.innerHTML = a.toLocaleString() + operator;
						}
					}
				} else if (!operator2) {
					operator2 = button.getAttribute("value");
					myScreen.innerHTML += operator2;
				}
			}
		});
	}
);

//equal button functionality
function simpleEqual() {
	if (!operator) {
		last = a;
		a = "";
		myScreen.innerHTML = last.toLocaleString();
	} else if (operator) {
		if (operator === "/" && b === "0") {
			myScreen.innerHTML = "ERORR";
		} else if (operator === "X") {
			operator = "*";
		}
		let exp: string = `${a} ${operator} ${b}`;
		last = eval(exp);
		if (!myHistory) {
			myHistory = [exp, String("= " + last)];
		} else {
			myHistory.push(exp);
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
	} else if (operator2 === "/" && c === "0") {
		myScreen.innerHTML = "ERROR";
	} else {
		let exp: string = `${a} ${operator} ${b} ${operator2} ${c}`;
		last = eval(exp);
		if (!myHistory) {
			myHistory = [exp, String("= " + last)];
		} else {
			myHistory.push(exp);
			myHistory.push(String("= " + last));
		}
		myScreen.innerHTML = last.toLocaleString();
		console.log(myHistory);
	}
	reset();
}

//cloud mode
async function fetchWithTimeout(resource: string, options: any = {}) {
	const { timeout = 2000 } = options;

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	const response = await fetch(resource, {
		...options,
		signal: controller.signal,
	});
	clearTimeout(id);
	return response;
}

async function useAPI() {
	const allVars: string = `${a}${operator}${b}${operator2}${c}`;
	console.log("my vars-", allVars);
	const myExpr: string = encodeURIComponent(allVars);
	console.log("encoded expression: ", myExpr);
	try {
		const response = await fetchWithTimeout(
			`http://api.mathjs.org/v4/?expr=${myExpr}`
		);
		const result: string | Promise<string> = await response.text();
		console.log(result);
		last = result;
		myScreen.innerText = result;
	} catch (e) {
		alert("Error, go back to local mode");
	}
}

document.getElementById("equal").addEventListener("click", function () {
	if (!cloudOn) {
		if (state === "simple") {
			simpleEqual();
		} else {
			sciEqual();
		}
	} else {
		useAPI();
	}
	renderHistory();
});

//c button
document.getElementById("c").addEventListener("click", () => {
	reset();
	myScreen.innerHTML = "";
	clearHistory();
});

//back button - delete last char
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

//get input from paste
function checkDots(op: string) {
	return op.includes(".");
}

function getFromScreen() {
	if (myScreen.innerText) {
		const expr: string = myScreen.innerText;
		const splitExpr: string[] = expr.split("");
		reset();
		let vars: string[] = ["", "", "", "", ""];
		let i: number = 0;
		splitExpr.forEach((char) => {
			if (!"1234567890.*/+-".includes(char)) {
				myScreen.innerText = "ERROR";
			} else if ("1234567890.".includes(char)) {
				if (char === "." && !checkDots(vars[i])) {
					vars[i] += char;
				} else if (!(char === ".")) {
					vars[i] += char;
				}
			} else if ("/*+-".includes(char)) {
				i++;
				vars[i] = char;
				i++;
			}
		});
		a = vars[0];
		operator = vars[1];
		b = vars[2];
		operator2 = vars[3];
		c = vars[4];
		console.log(a, operator, b, operator2, c);
	}
}

document.addEventListener("paste", (ev) => {
	if (state === "scientific") {
		myScreen.innerText = ev.clipboardData.getData("text/plain");
		getFromScreen();
	}
});

//sci operators
document.getElementById("square").addEventListener("click", () => {
	if (!operator) {
		a = String(Number(a) ** 2);
	} else if (operator && !operator2) {
		b = String(Number(b) ** 2);
	} else if (operator2) {
		c = String(Number(c) ** 2);
	}
	renderScreen();
});

document.getElementById("sqrt").addEventListener("click", () => {
	if (!operator) {
		a = String(Math.sqrt(Number(a)));
	} else if (operator && !operator2) {
		b = String(Math.sqrt(Number(b)));
	} else if (operator2) {
		c = String(Math.sqrt(Number(c)));
	}
	renderScreen();
});

document.getElementById("mod").addEventListener("click", (ev) => {
	if (!operator) {
		operator = document.getElementById("mod").getAttribute("value");
	} else if (operator && !operator2) {
		operator2 = document.getElementById("mod").getAttribute("value");
	}
	renderScreen();
});

document.getElementById("pi").addEventListener("click", () => {
	if (!operator) {
		a = String(Math.PI.toFixed(2));
	} else if (operator && !operator2) {
		b = String(Math.PI.toFixed(2));
	} else if (operator2) {
		c = String(Math.PI.toFixed(2));
	}
	renderScreen();
});

document.getElementById("powerOf").addEventListener("click", (ev) => {
	if (!operator) {
		operator = document.getElementById("powerOf").getAttribute("value");
	} else if (operator && !operator2) {
		operator2 = document.getElementById("powerOf").getAttribute("value");
	}
	renderScreen();
});

document.getElementById("plus-minus").addEventListener("click", () => {
	if (!operator) {
		a = a[0] === "-" ? a.replace("-", "") : "-" + a;
	} else if (operator && !operator2) {
		b = b[0] === "-" ? b.replace("-", "") : "-" + b;
	} else if (operator2) {
		c = c[0] === "-" ? c.replace("-", "") : "-" + c;
	}
	renderScreen();
});

function factorial(num: number): number {
	if (num < 0) {
		return -1;
	} else if (num == 0) {
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}

document.getElementById("factorial").addEventListener("click", () => {
	if (!operator) {
		a = String(factorial(Number(a))).toLocaleString();
		last = a;
	} else if (operator && !operator2) {
		b = String(factorial(Number(b))).toLocaleString();
		last = b;
	} else if (operator2) {
		c = String(factorial(Number(c))).toLocaleString();
		last = c;
	}
	renderScreen();
});

//my feature
document.getElementById("ans").addEventListener("click", () => {
	if (!operator) {
		a = last;
	} else if (operator && !operator2) {
		b = last;
	} else if (operator2) {
		c = last;
	}
	renderScreen();
});
