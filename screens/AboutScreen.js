import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';

import backgroundImage from "../assets/images/about.jpg";


const AboutScreen = props => {
	// this function tells us about the weather app
    
    return <View style={styles.container}>
		<ImageBackground 
		source={backgroundImage}
		style={styles.backgroundImage}
		resizeMode="stretch"
		>
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
		width: "100%",
		height: "100%",
	}
});

export default AboutScreen;
