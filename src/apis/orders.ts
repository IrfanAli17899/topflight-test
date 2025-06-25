"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { orders, orderStatuses, type Order } from "@/data/orders";

const searchOrdersSchema = z.object({
  query: z.string().optional(),
  status: z.enum([...orderStatuses, "all"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(10),
});

export const searchOrdersAction = createServerAction()
  .input(searchOrdersSchema)
  .handler(async ({ input }) => {
    let filteredOrders = [...orders];

    // Filter by search query (order ID, product name, customer name)
    if (input.query) {
      const query = input.query.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(query)
          )
      );
    }

    // Filter by status
    if (input.status && input.status !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === input.status
      );
    }

    // Filter by date range
    if (input.startDate) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.createdAt) >= new Date(input.startDate!)
      );
    }

    if (input.endDate) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.createdAt) <= new Date(input.endDate!)
      );
    }

    // Sort by creation date (newest first)
    filteredOrders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const startIndex = (input.page - 1) * input.limit;
    const endIndex = startIndex + input.limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      total: filteredOrders.length,
      page: input.page,
      totalPages: Math.ceil(filteredOrders.length / input.limit),
      statuses: orderStatuses,
    };
  });

export const getOrderByIdAction = createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const order = orders.find((o) => o.id === input.id);
    
    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  });

export const updateOrderStatusAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
      status: z.enum(orderStatuses),
    })
  )
  .handler(async ({ input }) => {
    const orderIndex = orders.findIndex((o) => o.id === input.id);
    
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    orders[orderIndex].status = input.status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    return orders[orderIndex];
  });

const createOrderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  shippingAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ).min(1, "At least one item is required"),
  total: z.number().min(0),
});

export const createOrderAction = createServerAction()
  .input(createOrderSchema)
  .handler(async ({ input }) => {
    const newOrder: Order = {
      id: `ORD-${(orders.length + 1).toString().padStart(3, '0')}`,
      ...input,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.unshift(newOrder); // Add to beginning of array

    return newOrder;
  });