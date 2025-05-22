import { z } from "zod";

const brandBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().max(1000).nullable().optional(),
  logoUrl: z.string().max(5000).nullable().optional(),
  website: z.string().max(5000).nullable().optional(),
});

export const brandCreateSchema = brandBaseSchema;
export const brandUpdateSchema = brandBaseSchema.partial();

export const brandResponse = brandBaseSchema.extend({
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

export type BrandCreateInput = z.infer<typeof brandCreateSchema>;
export type BrandUpdateInput = z.infer<typeof brandUpdateSchema>;
export type BrandResponse = z.infer<typeof brandResponse>;
