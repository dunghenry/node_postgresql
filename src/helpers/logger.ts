import winston, { format } from 'winston';
export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'src/logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'src/logs/combined.log' }),
    ],
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata(),
        format.prettyPrint(),
    ),
});
export const myFormat = winston.format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.message}`;
});
