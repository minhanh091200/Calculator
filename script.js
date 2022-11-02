const entries = document.querySelector(".entries");
const compute = document.querySelector(".compute");
const result = document.querySelector(".result");


let charString = "";
let number = "";
let computed = 0;

//record digits as inputs
const digits = document.querySelectorAll(".digit");
digits.forEach(
    digit => digit.addEventListener("click", function () {
        if (computed != 0) {
            charString = "".concat(computed.toString());
            computed = 0;
        }
        number = number.concat(digit.innerText);
        charString = charString.concat(digit.innerText);
        entries.innerText = charString;
    })
);

//record operations as inputs
const operations = document.querySelectorAll(".operation");
operations.forEach(
    operation => operation.addEventListener("click", function () {
        if (computed != 0) {
            charString = "".concat(computed.toString()).concat(operation.innerText);
            entries.innerText = charString;
            computed = 0;
            number = "";
        }
        let lastEntry = parseInt(charString.charAt(charString.length - 1));
        if (isNaN(lastEntry) == false) {
            charString = charString.concat(operation.innerText);
            entries.innerText = charString;
            number = "";
        }
    })
);

//record decimal points as inputs
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", function () {
    if (number.includes(".") == false) {
        charString = charString.concat(decimal.innerText);
        entries.innerText = charString;
        number = number.concat(decimal.innerText);
    }
});

//perform arithmetics from string of user's inputs
function parse(str) {
    return Function(`'use strict'; return (${str})`)();
}
compute.addEventListener("click", function () {
    computed = Math.round((parse(charString) + Number.EPSILON) * 1000) / 1000;
    result.innerText = computed;
    number = "".concat(computed.toString());
});

//delete the last element of input string 
const deleted = document.querySelector(".delete");
deleted.addEventListener("click", function () {
    let lastEntryRemoved = charString.slice(0, -1);
    number = "".concat(lastEntryRemoved);
    charString = "".concat(lastEntryRemoved);
    entries.innerText = charString;
});

//reset input string and result
const clear = document.querySelector(".clear");
clear.addEventListener("click", function () {
    number = "";
    charString = "";
    entries.innerText = charString;
    computed = 0;
    result.innerText = computed;
});