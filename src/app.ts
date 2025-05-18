import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import compression from "compression";
import multer from "multer";
import cors from "cors";

import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware";
import { NotFoundError } from "./utils/error";
import router from "./routes";

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

app.use("/api/v1", router);
app.use(async (req, res, next) => {
  next(new NotFoundError("This route not found"));
});

app.use(globalErrorHandler);

export default app;
