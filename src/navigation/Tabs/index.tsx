import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../../Theme/ThemeContext';
import CustomTabBar from '../../components/CustomTabBar';
import Icon from '../../components/Icon';
import Profile from '../../screens/Profile';
import HomeStack from '../HomeStack';
import FavoritesStack from '../FavoritesStack';
import SearchStack from '../SearchStack';

const homeIcon = require('../../assets/icons/home.png');
const homeFilledIcon = require('../../assets/icons/home-filled.png');
const searchIcon = require('../../assets/icons/search.png');
const searchFilledIcon = require('../../assets/icons/search-filled.png');
const favoritesIcon = require('../../assets/icons/favorites.png');
const favoritesFilledIcon = require('../../assets/icons/favorites-filled.png');
const profileIcon = require('../../assets/icons/profile.png');
const profileFilledIcon = require('../../assets/icons/profile-filled.png');

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={focused ? homeFilledIcon : homeIcon}
              size={22}
              color={colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={focused ? searchFilledIcon : searchIcon}
              size={22}
              color={colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={focused ? favoritesFilledIcon : favoritesIcon}
              size={22}
              color={colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={focused ? profileFilledIcon : profileIcon}
              size={22}
              color={colors.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
