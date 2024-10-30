import "../../../../global.css";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "@/components/Food/FoodCard";
import { supabase } from "@/lib/supabase";
import { UseProductList } from "@/api/products";



export default function TabOneScreen() {
  
  // Fetch products using useQuery
  const { data: products, isLoading, error } =UseProductList()

  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading state
  }

  if (error instanceof Error) {
    return <Text>Error: {error.message}</Text>; // Display error state
  }

  return (
    <View>
      {/* FlatList to render items */}
      <FlatList
        data={products} // Use fetched data
        renderItem={({ item }) => <FoodCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 13 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
