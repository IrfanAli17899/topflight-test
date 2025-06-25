"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { addToCart, removeFromCart, clearCart, getCart } from "@/lib/cart";

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
    const cart = addToCart(input);
    return cart;
  });

export const removeFromCartAction = createServerAction()
  .input(z.object({ productId: z.string() }))
  .handler(async ({ input }) => {
    const cart = removeFromCart(input.productId);
    return cart;
  });

export const clearCartAction = createServerAction()
  .input(z.object({}))
  .handler(async () => {
    const cart = clearCart();
    return cart;
  });

export const getCartAction = createServerAction()
  .input(z.object({}))
  .handler(async () => {
    const cart = getCart();
    return cart;
  });