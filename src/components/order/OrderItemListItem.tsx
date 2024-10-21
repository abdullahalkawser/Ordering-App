import { View, Text, Image } from 'react-native';
import React from 'react';

import { OrderItem } from '@/types';



type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View className='bg-white rounded-lg p-2 flex-row items-center mt-3'>
      <Image
        source={{ uri: item.products.image || 'pizza' }}
      className='w-20 aspect-square self-center mr-3'
        resizeMode="contain"
      />
      <View className='flex-1'>
        <Text className='font-medium text-lg mb-1'>{item.products.name}</Text>
        <View className='flex-row space-x-2'>
          <Text className='text-blue-500 font-bold'>${item.products.price.toFixed(2)}</Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>
      <View className='flex-row space-x-2 items-center my-2'>
        <Text className='font-medium text-lg'>{item.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;
