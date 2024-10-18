import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import product from '../../assets/data/products';

// Define a type for the product
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const Products = () => {
  const sizes = ['S', 'M', 'L', 'XL'];
  const params = useLocalSearchParams();
  const router = useRouter(); // Initialize the router
  
  // State for selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
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
      router.push('/Cart'); // Assuming your cart page is located at /cart
    } else {
      alert('Please select a size before adding to cart');
    }
  };

  return (
    <ScrollView className='bg-white p-5'>
      <Image
        source={{ uri: products.image }}
        className="w-full h-96"
        resizeMode="contain"
      />
      <Text className='text-2xl font-bold'>Product: {products.name}</Text>
      <Text className='text-lg font-bold mt-4'>Select Size</Text>

      <View className='flex-row justify-around mt-3'>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)} // Set selected size on press
            className={`rounded-full p-4 items-center justify-center ${
              selectedSize === size ? 'bg-blue-500' : 'bg-slate-200'
            }`}
          >
            <Text className={`${selectedSize === size ? 'text-white' : 'text-black'}`}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text className='text-lg font-bold mt-5'>Price: ${products.price.toFixed(2)}</Text>

      {/* Add to Cart Button */}
      <Pressable onPress={addtocart} className='bg-blue-500 mt-6 py-3 rounded-full'>
        <Text className='text-center text-white text-lg font-semibold'>Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Products;
