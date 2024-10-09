const { readFileSync } = require("fs");

const read = () => {
  try {
    const data = readFileSync('sample.txt', 'utf8');
    return data; // return the file contents
  } catch (error) {
    console.error(error.message);
    return null; // return null if there's an error
  }
};

try {
  const args = process.argv.slice(2);
  const operation = args[0];
  switch (operation) {
    case 'read': // note the quotes around 'read'
      console.log(read()); // call the read function
      break;
    default:
      console.log("Invalid operation");
  }
} catch (error) {
  console.log(error.message);
}

// const { isEven} = require("is-Even")
// const { isOdd } = require("is-odd");
// console.log(isEven(2))