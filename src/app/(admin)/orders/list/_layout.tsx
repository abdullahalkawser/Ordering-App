import { Stack, withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native';

const Tab = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderLayoutNavigations() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab>
        <Tab.Screen name='index' options={{title:'Active'}}/>
      </Tab>
    </SafeAreaView>
  );
}
