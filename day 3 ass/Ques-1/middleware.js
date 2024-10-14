// middleware.js
const fs = require('fs');

function validateData(req, res, next) {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;
    let errors = [];

    // Check each field and type
    if (typeof ID !== 'number') {
        errors.push("ID should be a number");
    }

    if (typeof Name !== 'string') {
        errors.push("Name should be a string");
    }

    if (typeof Rating !== 'number') {
        errors.push("Rating should be a number");
    }

    if (typeof Description !== 'string') {
        errors.push("Description should be a string");
    }

    if (typeof Genre !== 'string') {
        errors.push("Genre should be a string");
    }

    if (!Array.isArray(Cast) || !Cast.every(item => typeof item === 'string')) {
        errors.push("Cast should be an array of strings");
    }

    // If there are errors, respond with a bad request status and log errors to res.txt
    if (errors.length > 0) {
        fs.appendFileSync('res.txt', `Validation Errors: ${errors.join(', ')}\n`, 'utf8');
        return res.status(400).send("bad request. some data is incorrect.");
    }

    // If validation passes, move to the next middleware/route handler
    next();
}

module.exports = validateData;