import { FlatList, Text, View } from "react-native";
import dataslist from '../../../assets/data/products';
import FoodCard from "./FoodCard";

  
export default function Food() {
  return (
    <View>
      <Text>hiii one Food</Text>
      
      {/* FlatList to render items */}
      <FlatList
        data={dataslist}
        renderItem={({ item }) => <FoodCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{gap:10,padding:13}}
        columnWrapperStyle={{gap:10}}
      />
    </View>
  );
}
