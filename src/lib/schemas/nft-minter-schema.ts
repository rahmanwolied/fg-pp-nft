import * as z from "zod";

export const createNFTSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  symbol: z.string().min(1, "Symbol is required").max(5, "Symbol is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file.type
        ),
      "File must be an image (JPEG, PNG, GIF, WEBP)"
    ),
  price: z.coerce
    .number()
    .min(0.001, "Price must be at least 0.001 ETH")
    .max(1000, "Price cannot exceed 1000 ETH"),
  royalty: z.coerce
    .number()
    .min(0, "Royalty cannot be negative")
    .max(15, "Royalty cannot exceed 15%"),
});

export type CreateNFTSchema = z.infer<typeof createNFTSchema>;
