const winston = require('winston');
require('winston-daily-rotate-file');

const environment = process.env.NODE_ENV || 'development';

const getTransports = () => {
    const transports = [];

    if (environment !== 'production') {
        transports.push(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        );
    }

    transports.push(
        new winston.transports.DailyRotateFile({
            filename: 'logs/error.log',
            level: 'error',
            maxSize: '10m',
            maxFiles: '14d'
        })
    );

    transports.push(
        new winston.transports.DailyRotateFile({
            filename: 'logs/info.log',
            level: 'info',
            maxSize: '10m',
            maxFiles: '14d'
        })
    );

    if (environment === 'development') {
        transports.push(
            new winston.transports.DailyRotateFile({
                filename: 'logs/debug.log',
                level: 'debug',
                maxSize: '10m',
                maxFiles: '14d'
            })
        );
        transports.push(
            new winston.transports.DailyRotateFile({
                filename: 'logs/warning.log',
                level: 'warn',
                maxSize: '10m',
                maxFiles: '14d'
            })
        );
    }

    return transports;
};

const logger = winston.createLogger({
    level: environment === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: getTransports()
});

module.exports = logger;
