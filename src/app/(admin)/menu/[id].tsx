import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';

import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { UseProduct } from '@/api/products';

// Define the product type
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const Products = () => {
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']; // Pizza sizes

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);



  // Fetch product data using custom hook
  const { data: product, error, isLoading } = UseProduct(id); 
  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading state
  }

  if (error instanceof Error) {
    return <Text>Error: {error.message}</Text>; // Display error state
  }

  const router = useRouter(); // Router for navigation
  const { addItem } = useCart(); // Cart context
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null); // Size state



  // If no product is found, render an error message
  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Product not found</Text>
      </View>
    );
  }

  // Function to handle adding product to the cart
  const addtocart = () => {
    if (selectedSize) {
      alert(`Added ${product.name} of size ${selectedSize} to cart`);
      // Add the item to the cart
      addItem(product, selectedSize);
      // Navigate to the Cart page
      router.push('/Cart');
    } else {
      alert('Please select a size before adding to cart');
    }
  };

  return (
    <ScrollView className="bg-white p-5">
      <Stack.Screen options={{ title: 'Details' }} />
      <Stack.Screen
  
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      
      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        className="w-full h-96"
        resizeMode="contain"
      />
      
      {/* Product Name */}
      <Text className="text-2xl font-bold">Product: {product.name}</Text>

      {/* Product Price */}
      <Text className="text-lg font-bold mt-5">Price: ${product.price.toFixed(2)}</Text>
      
      {/* Size Selection (You can add size buttons here) */}
      <Text className="text-lg font-bold mt-5">Select Size:</Text>
      <View className="flex-row space-x-4 mt-3">
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            className={`px-4 py-2 rounded-lg ${
              selectedSize === size ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white">{size}</Text>
          </Pressable>
        ))}
      </View>

    </ScrollView>
  );
};

export default Products;
