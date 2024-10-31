import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { insertData, UpdateData, UseProduct } from '@/api/products';

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
  const onCreate=()=>{
    if (!productName || !price) {
      Alert.alert('Error', 'Please fill in all fields');


      return;
    }
newData({name:productName,price: parseFloat(price),image}, {
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
  console.warn('Delete')

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
          {/* Display a default or selected image */}
          <Image
            source={{ uri: image || 'https://media.istockphoto.com/id/645243318/photo/delicious-classic-italian-pizza-pepperoni-with-sausages-and-cheese-mozzarella.jpg?s=612x612&w=0&k=20&c=J3ZWNXmghZu-Wad1anCfplOnW0JoqK1zCD24fMmkt9o=' }}
            className="w-2/3 h-60 self-center rounded-xl"
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
