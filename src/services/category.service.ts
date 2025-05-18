// src/services/category.service.ts
import { prisma } from "../db/db.db";
import createHttpError from "http-errors";
import { CategoryCreateInput } from "../validations/category.validations";
const CategoryService = {
  async createCategory(createCategory: CategoryCreateInput) {
    const { slug, name } = createCategory;
    const isSlugExist = await this.getCategoryBySlug(createCategory.slug);
    if (isSlugExist) {
      throw createHttpError.Conflict("Category with this slug already exists!");
    }
    return prisma.category.create({ data: { name, slug } });
  },

  async getCategoryBySlug(slug: string) {
    return prisma.category.findFirst({ where: { slug } });
  },

  async getAllCategories() {
    return prisma.category.findMany();
  },

  async getAllCategoriesBySearch(search: string) {
    return prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      },
    });
  },
};

export default CategoryService;
