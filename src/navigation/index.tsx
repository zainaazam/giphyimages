import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Tabs from './Tabs';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import Details from '../screens/Details';

function Navigation() {
  const {isLoggedIn} = useSelector((state: {User: any}) => state.User);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default Navigation;
