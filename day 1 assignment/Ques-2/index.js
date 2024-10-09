import {
  writeFileSync,
  readFileSync,
  appendFileSync,
  unlinkSync,
  renameSync,
  readdirSync,
  existsSync,
} from "fs";

const args = process.argv.slice(2);

// Function to create a new file
const create_file = (filename) => {
  if (existsSync(filename)) {
    console.log(`File '${filename}' already exists`);
  } else {
    writeFileSync(filename, ""); // Create an empty file
    console.log(`File '${filename}' created`);
  }
};

// Function to read the file
const read_file = (filename) => {
  if (existsSync(filename)) {
    const data = readFileSync(filename, "utf8");
    console.log(data);
  } else {
    console.log(`File '${filename}' does not exist`);
  }
};

// Function to append content to the file
const append_file = (filename, content) => {
  if (existsSync(filename)) {
    appendFileSync(filename, content + "\n");
    console.log(`Content appended to the file '${filename}'`);
  } else {
    console.log(`File '${filename}' does not exist`);
  }
};

// Function to delete a file
const delete_file = (filename) => {
  if (existsSync(filename)) {
    unlinkSync(filename);
    console.log(`File '${filename}' deleted`);
  } else {
    console.log(`File '${filename}' does not exist`);
  }
};

// Function to rename a file
const rename_file = (oldFilename, newFilename) => {
  if (existsSync(oldFilename)) {
    renameSync(oldFilename, newFilename);
    console.log(`File '${oldFilename}' renamed to '${newFilename}'`);
  } else {
    console.log(`File '${oldFilename}' does not exist`);
  }
};

// Function to list all files and directories in the current directory
const list_files = () => {
  const files = readdirSync("./");
  console.log("Files and directories in the current directory:");
  files.forEach((file) => console.log(file));
};

// Main logic to handle different operations
try {
  if (args.length === 0) {
    console.log("Please provide a valid operation and filename.");
    process.exit(1);
  }

  const operation = args[0];

  switch (operation) {
    case "create":
      create_file(args[1]);
      break;

    case "read":
      read_file(args[1]);
      break;

    case "append":
      append_file(args[2], args[1]);
      break;

    case "delete":
      delete_file(args[1]);
      break;

    case "rename":
      rename_file(args[1], args[2]);
      break;

    case "list":
      list_files();
      break;

    default:
      console.log(
        "Invalid operation. Use create, read, append, delete, rename, or list."
      );
  }
} catch (error) {
  console.error("Error:", error.message);
}
