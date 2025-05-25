import { z } from "zod";

// Base schema for product creation input validation
const productBaseSchema = z.object({
  sku: z
    .string({ required_error: "sku is required" })
    .nonempty({ message: "sku cannot be empty" })
    .min(3, { message: "sku is minimum 3 chars" }),

  name: z
    .string({ required_error: "name is required" })
    .nonempty({ message: "name cannot be empty" })
    .min(3, { message: "name is minimum 3 chars" }),

  slug: z
    .string({ required_error: "slug is required" })
    .nonempty({ message: "slug cannot be empty" })
    .min(3, { message: "slug is minimum 3 chars" }),

  description: z.string().optional(),
  shortDescription: z.string().optional(),

  price: z
    .string({ required_error: "price is required" })
    .nonempty({ message: "price cannot be empty" })
    .regex(/^\d+(\.\d+)?$/, {
      message: "price must be a positive number string",
    }),

  salePrice: z
    .string()
    .regex(/^\d+(\.\d+)?$/, {
      message: "salePrice must be a positive number string",
    })
    .optional(),

  costPrice: z
    .string()
    .regex(/^\d+(\.\d+)?$/, {
      message: "costPrice must be a positive number string",
    })
    .optional(),

  quantity: z.number().int().optional(),

  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),

  mainImageUrl: z.string().url().optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  productType: z
    .string({ required_error: "productType is required" })
    .nonempty({ message: "productType cannot be empty" }),

  weight: z.string().optional(),

  dimensions: z.any().optional(), // Could refine further if you want

  brandId: z.number().optional(),

  categoryIds: z.array(z.number()).optional(),

  images: z
    .array(
      z.object({
        imageUrl: z.string().url({ message: "imageUrl must be a valid URL" }),
        altText: z.string().nonempty({ message: "altText is required" }),
        isPrimary: z.boolean().optional(),
        displayOrder: z.number().optional(),
      })
    )
    .optional(),

  electronicsSpecs: z
    .object({
      processor: z.string().nonempty({ message: "processor is required" }),
      ram: z.string().nonempty({ message: "ram is required" }),
      storage: z.string().nonempty({ message: "storage is required" }),
      screenSize: z.string().nonempty({ message: "screenSize is required" }),
      battery: z.string().nonempty({ message: "battery is required" }),
      camera: z.string().nonempty({ message: "camera is required" }),
      connectivity: z
        .string()
        .nonempty({ message: "connectivity is required" }),
      operatingSystem: z
        .string()
        .nonempty({ message: "operatingSystem is required" }),
      warrantyInfo: z
        .string()
        .nonempty({ message: "warrantyInfo is required" }),
      additionalSpecs: z
        .object({
          noiseCancellation: z
            .string()
            .nonempty({ message: "noiseCancellation is required" }),
          mic: z.string().nonempty({ message: "mic is required" }),
        })
        .optional(),
    })
    .optional(),
});

export const productCreateSchema = productBaseSchema;
export const productUpdateSchema = productCreateSchema.partial();

export const productResponse = productBaseSchema.extend({
  id: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    z.date()
  ),
  updatedAt: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    z.date()
  ),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProductResponse = z.infer<typeof productResponse>;
