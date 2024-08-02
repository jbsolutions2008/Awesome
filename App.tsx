import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './app/config/RootNavigation';

import StackNavigator from './app/navigations/StackNavigator';
import CustomLoader from './app/module/CustomLoader/CustomLoader';
import Module from './app/module';
import AppColors from './app/config/colors';
import utils from './app/utils';
import Toast from 'react-native-toast-message';
import toastConfig from './app/config/toastConfig';
import DarkTheme from './app/theme/DarkTheme';
import LightTheme from './app/theme/LightTheme';
import { AppContext } from './app/theme/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from './app/config/constants';

const App = () => {

  const navigationRef2 = useRef();
  const routeNameRef = useRef();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load the theme from AsyncStorage on app mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(Constants.AsyncStorageKeys.stackTheme);
        if (savedTheme !== null) {
          setIsDarkTheme(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadTheme();
  }, []);

  // Save the theme preference to AsyncStorage when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(Constants.AsyncStorageKeys.stackTheme, JSON.stringify(isDarkTheme));
      } catch (error) {
        console.error('Failed to save theme', error);
      }
    };

    saveTheme();
  }, [isDarkTheme]);

  const appContext = useMemo(() => ({
    isDarkTheme,
    setIsDarkTheme: (theme: any) => {
      setIsDarkTheme(theme);
      // Save the theme whenever it's set
      AsyncStorage.setItem(Constants.AsyncStorageKeys.stackTheme, JSON.stringify(theme));
    },
  }), [isDarkTheme]);

  return (
    <View style={styles.container}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}
        ref={(ref) => {
          navigationRef.current = ref
          navigationRef2.current = ref
        }}
        onReady={() => {
          routeNameRef.current = navigationRef2.current.getCurrentRoute().name;
          utils.UserSession.CURRENT_VIEWING_PAGE = navigationRef2.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          utils.UserSession.PREVIOUS_VIEWED_PAGE = utils.UserSession.CURRENT_VIEWING_PAGE;
          utils.UserSession.CURRENT_VIEWING_PAGE = navigationRef2.current.getCurrentRoute().name;
          const currentRouteName = navigationRef2.current.getCurrentRoute().name;
          routeNameRef.current = currentRouteName;
        }}>
        <AppContext.Provider value={appContext}>
          <StatusBar barStyle="dark-content" translucent backgroundColor={AppColors.COLOR_TRASPARENT} />
          <StackNavigator />
        </AppContext.Provider>
      </NavigationContainer>
      <CustomLoader ref={(refs) => Module.CustomLoader.setLoaderRef(refs)} />
      <Toast config={toastConfig} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
