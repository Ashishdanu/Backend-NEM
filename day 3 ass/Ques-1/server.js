// server.js
const express = require('express');
const validateData = require('./middleware'); // Importing the middleware

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse incoming JSON data

// Define the POST route with validation middleware
app.post('/', validateData, (req, res) => {
    res.status(200).send("data received");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
