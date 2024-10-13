// Import required modules
const http = require("http");   // For creating an HTTP server
const fs = require("fs");       // To interact with the file system
const path = require("path");   // To handle and manipulate file paths

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Decode the request URL to handle spaces and special characters
  const urlPath = decodeURIComponent(req.url);

  // Determine the file or directory path on the system using __dirname
  // __dirname refers to the current directory where this script is located
  const filePath = path.join(__dirname, urlPath);

  // Check if the requested file or directory exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // If the file or directory doesn't exist, send a 404 response
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 Not Found</h1>"); // Display a 'Not Found' message
      res.end();  // End the response
    } else {
      // If it's a directory, list its contents
      if (stats.isDirectory()) {
        // Read the contents of the directory
        fs.readdir(filePath, (err, files) => {
          if (err) {
            // Handle errors while reading the directory
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("<h1>500 Internal Server Error</h1>");
            res.end();
          } else {
            // Write a successful HTTP response
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Directory Listing</h1>");
            res.write("<ul>");

            // Provide a link to go up to the parent directory
            if (urlPath !== "/") {
              res.write(`<li><a href="${path.join(urlPath, "..")}">[Up]</a></li>`);
            }

            // Loop through all files and directories in the current directory
            files.forEach(file => {
              const fileUrl = path.join(urlPath, file); // Construct the file's URL
              const fullPath = path.join(filePath, file); // Get the full system path for the file

              // Check if the item is a file or a directory
              const fileStats = fs.statSync(fullPath);
              if (fileStats.isDirectory()) {
                // If it's a directory, show a folder icon and make it a clickable link
                res.write(`<li>&#128193; <a href="${fileUrl}/">${file}</a></li>`);
              } else {
                // If it's a file, show a file icon and make it a clickable link
                res.write(`<li>&#128196; <a href="${fileUrl}">${file}</a></li>`);
              }
            });
            res.write("</ul>");
            res.end(); // End the response after listing all files and directories
          }
        });
      } else if (stats.isFile()) {
        // If it's a file, read its content and serve it
        fs.readFile(filePath, (err, data) => {
          if (err) {
            // Handle errors while reading the file
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("<h1>500 Internal Server Error</h1>");
            res.end();
          } else {
            // Successfully serve the file content
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(data);  // Write the file content to the response
            res.end();        // End the response
          }
        });
      }
    }
  });
});

// Make the server listen on port 3051
server.listen(3051, () => {
  console.log("Server running at http://localhost:3051");
});
