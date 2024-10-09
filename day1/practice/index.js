const add = (a, b) => a + b;
const subtract = (a, b) => a - b

const args = process.argv.slice(2);

if(args.length < 3) {
  onsole.log("Please provide operation and two numbers as arguments");
 rturn;
9}try {
const num1 = parseInt(args[1]);
 const num2 = parseInt(args[2]);   throw new Error('Invalid input')
 } catch (error) {
    console.log("Invalid input");
    return;
    }