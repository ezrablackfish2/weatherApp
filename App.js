import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import WeatherForecastScreen from "./screens/WeatherForecastScreen";
import LocationSelectionScreen from "./screens/LocationSelectionScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ErrorScreen from "./screens/ErrorScreen";
import DetailForecastScreen from "./screens/DetailForecastScreen";
import AboutScreen from "./screens/AboutScreen";

SplashScreen.preventAutoHideAsync(); //this overides slash screen to show up

const Stack = createStackNavigator();  // this declares a navigation system using stack
const Tab = createBottomTabNavigator(); // this declares a tab navigator


const TabNavigator = () => {
	return (
	<Tab.Navigator 
		screenOptions={{
			headerTitle: '',
			headerShadowVisible: false,
		}}>
      		<Tab.Screen name="DetailForecast" component={DetailForecastScreen} options={{
			tabBarLabel: "Today Weather",
			tabBarIcon: ( { color, size }) => (
				<Ionicons name="today" size={ size } color={ color } />	
			)
		}} />
      		<Tab.Screen name="WeatherForecast" component={WeatherForecastScreen} options={{
			tabBarLabel: "Weather Forecast",
			tabBarIcon: ( { color, size }) => (
				<Entypo name="area-graph" size={ size } color={ color } />
			)
		}}  />
      		<Tab.Screen name="About" component={AboutScreen} options={{
			tabBarLabel: "About Us",
			tabBarIcon: ({ color, size }) => (
				<Entypo name="help" size={ size } color={ color } />
			)
		}}  />
    	</Tab.Navigator>
	)
}


export default function App() {
	// this is where the weather app works this is the root function
  const [appIsLoaded, setAppIsLoaded] = useState(false);  //tell if the app is loaded shows the app icon 

  useEffect(() => {
    async function loadFonts() {
		// this fetches font from directory and lddoads it to react native
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
	  
        });
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    }
    loadFonts();
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={TabNavigator} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: false,
		    }}/>
            <Stack.Screen name="WeatherForecast" component={WeatherForecastScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: false,
		    }}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: false,
		    }}/>
            <Stack.Screen name="Loading" component={LoadingScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: false,
		    }}/>
            <Stack.Screen name="Error" component={ErrorScreen} />
            <Stack.Screen name="DetailForecast" component={DetailForecastScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: false,
		    }}/>
            <Stack.Screen name="About" component={AboutScreen} options={{
		    	headerTitle: "",
		    	gestureEnabled: true,
			animationEnabled: true,
			presentation: "modal",
			headerBackTitle: "Go Back",
			headerShadowVisible: false,
		    }}/>
          </Stack.Navigator>
        </NavigationContainer>
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






