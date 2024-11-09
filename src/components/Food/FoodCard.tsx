import { Link, useSegments } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import RemoteImage from "../RemoteImage";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function FoodCard({ item }: { item: Product }) {
  const segments = useSegments();
  
  return (
    <Link href={`/${segments[0]}/menu/${item.id}`} asChild>
      <Pressable className="flex-1 p-4 bg-red-500 rounded-2xl shadow-xl w-1/2">
        <RemoteImage
         path={item.image}
         fallback="https://images.unsplash.com/photo-1637438333468-2ea466032288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
          style={{ width: "100%", height: 100, marginTop: 8 }}
          resizeMode="contain"
        />
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-500">${item.price}</Text>
      </Pressable>
    </Link>
  );
}
