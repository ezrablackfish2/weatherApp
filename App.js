import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from "./navigation/AppNavigator.js";
import { loadFonts } from './fonts.js';
import 'react-native-gesture-handler';
import { SharedStateProvider } from './SharedStateContext.js';


SplashScreen.preventAutoHideAsync(); //this overides slash screen to show up



export default function App() {
	// this is where the weather app works this is the root app function
  const [appIsLoaded, setAppIsLoaded] = useState(false);  //state used to tell if the app has finished loading all requirements

    useEffect(() => {
	  loadFonts(setAppIsLoaded); //function used to load fonts from already established directory
  }, []);
  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();  // hides the splash screen if everything has been loaded
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;  //if nothing is established just show the splash screen
  }

  return (
    <SafeAreaProvider // use safe area provider cause it removes cutting of edge seen icons or materials
	  onLayout={onLayout}> // this is the layout where we want to show our user onlayout 
	<SafeAreaView style={styles.container} onLayout={onLayout}>
	  <SharedStateProvider> // this help us to make state to be passable from one component to another
		<AppNavigator /> // this is the navigator component where it divide our screen
	  </SharedStateProvider>
	 </SafeAreaView> 
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    fontFamily: "Bellota",
  },
	label : {
		fontFamily: "Bellota", // fetched font from directory
		fontSize: 20,
	},
});






