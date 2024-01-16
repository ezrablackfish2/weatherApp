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

	// safe area provider is used to make our screen more watchable it make a margin so that you can see the interface of the text or icon with full visual
	// onlayout is used to call a fucntion so that the layout we want to show is the specified layout
	// appnavigator si the component where we want our whole route navigation to go through
	// safe area view is where the safe zone for ui is shown
  return (
    <SafeAreaProvider
	  onLayout={onLayout}> 
	<SafeAreaView style={styles.container} onLayout={onLayout}>
	  <SharedStateProvider> 
		<AppNavigator />
	  </SharedStateProvider>
	 </SafeAreaView> 
    </SafeAreaProvider>
  );
}

// font family shows the font from our already preloaded fonts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    fontFamily: "Bellota",
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
});






