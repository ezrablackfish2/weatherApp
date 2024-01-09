import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import backgroundImage from "../assets/images/weather.png";




const DetailForecastScreen = props => {
	// this function shows detailed weather of that day up to 5 days from mock API
    
    return (
	<SafeAreaView 
		edges={["right", "left", "bottom"]}
	    style={styles.container}>

		<ImageBackground 
		source={backgroundImage}
		style={styles.backgroundImage}
		resizeMode="stretch"
		>
		<TouchableOpacity 
	    	style={styles.settingsbutton} 
	    	title="Settings" 
	    	onPress={() => { props.navigation.toggleDrawer() }}>{/* this directs the user to the weather setting screen */}
	    	<Feather name="menu" size={30} color="#ffbbff" />
	    	</TouchableOpacity>
		</ImageBackground>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
	settingsbutton : {
		position: "absolute",
		right: 5,
		top: 5,
		backgroundColor: "#175EfB",
		borderRadius: 50,
		padding: 10,
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		
	},
});

export default DetailForecastScreen;
