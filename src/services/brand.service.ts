import { prisma } from "../db/db.db";
import createHttpError from "http-errors";
import {
  BrandCreateInput,
  BrandResponse,
} from "../validations/brand.validations";

const BrandService = {
  async createBrand(brandCreateSchema: BrandCreateInput) {},

  async findBrandBySlug(slug: string): Promise<BrandResponse | null> {
    return prisma.brand.findFirst({ where: { slug, isDeleted: false } });
  },
  async getAllBrands(): Promise<BrandResponse[]> {
    return prisma.brand.findMany({ where: { isDeleted: false } });
  },
};

export default BrandService;
