import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Details from '../../screens/Details';
import Favorites from '../../screens/Favorites';

const Stack = createSharedElementStackNavigator();

function FavoritesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Favorites" component={Favorites} />
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

export default FavoritesStack;
