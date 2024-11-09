import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';

import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { UseProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

// Define the product type
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const Products = () => {
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);

  const { data: product, error, isLoading } = UseProduct(id);

  // Render loading or error states as needed
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error instanceof Error) {
    return <Text>Error: {error.message}</Text>;
  }

  // If no product is found, render an error message
  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Product not found</Text>
      </View>
    );
  }

  // Function to handle adding product to the cart
  const addToCart = () => {
    if (selectedSize) {
      alert(`Added ${product.name} of size ${selectedSize} to cart`);
      addItem(product, selectedSize);
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
      <RemoteImage
         path={product.image}
         fallback="https://images.unsplash.com/photo-1637438333468-2ea466032288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
          style={{ width: "100%", height: 100, marginTop: 8 }}
          resizeMode="contain"
        />

      {/* Product Name */}
      <Text className="text-2xl font-bold mt-4">Product: {product.name}</Text>

      {/* Product Price */}
      <Text className="text-lg font-bold mt-5">Price: ${product.price.toFixed(2)}</Text>

      {/* Size Selection */}
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

      {/* Add to Cart Button */}
      <Pressable onPress={addToCart} className="mt-8 px-4 py-2 bg-green-500 rounded-lg">
        <Text className="text-white text-center">Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Products;
