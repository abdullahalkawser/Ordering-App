import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function FoodCard({ item }: { item: Product }) {
  return (
    <Link href={`/menu/${item.id}`} asChild>
    <Pressable className="flex-1 p-4 bg-slate-50 rounded-2xl shadow-xl w-1/2">
      <Image
        source={{ uri: item.image }}
        style={{ width: 100, height: 100 }} 
        className="mt-2 w-full"
        resizeMode="contain"
      />
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-500">${item.price}</Text>
    </Pressable></Link>
  );
}
