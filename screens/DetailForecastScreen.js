import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import backgroundImage from "../assets/images/weather.png";
import generalImage from "../assets/images/sunny.png";
import colors from "../colors.js";
import { Entypo } from '@expo/vector-icons';




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
	    	<View style={styles.generalHome}>
	    	<ImageBackground 
		source={generalImage}
		style={styles.backgroundImageGeneral}
		resizeMode="stretch"
		>
	    	<Text style={styles.generalTemp}>
	    	10 °C
	    	</Text>
	    	<Text style={styles.generalPlace}>
	    	Addis Ababa, Ethiopia
	    	</Text>
	    	</ImageBackground>
	    	</View>
		<TouchableOpacity 
	    	style={styles.settingsbutton} 
	    	title="Settings" 
	    	onPress={() => { props.navigation.toggleDrawer() }}>{/* this directs the user to the weather setting screen */}
	    	<Feather name="menu" size={30} color={colors.l} />
	    	</TouchableOpacity>
		<TouchableOpacity 
	    	style={styles.locationButton} 
	    	title="Settings" 
	    	onPress={() => { console.log("location Pressed")}}
	    	>
	    	<Entypo name="location" size={30} color={colors.l} />
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
		right: 10,
		top: 5,
		backgroundColor: "#000000",
		backgroundColor: colors.lightBlue,
		backgroundColor: colors.lightGreen,
		borderRadius: 50,
		padding: 10,
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		opacity: 1,
		
	},
	backgroundImageGeneral: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
		opacity: 1,
	},
	generalHome: {
		position: "absolute",
		left: 20,
		top: 20,
		width: "70%",
		height: "40%",
		borderRadius: 20,
		opacity: 1,
		overflow: "hidden",
//		backgroundColor: colors.white,
	},
	generalContent: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
	},
	generalTemp: {
		position: "relative",
		width: "70%",
		height: "35%",
		fontSize: 90,
		fontFamily: "BlackOps",
    		color: colors.darkBlue, 
    		color: colors.lightGreen, 
	},
	generalPlace: {
		position: "relative",
		width: "70%",
		height: "35%",
		fontSize: 20,
		fontFamily: "BlackOps",
		color: colors.darkBlue,
    		color: colors.lightGreen, 
	},
	locationButton: {
		position: "absolute",
		top: 65,
		right: 10,
		backgroundColor: colors.lightGreen,
		padding: 10,
		borderRadius: 50,
	},
});

export default DetailForecastScreen;
