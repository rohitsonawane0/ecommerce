import { Request, Response, NextFunction } from "express";
import ProductService from "../services/product.service";
import { catchAsync } from "../utils/catchAsync";
import { Prisma } from "@prisma/client";

const ProductController = {
  createProduct: catchAsync(async (req: Request, res: Response) => {
    const product = await ProductService.create(req.body);
    res.status(201).json({
      status: "success",
      data: product,
    });
  }),
  getAllProduct: catchAsync(async (req: Request, res: Response) => {
    const created = await ProductService.find();
    res.status(201).json({
      status: true,
      message: "Product fetched",
      data: created,
    });
  }),
};

export default ProductController;
