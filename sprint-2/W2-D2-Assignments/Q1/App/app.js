const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

// Middleware
app.use(bodyParser.json());

// Connect to the SQL database using Sequelize
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

// Movie Model
const Movie = sequelize.define('Movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    director: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

// Sync the model
sequelize.sync();

// CRUD Operations
// Create
app.post('/movies', async (req, res) => {
    const { title, director, year, genre } = req.body;
    const movie = await Movie.create({ title, director, year, genre });
    res.json(movie);
});

// Read
app.get('/movies', async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
});

// Update
app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, director, year, genre } = req.body;
    await Movie.update({ title, director, year, genre }, { where: { id } });
    res.sendStatus(204);
});

// Delete
app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: { id } });
    res.sendStatus(204);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
