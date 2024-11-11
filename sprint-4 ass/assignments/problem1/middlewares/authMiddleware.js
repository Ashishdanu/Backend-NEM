const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient');

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        redisClient.get(`authToken:${userId}`, (err, storedToken) => {
            if (err || !storedToken || storedToken !== token) {
                return res.status(401).send('Invalid or expired token.');
            }
            req.user = { id: userId };
            next();
        });
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = { authenticateToken };
