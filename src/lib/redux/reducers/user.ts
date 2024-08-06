import {ActionTypes} from '../../constants';

const initialState = {
  isLoggedIn: false,
  email: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.value,
      };
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.value,
      };
    default:
      return state;
  }
};
