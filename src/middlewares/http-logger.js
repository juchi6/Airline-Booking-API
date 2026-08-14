const morgan = require("morgan");
const { Logger } = require("../config");

const stream = {
    write: (message) => Logger.info(message.trim(), "HTTP", {}),
};

const httpLogger = morgan("combined", { stream });

module.exports = httpLogger;
