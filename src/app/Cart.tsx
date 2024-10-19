
import { StatusBar } from 'expo-status-bar';
import CartListItem from '@/components/cart/CartList';
import { useCart } from '@/providers/CartProvider'
import { FlatList,Platform, Text, View } from 'react-native'

const Cart = () => {
  const { items, total } = useCart();
  console.log(items)

  return (
    <View className='bg-white h-screen'>
<Text>Your Cart</Text>
<Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
        Total: ${total}
      </Text>



<FlatList
data={items}    keyExtractor={item => item.id}
renderItem={({item})=> <CartListItem cartItem={item}/>}/>



      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default Cart
