

import CartListItem from '@/components/cart/CartList';
import { useCart } from '@/providers/CartProvider'
import { FlatList, Text, View } from 'react-native'

const Cart = () => {
  const { items, addItem } = useCart();
  console.log(items)

  return (
    <View className='bg-white h-screen'>
<Text>Your Cart</Text>
<FlatList
data={items}    keyExtractor={item => item.id}
renderItem={({item})=> <CartListItem cartItem={item}/>}/>
      
    </View>
  )
}

export default Cart
