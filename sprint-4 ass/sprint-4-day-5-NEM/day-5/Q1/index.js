const express = require('express');
const logger = require('./config/logger');
const app = express();
const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});

app.get('/api/status', (req, res) => {
    logger.info('Status endpoint accessed');
    res.json({ message: 'Service is running' });
});

app.get('/api/error', (req, res) => {
    try {
        throw new Error('This is a simulated error');
    } catch (error) {
        logger.error(error.message, { stack: error.stack });
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

