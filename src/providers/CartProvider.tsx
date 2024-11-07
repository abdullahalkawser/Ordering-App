import { CartItem, Product } from '@/types';
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';
import { randomUUID } from 'expo-crypto';
import {  useInsertOrder } from '@/api/orders';

// Define the type for the CartContext
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemid: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void; // Fixed property spelling
};

// Default value for the context
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {}, // Updated to match the type
});

// Create the CartProvider component
export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addItemToCart = (product: Product, size: CartItem['size']) => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (existingItem) {
      // If item exists, increment its quantity
      updateQuantity(existingItem.id, 1);
    } else {
      // If item doesn't exist, create a new item
      const newItem: CartItem = {
        id: randomUUID(),
        product,
        product_id: product.id,
        quantity: 1,
        size,
      };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (itemid: string, amount: -1 | 1) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemid) {
            const newQuantity = item.quantity + amount;
            // Remove the item if quantity is less than 1
            if (newQuantity < 1) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null); // Filter out items marked for removal
    });
  };

  // Calculate the total price of the items in the cart
  const total = cartItems.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  const { mutate: insertOrder } = useInsertOrder();

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: (data) => {
          console.log('Order inserted successfully:', data);
        },
        onError: (error) => {
          console.error('Error inserting order:', error);
        },
      }
    );
  };
  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addItem: addItemToCart,
        updateQuantity,
        total, // Include the total in the context value
        checkout, // Updated spelling
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);

};
