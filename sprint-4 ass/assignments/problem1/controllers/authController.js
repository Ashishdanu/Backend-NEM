const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient');

const JWT_SECRET = 'your_jwt_secret_key';
const JWT_EXPIRATION = '1h'; 

function generateToken(user) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    redisClient.setex(`authToken:${user.id}`, 3600, token); 

    return token;
}

function blacklistToken(userId) {
    redisClient.del(`authToken:${userId}`);
}

module.exports = { generateToken, blacklistToken };
