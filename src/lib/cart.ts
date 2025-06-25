export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Simple in-memory cart storage (in a real app, this would be in localStorage or a state management solution)
let cart: Cart = {
  items: [],
  total: 0
};

export const getCart = (): Cart => {
  return cart;
};

export const addToCart = (item: Omit<CartItem, 'quantity'>): Cart => {
  const existingItemIndex = cart.items.findIndex(cartItem => cartItem.productId === item.productId);
  
  if (existingItemIndex >= 0) {
    // Item already exists, don't add (limit to 1 quantity per product as per requirements)
    return cart;
  } else {
    // Add new item with quantity 1
    cart.items.push({ ...item, quantity: 1 });
  }
  
  // Recalculate total
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return cart;
};

export const removeFromCart = (productId: string): Cart => {
  cart.items = cart.items.filter(item => item.productId !== productId);
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return cart;
};

export const clearCart = (): Cart => {
  cart = {
    items: [],
    total: 0
  };
  
  return cart;
};