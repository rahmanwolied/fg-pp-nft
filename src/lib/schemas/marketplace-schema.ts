import * as z from "zod";

export const marketplaceFilterSchema = z.object({
  search: z.string().optional(),
  sortBy: z
    .enum([
      "newest",
      "oldest",
      "name_asc",
      "name_desc",
      "price_asc",
      "price_desc",
    ])
    .default("newest"),
  category: z
    .enum([
      "all",
      "art",
      "collectibles",
      "domain",
      "music",
      "photography",
      "sports",
      "utility",
    ])
    .default("all"),
  priceRange: z
    .object({
      min: z.number().min(0).default(0),
      max: z.number().min(0).default(1000),
    })
    .default({ min: 0, max: 1000 }),
  onlyVerified: z.boolean().default(false),
});

export type MarketplaceFilterValues = z.infer<typeof marketplaceFilterSchema>;
