import { prisma } from "../db/db.db";
import createHttpError from "http-errors";
import { ProductCreateInput } from "../validations/product.validations";
import { Prisma } from "@prisma/client";

const ProductService = {
  async create(createProduct: ProductCreateInput) {
    const data = createProduct;
    const createProductData = {
      sku: data.sku,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: new Prisma.Decimal(data.price),
      salePrice: data.salePrice
        ? new Prisma.Decimal(data.salePrice)
        : undefined,
      costPrice: data.costPrice
        ? new Prisma.Decimal(data.costPrice)
        : undefined,
      quantity: data.quantity ?? 0,
      isActive: data.isActive ?? true,
      isFeatured: data.isFeatured ?? false,
      mainImageUrl: data.mainImageUrl,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      productType: data.productType,
      weight: data.weight ? new Prisma.Decimal(data.weight) : undefined,
      dimensions: data.dimensions,

      // Connect brand by ID if provided
      brand: data.brandId ? { connect: { id: data.brandId } } : undefined,

      // Connect categories by IDs if provided
      categories: data.categoryIds
        ? { connect: data.categoryIds.map((id: number) => ({ id })) }
        : undefined,

      // Create images if provided
      images: data.images ? { create: data.images } : undefined,

      // Create electronics specs if provided
      electronicsSpecs: data.electronicsSpecs
        ? {
            create: {
              ...data.electronicsSpecs,
              additionalSpecs: data.electronicsSpecs.additionalSpecs
                ? { create: data.electronicsSpecs.additionalSpecs }
                : undefined,
            },
          }
        : undefined,
    };

    return prisma.product.create({ data: createProductData });
  },
  async find() {
    return prisma.product.findMany({ where: { isDeleted: false } });
  },
};

export default ProductService;
