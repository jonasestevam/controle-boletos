import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import AddBoleto from '../screens/AddBoleto';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddBoleto" component={AddBoleto} />
    </Stack.Navigator>
  );
};

export default Routes;
