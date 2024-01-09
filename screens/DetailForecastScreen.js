import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import backgroundImage from "../assets/images/weather.png";
import generalImage from "../assets/images/sunny.jpg";




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
	    	10 C
	    	</Text>
	    	</ImageBackground>
	    	</View>
		<TouchableOpacity 
	    	style={styles.settingsbutton} 
	    	title="Settings" 
	    	onPress={() => { props.navigation.toggleDrawer() }}>{/* this directs the user to the weather setting screen */}
	    	<Feather name="menu" size={30} color="#ffffff" />
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
		backgroundColor: "#000000",
		borderRadius: 50,
		padding: 10,
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		
	},
	backgroundImageGeneral: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
		opacity: 0.6,
	},
	generalHome: {
		position: "absolute",
		left: 20,
		top: 20,
		width: "80%",
		height: "35%",
		borderRadius: 20,
		opacity: 1,
		backgroundColor: "#000000",
		overflow: "hidden",
	},
	generalContent: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
	},
	generalTemp: {
		color: "#000000",
		position: "relative",
		width: "30%",
		height: "35%",
		fontSize: 90,
		fontFamily: "BlackOps",
    		fontWeight: 'bold',
    		color: 'white', 
    		textAlign: 'center',
	}
});

export default DetailForecastScreen;
