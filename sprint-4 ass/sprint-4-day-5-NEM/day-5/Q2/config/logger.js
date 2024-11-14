const winston = require('winston');
require('winston-daily-rotate-file');

const environment = process.env.NODE_ENV || 'development';

const logLevels = {
    development: 'debug',
    staging: 'info',
    production: 'error',
};

const logger = winston.createLogger({
    level: logLevels[environment],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/error.log',
            level: 'error',
            maxSize: '10m',
            maxFiles: '14d',
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/info.log',
            level: 'info',
            maxSize: '10m',
            maxFiles: '14d',
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/warning.log',
            level: 'warn',
            maxSize: '10m',
            maxFiles: '14d',
        }),
    ],
});

if (environment === 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
    logger.add(new winston.transports.DailyRotateFile({
        filename: 'logs/debug.log',
        level: 'debug',
        maxSize: '10m',
        maxFiles: '14d',
    }));
}

if (environment === 'production') {
    logger.add(new winston.transports.DailyRotateFile({
        filename: 'logs/security.log',
        level: 'warn',
        maxSize: '10m',
        maxFiles: '14d',
        options: { flags: 'w' } 
    }));
}

module.exports = logger;
