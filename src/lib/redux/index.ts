import {thunk} from 'redux-thunk';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import {createLogger} from 'redux-logger';
import {rootReducer} from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Shared', 'User'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function (): any {
  let middleware: any = [thunk];
  // const logger = createLogger();
  // if (__DEV__) middleware.push(logger);
  const middlewares = applyMiddleware(...middleware);
  let store = createStore(persistedReducer, middlewares);
  let persistor = persistStore(store);
  return {store, persistor};
}
