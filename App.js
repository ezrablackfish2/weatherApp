import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { loadFonts } from './fonts.js';

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






