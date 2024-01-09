import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';

import backgroundImage from "../assets/images/about.jpg";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AboutScreen = props => {
	// this function tells us about the weather app
    
    return <View style={styles.container}>
		<ImageBackground source={backgroundImage} style={{ width: screenWidth, aspectRatio: 16 / 9 }}>
        <Text>about screen</Text>
	</ImageBackground>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
	backgroundImage: {
		position: "absolute",
		width: "screenWidth",
	}
});

export default AboutScreen;
