import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AboutScreen = props => {
	// this function tells us about the weather app
    
    return <View style={styles.container}>
        <Text>about screen</Text>
	
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Bellota",
    justifyContent: "center",
    alignItems: "center"
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
});

export default AboutScreen;
