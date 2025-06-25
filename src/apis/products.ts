"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { products, categories, type Product } from "@/data/products";

const searchProductsSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sortBy: z.enum(["name", "price-asc", "price-desc", "best-sellers"]).optional(),
  bestSellers: z.boolean().optional(),
  page: z.number().default(1),
  limit: z.number().default(12),
});

export const searchProductsAction = createServerAction()
  .input(searchProductsSchema)
  .handler(async ({ input }) => {
    let filteredProducts = [...products];

    // Filter by search query
    if (input.query) {
      const query = input.query.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (input.category && input.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === input.category
      );
    }

    // Filter by price range
    if (input.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= input.minPrice!
      );
    }

    if (input.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= input.maxPrice!
      );
    }

    // Filter by best sellers
    if (input.bestSellers) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isBestSeller
      );
    }

    // Sort products
    if (input.sortBy) {
      switch (input.sortBy) {
        case "name":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "price-asc":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "best-sellers":
          filteredProducts.sort((a, b) => {
            if (a.isBestSeller && !b.isBestSeller) return -1;
            if (!a.isBestSeller && b.isBestSeller) return 1;
            return 0;
          });
          break;
      }
    }

    // Pagination
    const startIndex = (input.page - 1) * input.limit;
    const endIndex = startIndex + input.limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page: input.page,
      totalPages: Math.ceil(filteredProducts.length / input.limit),
      categories,
    };
  });

export const getProductByIdAction = createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const product = products.find((p) => p.id === input.id);
    
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  });

export const getBestSellersAction = createServerAction()
  .input(z.object({ limit: z.number().default(6) }))
  .handler(async ({ input }) => {
    const bestSellers = products
      .filter((product) => product.isBestSeller)
      .slice(0, input.limit);

    return bestSellers;
  });