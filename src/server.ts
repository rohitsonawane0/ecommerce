import { error } from "console";
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
    console.log(error);
    // process.kill(1);
  } else {
    console.log(error);
    // process.kill(1);
  }
};
const unexpectedErrorHandler = (error: any) => {
  //   logger.error(error);
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
// process.on("SIGTERM", () => {
//   if (server) {
//     // logger.info("Server closed");
//     // logger.info("Server closed");
//     console.log(error);
//     process.kill(1);
//   }
// });
