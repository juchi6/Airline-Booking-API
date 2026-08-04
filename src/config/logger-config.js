const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}: [${level}] : ${label ? `[${label}]` : ""}${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    customFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;
