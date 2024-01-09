import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';
import backgroundImage from "../assets/images/forecast.webp";


const WeatherForecastScreen = props => {
	// this function shows weather up to 5 days from mock API
    
    return <View style={styles.container}>
		<ImageBackground 
		source={backgroundImage} 
		style={styles.backgroundImage}
		resizeMode="stretch"
		>	

		</ImageBackground>
		<View>
			<Button title="Settings" onPress={() => { props.navigation.navigate("Settings") }}/>{/* this directs the user to the weather setting screen */}
		</View>
    </View>
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
	backgroundImage: {
    		width: "100%",
		height: "100%",
	},
});

export default WeatherForecastScreen;
