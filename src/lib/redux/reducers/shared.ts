import {ActionTypes} from '../../constants';

const initialState = {
  data: [],
  favorites: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: action.value,
      };
    case ActionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: action.value,
      };
    default:
      return state;
  }
};
