const express = require("express");
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const { errorHandler, notFound } = require("./middlewares");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  //console.log(`Hello to port ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server", "root", {});
});
