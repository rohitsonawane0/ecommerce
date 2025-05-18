import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import compression from "compression";
import multer from "multer";
import cors from "cors";

import createHttpError from "http-errors";

import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware";
import { NotFoundError } from "./utils/error";
// import { AppError } from "./utils/error.utils.js";

dotenv.config();
//create express app
const app = express();
//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//helmet
app.use(helmet());

//parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//enable cookie parser
app.use(cookieParser());

//zgip compression
app.use(compression());

//file upload
app.use(multer().any());

//cors
app.use(cors());

app.get("/", (req, res) => {
  throw new NotFoundError("page you are looking not found");
});
//
// app.use("/api/v1", router);
// app.use(async (req, res, next) => {
//   next(new AppError("This route not found", 404));
// });

app.use(globalErrorHandler);

export default app;
