import { Link, useSegments } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

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
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 100, marginTop: 8 }}
          resizeMode="contain"
        />
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-500">${item.price}</Text>
      </Pressable>
    </Link>
  );
}
