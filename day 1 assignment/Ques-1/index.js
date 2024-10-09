// import {readFileSync , writeFileSync} from "fs"
// import { addition } from "./Calculator.js";
// import { subtract } from "./Calculator.js";
// import { multiply } from "./Calculator.js";

// const add = addition(2,4)
// console.log(add) 
// const mult = multiply(2,4)
// console.log(mult)
// const sub = subtract(2,4)
// console.log(sub)
// Import the crypto module for generating random numbers  
// Import the crypto module for generating random numbers  
import crypto from 'crypto';  

// Function to perform addition  
function add(a, b) {  
    return a + b;  
}  

// Function to perform subtraction  
function subtract(a, b) {  
    return a - b;  
}  

// Function to perform multiplication  
function multiply(a, b) {  
    return a * b;  
}  

// Function to perform division  
function divide(a, b) {  
    if (b === 0) {  
        throw new Error("Division by zero is not allowed.");  
    }  
    return a / b;  
}  

// Function to generate a random number  
function randomNumber(length) {  
    return crypto.randomBytes(length).toString('hex');  
}  

// Function to calculate sine of an angle (in degrees)  
function sine(angle) {  
    return Math.sin((angle * Math.PI) / 180);  
}  

// Function to calculate cosine of an angle (in degrees)  
function cosine(angle) {  
    return Math.cos((angle * Math.PI) / 180);  
}  

// Function to calculate tangent of an angle (in degrees)  
function tangent(angle) {  
    return Math.tan((angle * Math.PI) / 180);  
}  

// Main function to handle command line arguments  
function main() {  
    // Access command line arguments  
    const args = process.argv.slice(2);  

    // Check if no arguments were provided  
    if (args.length === 0) {  
        console.log("Please provide an operation and numbers.");  
        return;  
    }  

    const operation = args[0];  

    try {  
        if (operation === 'add' || operation === 'subtract' || operation === 'multiply' || operation === 'divide') {  
            const num1 = parseFloat(args[1]);  
            const num2 = parseFloat(args[2]);  
            if (isNaN(num1) || isNaN(num2)) {  
                throw new Error("Invalid numbers provided.");  
            }  

            let result;  
            switch (operation) {  
                case 'add':  
               
                result = add(num1, num2);  
                    break;  
                case 'subtract':  
                    result = subtract(num1, num2);  
                    break;  
                case 'multiply':  
                    result = multiply(num1, num2);  
                    break;  
                case 'divide':  
                    result = divide(num1, num2);  
                    break;  
            }  
            console.log(`Result: ${result}`);  

        } else if (operation === 'random') {  
            const length = parseInt(args[1]);  
            if (isNaN(length) || length <= 0) {  
                throw new Error("Invalid length for random number.");  
            }  
            const randNum = randomNumber(length);  
            console.log(`Random number: ${randNum}`);  

        } else if (operation === 'sine' || operation === 'cosine' || operation === 'tangent') {  
            const angle = parseFloat(args[1]);  
            if (isNaN(angle)) {  
                throw new Error("Invalid angle provided.");  
            }  

            let result;  
            switch (operation) {  
                case 'sine':  
                    result = sine(angle);  
                    break;  
                case 'cosine':  
                    result = cosine(angle);  
                    break;  
                case 'tangent':  
                    result = tangent(angle);  
                    break;  
            }  
            console.log(`Result: ${result}`);  

        } else {  
            console.log("Unknown operation. Please use add, subtract, multiply, divide, random, sine, cosine, or tangent.");  
        }  
    } catch (error) {  
        console.error("Error:", error.message);  
    }  
}  

// Run the main function  
main();