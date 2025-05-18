import express from "express";
import { CategoryController } from "../controller/category.controller";
import { validate } from "../middleware/expressValidator.middleware";
import { categoryCreateSchema } from "../validations/category.validations";
// CategoryController

const router = express.Router();

router
  .route("/")
  .post(validate(categoryCreateSchema), CategoryController.createCategory)
  .get(CategoryController.getAllCategories);
// router.route("/login").post(login);
// router.route("/logout").post(logout);
// router.route("/refreshtoken").get(refreshToken);

export default router;
