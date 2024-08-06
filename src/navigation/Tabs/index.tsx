import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../../Theme/ThemeContext';
import CustomTabBar from '../../components/CustomTabBar';
import Home from '../../screens/Home';
import Icon from '../../components/Icon';
import Search from '../../screens/Search';
import Favorites from '../../screens/Favorites';
import Profile from '../../screens/Profile';

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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={
                focused
                  ? require(`../../assets/icons/home-filled.png`)
                  : require(`../../assets/icons/home.png`)
              }
              size={22}
              color={colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={
                focused
                  ? require(`../../assets/icons/search-filled.png`)
                  : require(`../../assets/icons/search.png`)
              }
              size={22}
              color={colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon.Custom
              name={
                focused
                  ? require(`../../assets/icons/favorites-filled.png`)
                  : require(`../../assets/icons/favorites.png`)
              }
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
              name={
                focused
                  ? require(`../../assets/icons/profile-filled.png`)
                  : require(`../../assets/icons/profile.png`)
              }
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
