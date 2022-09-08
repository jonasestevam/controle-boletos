import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {MenuProvider} from 'react-native-popup-menu';
import Routes from './src/routes';
import './src/services/BoletosService';
import theme from './src/theme';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={theme.COLORS.darker_black} />
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <MenuProvider>
            <Routes />
            <Toast />
          </MenuProvider>
        </ThemeProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
