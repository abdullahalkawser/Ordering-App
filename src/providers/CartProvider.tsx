import { supabase } from "@/lib/supabase";
import { CartItem, Product, OrderItem, PizzaSize } from "@/types";
import React, { createContext, useState, useContext, PropsWithChildren } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useInsertOrderitem } from "@/api/order-items";
import { router } from "expo-router";

// Define the type for the CartContext
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemid: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

// Default value for the context
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

// Create the CartProvider component
export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add items to the cart
  const addItemToCart = (product: Product, size: CartItem['size']) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
    } else {
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
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemid) {
            const newQuantity = item.quantity + amount;
            if (newQuantity < 1) return null; // Don't allow quantity to be less than 1
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[] // Remove null items
    );
  };



  // Total cost calculation
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Mutations for inserting orders and order items
  const { mutate: insertOrder,} = useInsertOrder();


  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: (data) => {
          // Assuming `orderResponse` contains the order data or a success message
          console.log("Order successfully inserted:", data);
          setCartItems([]);
        },
        onError: (error) => {
          console.error("Error inserting order:", error);
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
        total,
        checkout,
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
