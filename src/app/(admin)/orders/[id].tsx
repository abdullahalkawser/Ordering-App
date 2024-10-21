import OrderListItem from '@/components/order/order'
import OrderItemListItem from '@/components/order/OrderItemListItem'
import orders from 'assets/data/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'

import { View,Text } from 'react-native'

const OrderDetails = () => {
    const {id}= useLocalSearchParams()
    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
      return <Text>Order not found!</Text>;
    }
  return (
    <View className='p-3'>
        <Stack.Screen options={{ title: `order #${id}`}}/>
        <OrderListItem order={order} />
        <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  )
}

export default OrderDetails
