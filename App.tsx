import {ThemeProvider} from './src/Theme/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './src/lib/redux';
import Navigation from './src/navigation';

let {store, persistor} = createStore();

const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
