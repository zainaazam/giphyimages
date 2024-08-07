import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Home from '../../screens/Home';
import Details from '../../screens/Details';

const Stack = createSharedElementStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Details"
        component={Details}
        sharedElements={(route: any) => {
          const {item} = route.params;
          return [`item.${item.id}.image`];
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
