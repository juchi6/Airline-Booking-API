const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const { errorHandler, notFound, httpLogger, RateLimiter } = require("./middlewares");

const app = express();

app.use(helmet());
app.use(cors({ origin: ServerConfig.CORS_ORIGIN }));
app.use(httpLogger);

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


app.use("/api", RateLimiter.apiLimiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  //console.log(`Hello to port ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server", "root", {});
});
