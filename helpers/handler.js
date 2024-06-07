const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const handler = (func) => (req, res) => {
  try {
    logger.info("server.handler.begun");
    func(req, res, logger);
  } catch (e) {
    logger.info("server.handler.failed");
    res.send("Oh no, something did not go well!");
  }
};

module.exports = { handler };
