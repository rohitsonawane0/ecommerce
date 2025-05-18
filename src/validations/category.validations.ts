// src/utils/validation/category.schema.ts
import { z } from "zod";

// 1. Base shape
const categoryBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  parentId: z.number().int().nullable().optional(),
  description: z.string().max(1000).optional(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

// 2. Create / Update input
export const categoryCreateSchema = categoryBaseSchema;
export const categoryUpdateSchema = categoryBaseSchema.partial();

// 3. Full response (with DB-generated fields)
export const categoryResponseSchema = categoryBaseSchema.extend({
  id: z.number().int(),
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
  // If you want to include relations, uncomment and adjust:
  // parent: z.lazy(() => categoryResponseSchema).nullable(),
  // children: z.array(z.lazy(() => categoryResponseSchema)),
});

// 4. TypeScript types
export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
