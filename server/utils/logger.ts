import path from 'path';
import winston from 'winston';

const errorLogPath = path.join(__dirname, '..', 'logs', 'error.log');
const combinedLogPath = path.join(__dirname, '..', 'logs', 'combined.log');

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: errorLogPath, level: 'error' }),
    new winston.transports.File({ filename: combinedLogPath }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);
