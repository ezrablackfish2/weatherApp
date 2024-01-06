import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";


export default function App() {
	// this is where the weather app start this is the root app function
	const [weather, setWeather] = useState("rainy"); // weather state hook
	const [appIsLoaded, setAppIsLoaded] = useState(false); //tell if the app is loaded shows the app icon

	useEffect(() => {
		//this delays and show weather app icon until 2 seconds
		setTimeout(() => {
			setAppIsLoaded(true)
		}, 2000);
	})

	const onLayout = useCallback(async () => {
		if (appIsLoaded) {
			await SplashScreen.hideAsync(); // hides the app icon
		}
	}, [appIsLoaded]);

	if (!appIsLoaded) {
		return null; //if the app icon is shown load nothing
	}


	const changeWeather = () => {
		setWeather("sunny"); // this changes the weather from rainy to sunny
	}



  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
	  <SafeAreaView>


      <Text style = {styles.label}>Weather</Text>


      <StatusBar style="auto" />
	  </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffffff',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label : {
  },
	weather : {
	}
});
