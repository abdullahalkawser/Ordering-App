import React from 'react';
import { View, FlatList } from 'react-native';
import dataslist from '../../../../assets/data/orders';
import OrderListItem from '@/components/order/order';
import { Order } from '@/types';
import { useMyOrderList } from '@/api/orders';
import { Text } from 'react-native';


const OrderScreen = () => {
  const {data:order,isLoading,error}= useMyOrderList()
  // console.log(order)



  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading state
  }

  if (error instanceof Error) {
    return <Text>Error: {error.message}</Text>; // Display error state
  }
  return (
    <View >
      <FlatList
        data={order}
        renderItem={({ item }) => <OrderListItem order={item} />} // Type the item prop here
        keyExtractor={(item) => item.id.toString()} 
        contentContainerStyle={{gap:10,padding:13}}

    
      />
    </View>
  );
};

export default OrderScreen;
