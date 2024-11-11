const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const redisClient = redis.createClient();

app.use(bodyParser.json());

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

redisClient.on('connect', () => {
  console.log('Connected to Redis...');
});

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

app.post('/submit-message', authenticate, (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('Message is required');

  const key = uuidv4();

  const ttl = 3600;

  redisClient.setex(key, ttl, message, (err) => {
    if (err) {
      console.log('Redis error:', err);
      return res.status(500).send('Failed to store message');
    }
    res.status(201).send({ message: 'Message stored successfully', key });
  });
});

app.get('/get-message/:key', authenticate, (req, res) => {
  const { key } = req.params;

  redisClient.get(key, (err, message) => {
    if (err) {
      console.log('Redis error:', err);
      return res.status(500).send('Error retrieving message');
    }

    if (!message) {
      return res.status(404).send('Message not found or expired');
    }

    res.status(200).send({ message });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const storedUser = { username: 'user1', password: 'password123' };

  if (username !== storedUser.username || password !== storedUser.password) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.status(200).send({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
