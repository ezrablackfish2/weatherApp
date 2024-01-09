import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';
import backgroundImage from "../assets/images/weather.png";



const DetailForecastScreen = props => {
	// this function shows detailed weather of that day up to 5 days from mock API
    
    return <View style={styles.container}>
		<ImageBackground 
		source={backgroundImage}
		style={styles.backgroundImage}
		resizeMode="stretch"
		>
		</ImageBackground>
		<View>
		<Button style={styles.settingsbutton} title="Settings" onPress={() => { props.navigation.navigate("Settings") }}/>{/* this directs the user to the weather setting screen */}
		</View>
    </View>
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
		color: "red",
		backgroundColor: "red",
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		
	},
});

export default DetailForecastScreen;
