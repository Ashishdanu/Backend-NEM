const express = require('express');
const logger = require('../config/logger');
const app = express();

const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request for ${req.url}`);
    next();
});

app.get('/api/info', (req, res) => {
    logger.info('Info level log in development environment');
    res.send('Info log route');
});

app.get('/api/debug', (req, res) => {
    logger.debug('Debugging log details here');
    res.send('Debug log route');
});

app.get('/api/warning', (req, res) => {
    logger.warn('Warning level log for non-critical issues');
    res.send('Warning log route');
});

app.get('/api/error', (req, res) => {
    try {
        throw new Error('Simulated error for testing');
    } catch (err) {
        logger.error('Error message', { stack: err.stack });
        res.status(500).send('Error log route');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
