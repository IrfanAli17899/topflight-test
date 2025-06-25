import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

interface CartStore {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCart: () => Cart;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
      },
      addToCart: (item) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.items.findIndex(
          cartItem => cartItem.productId === item.productId
        );
        
        if (existingItemIndex >= 0) {
          // Item already exists, don't add (limit to 1 quantity per product)
          return;
        } else {
          // Add new item with quantity 1
          const newItems = [...currentCart.items, { ...item, quantity: 1 }];
          const newTotal = calculateTotal(newItems);
          
          set({
            cart: {
              items: newItems,
              total: newTotal,
            },
          });
        }
      },
      removeFromCart: (productId) => {
        const currentCart = get().cart;
        const newItems = currentCart.items.filter(item => item.productId !== productId);
        const newTotal = calculateTotal(newItems);
        
        set({
          cart: {
            items: newItems,
            total: newTotal,
          },
        });
      },
      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
          },
        });
      },
      getCart: () => get().cart,
    }),
    {
      name: 'supplement-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);