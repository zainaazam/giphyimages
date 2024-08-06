import {Dispatch} from 'redux';
import {ActionTypes} from '../../constants';

export const userRedux = {
  setIsLoggedIn: (isLoggedIn: boolean) => (dispatch: Dispatch) => {
    dispatch({type: ActionTypes.SET_IS_LOGGED_IN, value: isLoggedIn});
  },
  setEmail: (email: string) => (dispatch: Dispatch) => {
    dispatch({type: ActionTypes.SET_EMAIL, value: email});
  },
};
