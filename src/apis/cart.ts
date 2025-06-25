"use server";

import { createServerAction } from "zsa";
import { z } from "zod";

// These are now just placeholder actions since we're using Zustand for cart management
// But we keep them for compatibility with existing code

export const addToCartAction = createServerAction()
  .input(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number(),
      image: z.string(),
    })
  )
  .handler(async ({ input }) => {
    // Return success - actual logic is handled in Zustand store
    return { success: true, item: input };
  });

export const removeFromCartAction = createServerAction()
  .input(z.object({ productId: z.string() }))
  .handler(async ({ input }) => {
    // Return success - actual logic is handled in Zustand store
    return { success: true, productId: input.productId };
  });

export const clearCartAction = createServerAction()
  .input(z.object({}))
  .handler(async () => {
    // Return success - actual logic is handled in Zustand store
    return { success: true };
  });

export const getCartAction = createServerAction()
  .input(z.object({}))
  .handler(async () => {
    // Return empty cart - actual data comes from Zustand store
    return { items: [], total: 0 };
  });