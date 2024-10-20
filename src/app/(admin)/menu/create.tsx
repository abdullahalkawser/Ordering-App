import Button from '@/components/Button';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!productName || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Product Added', `Name: ${productName}, Price: ${price}`);
    // Handle form submission logic here
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };






  return (
    <ScrollView >
      <View className="bg-white min-h-screen p-5">
      <Text className="text-2xl font-bold mb-4">Add Product</Text>
      {/* <View  >
        <Image source={{ uri: 'https://media.istockphoto.com/id/645243318/photo/delicious-classic-italian-pizza-pepperoni-with-sausages-and-cheese-mozzarella.jpg?s=612x612&w=0&k=20&c=J3ZWNXmghZu-Wad1anCfplOnW0JoqK1zCD24fMmkt9o=' }} className='w-3/4 h-60 self-center' />
        {image && <Image source={{ uri: image }} className='w-3/4 h-60 self-center'/>}

        <Text className='text-center font-bold text-2xl mt-2'  onPress={pickImage}> Selcet Image</Text>
      </View> */}
       {/* Image section */}
       <View>
          {/* Display a default or selected image */}
          <Image
            source={{ uri: image || 'https://media.istockphoto.com/id/645243318/photo/delicious-classic-italian-pizza-pepperoni-with-sausages-and-cheese-mozzarella.jpg?s=612x612&w=0&k=20&c=J3ZWNXmghZu-Wad1anCfplOnW0JoqK1zCD24fMmkt9o=' }}
            className="w-3/4 h-60 self-center rounded-xl"
          />
          
          {/* Button to pick image */}
          <Text className="text-center font-bold text-2xl mt-2" onPress={pickImage}>
            Select Image
          </Text>
        </View>

      {/* Product Name Input */}
      <View className="mb-6">
        <Text className="text-lg mb-2">Product Name</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8 }}
          placeholder="Enter product name"
          value={productName}
          onChangeText={setProductName}
        />
      </View>

      {/* Price Input */}
      <View className="mb-6">
        <Text className="text-lg mb-2">Price</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8 }}
          placeholder="Enter product price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      {/* <TouchableOpacity
        onPress={handleSubmit}
       
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Product</Text>
      </TouchableOpacity> */}

      <Button onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 15, borderRadius: 8 }} text='Add Product' />
      </View>
      
    </ScrollView>
  );
};

export default CreateProduct;
