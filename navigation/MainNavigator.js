import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import WeatherForecastScreen from "../screens/WeatherForecastScreen";
import LocationSelectionScreen from "../screens/LocationSelectionScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import DetailForecastScreen from "../screens/DetailForecastScreen";
import AboutScreen from "../screens/AboutScreen";


const Stack = createStackNavigator();  // this declares a navigation system using stack
const Tab = createBottomTabNavigator(); // this declares a tab navigator


const TabNavigator = () => {
	return (
	<SafeAreaView 
		edges={["right", "left", "bottom"]}
	    style={styles.container}>

	<Tab.Navigator 
		screenOptions={{
			headerTitle: '',
			headerShadowVisible: false,
			headerShown: false,
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
	</SafeAreaView>	
	)
}



const MainNavigator = (props) => {
	return(
	<Stack.Navigator 
		screenOptions={{ headerShown: false }}
		>
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
	);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
	flexDirection: 'column',
  }
})

export default MainNavigator;
