import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import { catchAsync } from "../utils/catchAsync";
import { BadRequestError, NotFoundError } from "../utils/error";
import {
  CategoryCreateInput,
  categoryCreateSchema,
} from "../validations/category.validations";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const created = await CategoryService.createCategory(req.body);
  res.status(201).json({
    status: true,
    message: "New category created",
    data: created,
  });
});

const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategories();
  const counts = categories.length;
  res.status(200).json({
    status: true,
    counts,
    data: categories,
  });
});

const searchCategories = catchAsync(async (req: Request, res: Response) => {
  const { q } = req.query as { q?: string };
  const categories = await CategoryService.getAllCategoriesBySearch(q || "");
  res.status(200).json({
    status: true,
    data: categories,
  });
});

const getCategoryBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const category = await CategoryService.getCategoryBySlug(slug);
    if (!category) {
      return next(new NotFoundError(`Category with slug '${slug}' not found`));
    }
    res.status(200).json({
      status: true,
      data: category,
    });
  }
);

/**
 * Exported Controller Object
 */
export const CategoryController = {
  createCategory,
  getAllCategories,
  searchCategories,
  getCategoryBySlug,
};
