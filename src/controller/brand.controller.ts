import { Request, Response, NextFunction } from "express";
import BrandService from "../services/brand.service";
import { catchAsync } from "../utils/catchAsync";

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const created = await BrandService.createBrand(req.body);
  res.status(201).json({
    status: true,
    message: "New brand created",
    data: created,
  });
});
const getAllBrands = catchAsync(async (_req: Request, res: Response) => {
  const categories = await BrandService.getAllBrands();
  const counts = categories.length;
  res.status(200).json({
    status: true,
    counts,
    data: categories,
  });
});

export const BrandController = {
  createBrand,
  getAllBrands,
};
