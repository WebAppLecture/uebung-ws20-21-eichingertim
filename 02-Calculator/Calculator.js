import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numpad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution;

        this.currentNumber;
        this.savedSymbol;
        this.setupNumPad();
    }

    setupNumPad() { 
        //Create NumPad
        for (let i = 0; i < 4; i++) {
            if (i === 3) {
                let button = document.createElement("button");
                button.innerHTML = "" + 0;
                button.style.gridColumnStart = 1;
                button.style.gridColumnEnd = 3;
                this.numpad.appendChild(button);
                break;
            }

            for (let m = 2; m >= 0; m--) {
                let rowIndicator = 9 - i * 3,
                button = document.createElement("button");
                button.innerHTML = "" + rowIndicator - m;
                this.numpad.appendChild(button);
            }
        }

        //Set Listeners
        let buttons = [].slice.call(this.numpad.children);
        buttons.forEach(element => {
            element.addEventListener("click", this.onButtonClick.bind(this))
        });

    }

    onButtonClick(event) {
        let symbol = event.target.innerHTML;
        switch (symbol) {
            case "*":
            case "/":
            case "-":
            case "+":
                this.savedSymbol = symbol;
                break;
            case "AC":
                this.clear()
                break;
            default: 
                this.calculate(symbol);
        }
    }

    calculate(symbol) {
        if (this.currentNumber != undefined && this.savedSymbol != undefined) {
            this.print(this.currentNumber.value + " " + this.savedSymbol + " " + symbol);
            switch (this.savedSymbol) {
                case "+" :
                    this.currentNumber.add(parseInt(symbol))
                    break;
                case "-":
                    this.currentNumber.subtract(parseInt(symbol))
                    break;
                case "/":
                    this.currentNumber.divide(parseInt(symbol))
                    break;
                case "*":
                    this.currentNumber.multiply(parseInt(symbol))
                    break;
            }
            this.savedSymbol = undefined;
            this.printSolution(this.currentNumber.value);
        } else {
            this.currentNumber = new MyMath(symbol);
        }
    }

    print(string) {
        this.outputCalculation.innerHTML = string;
    }

    printSolution(string) {
        this.outputSolution.innerHTML = string;
    }

    clear() {
        this.currentNumber = undefined;
        this.savedSymbol = undefined;
        this.print("");
        this.printSolution("")
    }

}
