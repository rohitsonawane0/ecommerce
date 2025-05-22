// src/services/category.service.ts
import { prisma } from "../db/db.db";
import createHttpError from "http-errors";
import {
  CategoryCreateInput,
  CategoryResponse,
} from "../validations/category.validations";
const CategoryService = {
  async createCategory(
    createCategory: CategoryCreateInput
  ): Promise<CategoryResponse | null> {
    const { slug, name } = createCategory;
    const isSlugExist = await this.getCategoryBySlug(createCategory.slug);
    if (isSlugExist) {
      throw createHttpError.Conflict("Category with this slug already exists!");
    }
    return prisma.category.create({ data: { name, slug } });
  },

  async getCategoryBySlug(slug: string): Promise<CategoryResponse | null> {
    return prisma.category.findFirst({ where: { slug, isDeleted: false } });
  },

  async getAllCategories(): Promise<CategoryResponse[]> {
    return prisma.category.findMany({ where: { isDeleted: false } });
  },

  async getAllCategoriesBySearch(
    search: string
  ): Promise<CategoryResponse[] | null> {
    return prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
        isDeleted: false,
      },
    });
  },
};

export default CategoryService;
