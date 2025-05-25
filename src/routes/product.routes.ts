import express from "express";
import ProductController from "../controller/product.controller";
import { validate } from "../middleware/expressValidator.middleware";
import { productCreateSchema } from "../validations/product.validations";
// CategoryController

const router = express.Router();

router
  .route("/")
  .post(validate(productCreateSchema), ProductController.createProduct)
  .get(ProductController.getAllProduct);
// router.route("/login").post(login);
// router.route("/logout").post(logout);
// router.route("/refreshtoken").get(refreshToken);

export default router;
