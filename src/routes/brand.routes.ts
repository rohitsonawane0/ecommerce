import express from "express";
import { BrandController } from "../controller/brand.controller";
import { validate } from "../middleware/expressValidator.middleware";
import { brandCreateSchema } from "../validations/brand.validations";
// CategoryController

const router = express.Router();

router
  .route("/")
  .post(validate(brandCreateSchema), BrandController.createBrand)
  .get(BrandController.getAllBrands);

export default router;
