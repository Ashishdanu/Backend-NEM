import { readFileSync ,writeFileSync , appendFileSync } from "fs";
import { add } from "./Calculator.js";



// utd-8 means text files 
const data = readFileSync("sample.txt", "utf-8");
console.log(data);

// import { existsSync } from "fs"
// if (existsSync("sample.txt")) {
//   const data = readFileSync("sample.txt", "utf-8")
// 4 console.log(data)
// } else {
//   console.error("File not found")
// }

writeFileSync("sample.txt", "Hello Ashis Danu", "utf-8");
appendFileSync(
    "sample.txt",
    "ashish Baby Khana Khalo",
    "utf-8"
)

const addition = add(5,10);
console.log("addition" ,addition);



