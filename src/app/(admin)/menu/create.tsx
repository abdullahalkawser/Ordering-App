import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { DeleteData, insertData, UpdateData, UseProduct } from '@/api/products';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import RemoteImage from '@/components/RemoteImage';


const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

  const isUpdating = !!id

  const {mutate:newData}= insertData()
  const {mutate:updatedProduct}= UpdateData()
  const {data:updatedata}= UseProduct(id)
  const {mutate:deletsdata}= DeleteData()



  useEffect(()=>{


    if (updatedata) {
      setProductName(updatedata.name)
      setPrice(updatedata.price.toString())
      setImage(updatedata.image)
      
    }

  },[updatedata])

  const router = useRouter()



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
  const ontimeupdate=()=>{
    if (!productName || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    updatedProduct({ id,name:productName,price: parseFloat(price),image}, {
      onSuccess:()=>{
        router.back()
        
      }
    })
    Alert.alert('Product Added', `Name: ${productName}, Price: ${price}`);
    // Handle form submission logic here

  }
  const onCreate= async()=>{
    if (!productName || !price) {
      Alert.alert('Error', 'Please fill in all fields');


      return;
    }
    const imagepath = await uploadImage()
newData({name:productName,price: parseFloat(price),image:imagepath}, {
  onSuccess:()=>{
    router.back()

    
  }
})



    Alert.alert('Product Added', `Name: ${productName}, Price: ${price}`);
    // Handle form submission logic here
    
  }



const onsubmit= ()=>{
  if (isUpdating) {
    ontimeupdate()
    
  }
  else{
    onCreate()
  }
}

const onDelete=()=>{
  deletsdata(id, {
    onSuccess:()=>{
      router.replace('/(admin)')
      
    }
  })

}
const confirmDelete = () => {
  Alert.alert(
    'Confirm', 
    'Are you sure you want to delete this?', 
    [
      {
        text: 'Cancel',
   
      },
      { 
        text: 'Delete', 
        onPress: onDelete,
        style: 'destructive', // Optional: for a red button, indicating a destructive action
      },
    ],
    { cancelable: true } // Optional: if you want to allow dismissing by tapping outside the alert
  );
};

const uploadImage = async () => {
  if (!image?.startsWith('file://')) {
    return;
  }

  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: 'base64',
  });
  const filePath = `${randomUUID()}.png`;
  const contentType = 'image/png';
  const { data, error } = await supabase.storage
    .from('product-image')
    .upload(filePath, decode(base64), { contentType });

  if (data) {
    return data.path;
  }
};


  return (
<ScrollView>
      <View className="bg-white min-h-screen p-3">
        <Stack.Screen options={{title:isUpdating ? "update product" :'create Product'}}/ >

      {/* <View  >
        <Image source={{ uri: 'https://media.istockphoto.com/id/645243318/photo/delicious-classic-italian-pizza-pepperoni-with-sausages-and-cheese-mozzarella.jpg?s=612x612&w=0&k=20&c=J3ZWNXmghZu-Wad1anCfplOnW0JoqK1zCD24fMmkt9o=' }} className='w-3/4 h-60 self-center' />
        {image && <Image source={{ uri: image }} className='w-3/4 h-60 self-center'/>}

        <Text className='text-center font-bold text-2xl mt-2'  onPress={pickImage}> Selcet Image</Text>
      </View> */}
       {/* Image section */}
       <View>
       <RemoteImage
            path={image}
            fallback="https://images.unsplash.com/photo-1637438333468-2ea466032288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
            style={{ width: '100%', height: 100, marginTop: 8 }}
            resizeMode="contain"
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

      <Button onPress={onsubmit} style={{ backgroundColor: 'blue', padding: 15, borderRadius: 8 }}  text={isUpdating ? 'Update Product' : 'Create Product'}  />
      {isUpdating && (

  <Button onPress={confirmDelete} style={{ backgroundColor: 'red', padding: 15, borderRadius: 8 }} text={'Delete'}>
   
  </Button>
)}
      </View>
      </ScrollView>
      

  );
};

export default CreateProduct;
