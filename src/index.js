function eval() {
	// Do not use eval!!!
	return;
}

function expressionCalculator(expr) {
	expr = expr.replace(/ /gi, "");

	function solution(expr) {
		let firstNum = "";
		let firstSwitch = true;
		let secondNum = "";
		let secondSwitch = false;
		let operatorHightPriority = "";
		let operatorLowPriority = "";
		let answer = "";
		for (let i = 0; i < expr.length; i++) {
			if (
				(firstSwitch && !isNaN(expr[i])) ||
				(firstSwitch && expr[i] === ".") ||
				(expr[i] === "-" && expr[i - 1] === undefined && firstSwitch) ||
				(firstSwitch && expr[i] === "e") ||
				(firstSwitch && expr[i] === "-" && expr[i - 1] === "e")
			) {
				firstNum += expr[i];
			} else if (expr[i] === "*" || expr[i] === "/") {
				firstSwitch = false;
				secondSwitch = true;
				operatorHightPriority = expr[i];
				if (expr[i + 1] === "-") {
					secondNum = "-";
					i++;
				}
			} else if (
				(secondSwitch && !isNaN(expr[i])) ||
				(secondSwitch && expr[i] === ".") ||
				(secondSwitch && expr[i] === "e") ||
				(secondSwitch && expr[i] === "-" && expr[i - 1] === "e")
			) {
				secondNum += expr[i];
			} else if (isNaN(expr[i])) {
				firstNum = "";
			}
			if (secondNum !== "" && isNaN(expr[i + 1]) && expr[i + 1] !== ".") {
				let indexInsertAnswer = i - firstNum.length - secondNum.length;
				if (operatorHightPriority === "*") {
					answer = +firstNum * +secondNum;
					firstNum = "";
					firstSwitch = true;
					secondNum = "";
					secondSwitch = false;
				}
				if (operatorHightPriority === "/") {
					if (secondNum === "0") {
						throw new Error("TypeError: Division by zero.");
					}
					answer = +firstNum / +secondNum;
					firstNum = "";
					firstSwitch = true;
					secondNum = "";
					secondSwitch = false;
				}
				expr =
					expr.slice(0, indexInsertAnswer) +
					String(answer) +
					expr.slice(i + 1);
				i = indexInsertAnswer - 1;
			}
		}
		firstNum = "";
		firstSwitch = true;
		secondNum = "";
		secondSwitch = false;
		expr = expr.replace("+-", "-");
		expr = expr.replace("--", "+");
		for (let i = 0; i < expr.length; i++) {
			if (
				(firstSwitch && !isNaN(expr[i])) ||
				(firstSwitch && expr[i] === ".") ||
				(expr[i] === "-" && expr[i - 1] === undefined && firstSwitch) ||
				(firstSwitch && expr[i] === "e") ||
				(firstSwitch && expr[i] === "-" && expr[i - 1] === "e")
			) {
				firstNum += expr[i];
			} else if (expr[i] === "+" || expr[i] === "-") {
				firstSwitch = false;
				secondSwitch = true;
				operatorLowPriority = expr[i];
			} else if (
				(secondSwitch && !isNaN(expr[i])) ||
				(secondSwitch && expr[i] === ".") ||
				(secondSwitch && expr[i] === "e") ||
				(secondSwitch && expr[i] === "-" && expr[i - 1] === "e")
			) {
				secondNum += expr[i];
			}
			if (secondNum !== "" && isNaN(expr[i + 1]) && expr[i + 1] !== ".") {
				let indexInsertAnswer = i - firstNum.length - secondNum.length;
				if (operatorLowPriority === "+") {
					answer = +firstNum + +secondNum;
					firstNum = "";
					firstSwitch = true;
					secondNum = "";
					secondSwitch = false;
				}
				if (operatorLowPriority === "-") {
					answer = +firstNum - +secondNum;
					firstNum = "";
					firstSwitch = true;
					secondNum = "";
					secondSwitch = false;
				}
				expr =
					expr.slice(0, indexInsertAnswer) +
					String(answer) +
					expr.slice(i + 1);
				i = indexInsertAnswer - 1;
			}
		}
		return expr;
	}

	if (expr.split("(").length - 1 !== expr.split(")").length - 1) {
		throw new Error("ExpressionError: Brackets must be paired");
	} else if (!expr.includes("(")) {
		return parseFloat(solution(expr));
	} else {
		let exprInBrackets = "";
		let indexOpenBracket;
		let indexCloseBracket;

		while (expr.includes("(")) {
			indexOpenBracket = expr.lastIndexOf("(", expr.indexOf(")"));
			indexCloseBracket = expr.indexOf(")");
			exprInBrackets = expr.slice(
				indexOpenBracket + 1,
				indexCloseBracket
			);
			expr =
				expr.slice(0, indexOpenBracket) +
				solution(exprInBrackets) +
				expr.slice(indexCloseBracket + 1);
			expr = expr.replace("+-", "-");
			expr = expr.replace("--", "+");
		}
		return parseFloat(solution(expr));
	}
}

module.exports = {
	expressionCalculator,
};
