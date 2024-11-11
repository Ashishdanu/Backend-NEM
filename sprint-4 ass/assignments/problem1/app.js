const express = require('express');
const { generateToken, blacklistToken } = require('./controllers/authController');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
    const user = { id: req.body.userId }; 
    const token = generateToken(user);
    res.send({ token });
});

app.get('/todos', authenticateToken, (req, res) => {
    res.send('List of ToDo items');
});

app.post('/logout', authenticateToken, (req, res) => {
    blacklistToken(req.user.id);
    res.send('Logged out successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
