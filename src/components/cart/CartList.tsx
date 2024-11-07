import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { CartItem } from '@/types';
import { useCart } from '@/providers/CartProvider';
import Colors from '@/constants/Colors';


type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity,  } = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: cartItem.product.image || 'https://via.placeholder.com/75', // Placeholder for missing image
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={styles.icon}
        />
        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={styles.icon}
        />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    padding: 5,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginLeft: 10,
  },
});

export default CartListItem;
