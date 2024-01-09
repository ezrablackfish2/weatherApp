import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';
import backgroundImage from "../assets/images/weather.jpg";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DetailForecastScreen = props => {
	// this function shows detailed weather of that day up to 5 days from mock API
    
    return <View style={styles.container}>
		<ImageBackground source={backgroundImage} style={{ width: screenWidth, aspectRatio: 16 / 9 }}>
		<Text>Detail Weather Forecasing screen</Text>
		<Button style={styles.settingsbutton} title="Settings" onPress={() => { props.navigation.navigate("Settings") }}/>{/* this directs the user to the weather setting screen */}
		</ImageBackground>
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
		flex: 1,
	},
});

export default DetailForecastScreen;
