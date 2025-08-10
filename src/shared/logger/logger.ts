import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'logs');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

export const logger = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.errors({
                    stack: true,
                }),
                format.colorize({
                    colors: {
                        debug: 'gray',
                        error: 'red',
                        http: 'blue',
                        info: 'green',
                        silly: 'magenta',
                        verbose: 'cyan',
                        warn: 'yellow',
                    },
                }),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
            handleExceptions: true,
        }),

        new transports.File({
            filename: path.join(dir, 'info.txt'),
            level: 'info',
            format: format.combine(
                format((info) => info.level === 'info' ? info : false)(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
        }),

        new transports.File({
            filename: path.join(dir, 'logs.txt'),
            level: 'error',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.errors({
                    stack: true,
                }),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
        }),
    ],
});