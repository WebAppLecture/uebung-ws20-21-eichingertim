import {Calculator} from "./Calculator.js";

let numpad = document.querySelector(".numpad");
let solution = document.querySelector("#solution");
let calculation = document.querySelector("#calculation");
new Calculator(numpad, calculation, solution);