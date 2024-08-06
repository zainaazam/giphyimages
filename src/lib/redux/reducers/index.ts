import {combineReducers} from 'redux';
import Shared from './shared';
import User from './user';

export const rootReducer = combineReducers({
  Shared,
  User,
});
