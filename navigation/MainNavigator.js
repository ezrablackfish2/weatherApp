import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import WeatherForecastScreen from "../screens/WeatherForecastScreen";
import LocationSelectionScreen from "../screens/LocationSelectionScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import DetailForecastScreen from "../screens/DetailForecastScreen";
import AboutScreen from "../screens/AboutScreen";


const Stack = createStackNavigator();  // this declares a navigation system using stack
const Tab = createBottomTabNavigator(); // this declares a tab navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {

	const [drawerOpen, setDrawerOpen] = useState("closed");
	return (
	<Drawer.Navigator
		screenOptions={{
			headerTitle: '',
			headerShadowVisible: false,
			headerShown: false,
			drawerStyle: styles.drawWhole,
			drawerLabelStyle: styles.draw,
		}}
		defaultStatus={drawerOpen}
		>
      		<Drawer.Screen name="Home" 
			component={(props) => (
          		<DetailForecastScreen {...props} selectedCity={props.selectedCity} setSelectedCity={props.setSelectedCity} />
        		)} />
      		<Drawer.Screen name="Settings" component={SettingsScreen} />
      		<Drawer.Screen name="About" component={AboutScreen} />
    	</Drawer.Navigator>
	);
}

const TabNavigator = () => {
	const [selectedCity, setSelectedCity] = useState('Monterey Park');
	return (
	<SafeAreaView 
		edges={["right", "left", "bottom"]}
	    style={styles.container}>


	<Tab.Navigator 
		screenOptions={{
			headerTitle: '',
			headerShadowVisible: false,
			headerShown: false,
			tabBarLabelStyle: styles.tab,
			tabBarStyle: styles.tabWhole,
		}}>
      		<Tab.Screen name="DetailForecast" 
			component={(props) => (
          		<DetailForecastScreen {...props} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        		)}
			options={{
			tabBarLabel: "",
			tabBarIcon: ( { color, size }) => (
				<Ionicons name="today" size={ 40 } color={ color } height={40} width={40} bottom={-15}/>	
			)
		}} />
      		<Tab.Screen name="WeatherForecast" 
			component={(props) => (
          		<WeatherForecastScreen {...props} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        		)} options={{
			tabBarLabel: "",
			tabBarIcon: ( { color, size }) => (
				<Entypo name="area-graph" size={ 40 } color={ color } height={40} bottom={-15} />
			)
		}}  />
      		<Tab.Screen name="About" component={AboutScreen} options={{
			tabBarLabel: "",
			tabBarIcon: ({ color, size }) => (
				<Entypo name="help" size={ 40 } color={ color } height={40} bottom={-15}/>
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
	
  },
  tab: {
	  height: 30,
	  paddingVertical: 0,
	  fontSize: 20,
	  fontFamily: "Bellota",
	  bottom: 10,
	},
  tabWhole: {
	  backgroundColor: "#000000",
  },
  draw: {
	color: "#ffffff",
	fontSize: 20,
	fontFamily: "Bellota",
  },
  drawWhole: {
	  backgroundColor: "#000000",
  }
})

export default MainNavigator;
