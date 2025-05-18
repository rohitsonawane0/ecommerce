import app from "./app";
// import logger from "./configs/logger.config.js";

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  //   logger.info(`Listing on port: ${PORT}`);
  console.log(`Listing on port: ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    // logger.info("Server closed");
    process.kill(1);
  } else {
    process.kill(1);
  }
};
const unexpectedErrorHandler = (error: any) => {
  //   logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  if (server) {
    // logger.info("Server closed");
    // logger.info("Server closed");
    process.kill(1);
  }
});
