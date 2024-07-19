const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logDir = path.join(__dirname, 'logs');

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Common transports for all environments
const commonTransports = [
  new DailyRotateFile({
    filename: `${logDir}/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxSize: '10m',
    maxFiles: '14d' // Keep logs for 14 days
  }),
  new DailyRotateFile({
    filename: `${logDir}/info-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    maxSize: '10m',
    maxFiles: '14d'
  }),
  new DailyRotateFile({
    filename: `${logDir}/warning-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: 'warn',
    maxSize: '10m',
    maxFiles: '14d'
  })
];

// Development specific transport
const devTransports = [
  new DailyRotateFile({
    filename: `${logDir}/debug-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: 'debug',
    maxSize: '10m',
    maxFiles: '14d'
  }),
  new transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      logFormat
    )
  })
];

// Logger creation function
const createEnvironmentLogger = (env) => {
  let transportList = [...commonTransports];

  if (env === 'development') {
    transportList = [...transportList, ...devTransports];
  } else if (env === 'staging') {
    transportList.push(new transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    }));
  } else if (env === 'production') {
    transportList.push(new transports.Console({
      format: combine(
        timestamp(),
        logFormat
      )
    }));
  }

  return createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: combine(
      timestamp(),
      logFormat
    ),
    transports: transportList
  });
};

// Detect environment
const env = process.env.NODE_ENV || 'development';
const logger = createEnvironmentLogger(env);

module.exports = logger;
