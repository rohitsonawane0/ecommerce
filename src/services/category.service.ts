import { prisma } from "../db/db.db";

export const createCategory = async (name: string, slug: string) => {
  const createTemCategory = await prisma.category.create({
    data: { name, slug },
  });
  return createTemCategory;
};

export const getCategoryBySlug = async (slug: string) => {
  const categoryWithSlug = await prisma.category.findFirst({ where: { slug } });
  return categoryWithSlug;
};
