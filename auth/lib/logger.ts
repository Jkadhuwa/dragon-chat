import { format, transports, createLogger, addColors } from 'winston';

const { combine, timestamp, colorize, printf } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white'
};
addColors(colors);

const level = () => {
  const currentEnv = process.env.NODE_ENV || 'development';
  const isDevelopment = currentEnv === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const Logger = createLogger({
  transports: [
    new transports.Console({ level: 'debug' }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({ filename: 'logs/all.log' })
  ],
  level: level(),
  levels,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH-mm-ss-ms' }),
    colorize({ all: true }),
    printf((data) => `${data.timestamp} ${data.level}: ${data.message}`)
  )
});

export default Logger;
