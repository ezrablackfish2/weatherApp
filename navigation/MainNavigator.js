import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import WeatherForecastScreen from "../screens/WeatherForecastScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailForecastScreen from "../screens/DetailForecastScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();  // this declares a navigation system using stack
const Tab = createBottomTabNavigator(); // this declares a tab navigator
const Drawer = createDrawerNavigator(); // this declares a drawer type navigation where you can grap the drawer from the left edge of the screen

const DrawerNavigator = () => {

	const [drawerOpen, setDrawerOpen] = useState("closed"); // state used to alternate between opening and closing the drawer
	// drawer navigator is worked here and it alternates between the choices of detail forecast, setting screen and about screen
	// i hid header title so that it can not be shown to anyone
	// also shadw of header is invisible so that UI can be betterly viewed
	// using drawerOpen state control opening or closing drawer navigation
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
      		<Drawer.Screen name="Home" component={DetailForecastScreen} />
      		<Drawer.Screen name="Settings" component={SettingsScreen} />
    	</Drawer.Navigator>
	);
}


// this is the tab navigator where shown on the bottom it has choices between deatil forecast screen weather forecast screen and about screen
// the tabbar icon is the icons shown to the user of the bottom tabs used from expo icons
// made tab to only be shown from right left and bottom so that the border could not be dragged to bottom
//
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
			tabBarLabelStyle: styles.tab,
			tabBarStyle: styles.tabWhole,
		}}>
      		<Tab.Screen name="DetailForecast" component={DrawerNavigator} options={{
			tabBarLabel: "",
			tabBarIcon: ( { color, size }) => (
				<Ionicons name="today" size={ 40 } color={ color } height={40} width={40} bottom={-15}/>	
			)
		}}
		/>
      		<Tab.Screen name="WeatherForecast" 
			component={WeatherForecastScreen} options={{
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


// this is the navigation previously used to navigate using just  a button method the home is detail forecast screen , settings screen and loading screen
// header is invisible
// made animation for all stack screen navigations
// made gesture to true since on IOS it is always true and android default is false
// made header back title after navigation to show go back
// header title and shadow are invisible
// made presentation of stack to be modal
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
