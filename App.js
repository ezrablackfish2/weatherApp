import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from "./navigation/AppNavigator.js";
import { loadFonts } from './fonts.js';



SplashScreen.preventAutoHideAsync(); //this overides slash screen to show up



export default function App() {
	// this is where the weather app works this is the root function
  const [appIsLoaded, setAppIsLoaded] = useState(false);  //tell if the app is loaded shows the app icon 

    useEffect(() => {
	  loadFonts(setAppIsLoaded);
  }, []);
  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();  // hides the app icon
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;  //if the app icon is shown load nothing
  }

  return (
    <SafeAreaProvider onLayout={onLayout}>
		<AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Bellota",
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
});






