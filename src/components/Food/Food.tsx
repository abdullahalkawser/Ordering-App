import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
// import dataslist from "../../../assets/data/products"; // Fallback data
import FoodCard from "./FoodCard";
import { supabase } from "@/lib/supabase";

export default function Food() {
  // Fetch products using react-query and Supabase
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) { 
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading state
  }

  if (error) {
    return <Text>Error: {error.message}</Text>; // Display error state
  }

  return (
    <View>
      <Text>hiii one Food</Text>
      {/* FlatList to render items */}
      <FlatList
        data={products} // Use fetched data or fallback to mock data
        renderItem={({ item }) => <FoodCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 13 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
