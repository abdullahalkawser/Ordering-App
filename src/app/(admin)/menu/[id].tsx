import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import product from '../../../../assets/data/products';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

// Define a type for the product
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const Products = () => {
  const sizes : PizzaSize[] = ['S', 'M', 'L', 'XL'];
  const params = useLocalSearchParams();
  const router = useRouter(); // Initialize the router
  const {addItem} = useCart()
  
  // State for selected size
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);
  const products = product.find((p) => p.id.toString() === params.id);

  // Handle case where the product is not found
  if (!products) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-lg'>Product not found</Text>
      </View>
    );
  }

  const addtocart = () => {
    if (selectedSize) {
      alert(`Added ${products.name} of size ${selectedSize} to cart`);
      // Navigate to the cart page (adjust the route as needed)
      addItem(products,selectedSize)
      router.push('/Cart'); // Assuming your cart page is located at /cart
    } else {
      alert('Please select a size before adding to cart');
    }
  };

  return (
    <ScrollView className='bg-white p-5'>
       <Stack.Screen  options={{title: 'Details'}}/>
      <Image
        source={{ uri: products.image }}
        className="w-full h-96"
        resizeMode="contain"
      />
      <Text className='text-2xl font-bold'>Product: {products.name}</Text>
    



      <Text className='text-lg font-bold mt-5'>Price: ${products.price.toFixed(2)}</Text>

    </ScrollView>
  );
};

export default Products;
