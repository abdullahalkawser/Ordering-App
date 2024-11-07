import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/providers/CartProvider';
import { FlatList, Platform, Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import CartListItem from '@/components/cart/CartList';

const Cart = () => {
  const { items, total, checkout } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.totalText}>
        Total: ${total.toFixed(2)}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={styles.listContent}
      />

      <Button onPress={checkout} text="Checkout" style={styles.checkoutButton} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 20,
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 80, // Space for checkout button
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default Cart;
