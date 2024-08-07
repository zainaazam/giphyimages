import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Details from '../../screens/Details';
import Search from '../../screens/Search';

const Stack = createSharedElementStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
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

export default SearchStack;
