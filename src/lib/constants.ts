import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Data} from './redux/actions/shared';

export enum ActionTypes {
  SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
  SET_EMAIL = 'SET_EMAIL',
  SET_DATA = 'SET_DATA',
  SET_FAVORITES = 'SET_FAVORITES',
}

export const GLOBAL_THEME = {
  container: widthPercentageToDP(4),
  radius: {
    small: 11,
    medium: 20,
    full: 100,
  },
};

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
  Details: {item: Data};
};
