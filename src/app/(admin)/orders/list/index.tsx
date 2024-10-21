import React from 'react';
import { View, FlatList } from 'react-native';
import dataslist from '../../../../../assets/data/orders';
import OrderListItem from '@/components/order/order';
import { Order } from '@/types';


const OrderScreen = () => {
  return (
    <View >
      <FlatList
        data={dataslist}
        renderItem={({ item }) => <OrderListItem order={item} />} // Type the item prop here
        keyExtractor={(item) => item.id.toString()} 
        contentContainerStyle={{gap:10,padding:13}}

    
      />
    </View>
  );
};

export default OrderScreen;
