import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button, Text, View, Alert } from "react-native";
import { User } from "@supabase/auth-js";


const ProfileScreen: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);

  // Ensure this useEffect only runs once by providing an empty dependency array.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Unexpected error fetching user:", error);
      }
    };
    
    fetchUser();
  }, []); // Adding [] ensures it runs only once.

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: async () => await supabase.auth.signOut() },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Profile</Text>
      {user && (
        <Text className="text-lg text-gray-600 mb-6">
          Welcome, {user.email ?? "No email available"}
        </Text>
      )}
      <View className="w-full px-10">
        <Button title="Sign Out" onPress={handleSignOut} color="#f87171" />
      </View>
    </View>
  );
};

export default ProfileScreen;
