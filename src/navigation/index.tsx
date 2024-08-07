import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Tabs from './Tabs';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import 'react-native-gesture-handler';

function Navigation() {
  const {isLoggedIn} = useSelector((state: {User: any}) => state.User);

  return (
    <NavigationContainer>
      {isLoggedIn ? <Tabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Navigation;
