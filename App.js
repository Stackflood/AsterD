import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import AppRoute from './src/routes/AppRoute';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';

// Apply roboto font all over the app
const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal'
    }
  },
  android: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal'
    }
  }
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig)
};

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <AppRoute />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
