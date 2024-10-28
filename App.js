import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

// Importing screens
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductPage from './screens/ProductPage';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen 
          name="ProductPage" 
          component={ProductPage} 
          options={({ route }) => ({ title: route.params.product["Product Name"] })} 
        />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
});
