import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { UseProduct } from '@/api/products';


const Products = () => {
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const router = useRouter(); // Initialize the router
  const { addItem } = useCart();

  // Fetch product data using custom hook
  const { data: product, error, isLoading } = UseProduct(id); 

  // State for selected size
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);

  // Handle case where the product is not found
  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading state
  }

  if (error instanceof Error) {
    return <Text>Error: {error.message}</Text>; // Display error state
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Product not found</Text>
      </View>
    );
  }

  const addToCart = () => {
    if (selectedSize) {
      alert(`Added ${product.name} of size ${selectedSize} to cart`);
      addItem(product, selectedSize);
      router.push('/Cart'); // Navigate to cart
    } else {
      alert('Please select a size before adding to cart');
    }
  };

  return (
    <ScrollView className="bg-white p-5">
      <Stack.Screen options={{ title: 'Details' }} />
      <Image
        source={{ uri: product.image }}
        className="w-full h-96"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold">Product: {product.name}</Text>
      <Text className="text-lg font-bold mt-4">Select Size</Text>

      <View className="flex-row justify-around mt-3">
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)} // Set selected size on press
            className={`rounded-full p-4 items-center justify-center ${
              selectedSize === size ? 'bg-blue-500' : 'bg-slate-200'
            }`}
          >
            <Text className={`${selectedSize === size ? 'text-white' : 'text-black'}`}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-lg font-bold mt-5">Price: ${product.price.toFixed(2)}</Text>

      {/* Add to Cart Button */}
      <Pressable onPress={addToCart} className="bg-blue-500 mt-6 py-3 rounded-full">
        <Text className="text-center text-white text-lg font-semibold">Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Products;
