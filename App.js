import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'


import WeatherShowScreen from "./screens/WeatherShowScreen";


SplashScreen.preventAutoHideAsync(); // this makes the splash screen overriding it to show

const Stack = createStackNavigator(); // this decalres a stack navigator


export default function App() {
	// this is where the weather app start this is the root app function
	const [weather, setWeather] = useState("rainy"); // weather state hook
	const [appIsLoaded, setAppIsLoaded] = useState(false); //tell if the app is loaded shows the app icon

	useEffect(() => {
		const prepare = async() => {
			// this fetches font from directory and loads it to react native
			try {
			await Font.loadAsync({	
				// this function loads the fonts
				"Bellota": require("./assets/fonts/Bellota-Regular.ttf"),
				"Aguafina": require("./assets/fonts/AguafinaScript-Regular.ttf"),
				"Barrio": require("./assets/fonts/Barrio-Regular.ttf"),
				"Amatic": require("./assets/fonts/AmaticSC-Regular.ttf"),
				"BlackOps": require("./assets/fonts/BlackOpsOne-Regular.ttf"),
				"Caveat": require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
				"Chakra": require("./assets/fonts/ChakraPetch-Regular.ttf"),
				"Croissant": require("./assets/fonts/CroissantOne-Regular.ttf"),
				"Dancing": require("./assets/fonts/DancingScript-VariableFont_wght.ttf"),
				"Hammer": require("./assets/fonts/HammersmithOne-Regular.ttf"),
				"Itim": require("./assets/fonts/Itim-Regular.ttf"),
				"Lilita": require("./assets/fonts/LilitaOne-Regular.ttf"),
				"Montserrat": require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
				"Orbitron": require("./assets/fonts/Orbitron-VariableFont_wght.ttf"),
				"Rajdhani": require("./assets/fonts/Rajdhani-Regular.ttf"),
				"SedgwickAve": require("./assets/fonts/SedgwickAve-Regular.ttf"),
				"Shadows": require("./assets/fonts/ShadowsIntoLight-Regular.ttf"),
			})
			}
			catch (error) {
				console.log(error);
			}
			finally {
				setAppIsLoaded(true);
			}		
		};
		prepare();
	}, [])


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

		<NavigationContainer>
	      <Stack.Navigator>
      		<Stack.Screen name="Home" component={ WeatherShowScreen } />
	  	</Stack.Navigator>

		</NavigationContainer>


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
	  fontFamily: "Rajdhani",
  },
	weather : {
	}
});
