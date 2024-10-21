import OrderListItem from '@/components/order/order'
import OrderItemListItem from '@/components/order/OrderItemListItem'
import Colors from '@/constants/Colors'
import { OrderStatusList } from '@/types'
import orders from 'assets/data/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, Pressable } from 'react-native'

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
        ListFooterComponent={()=>(
          <>

  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => console.warn('Update status')}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        )}
      />
    </View>
  )
}

export default OrderDetails
