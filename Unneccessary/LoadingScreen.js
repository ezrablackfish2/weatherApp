import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LoadingScreen = props => {
	// this function loads until another thing comes up
    
    return <View style={styles.container}>
        <Text>loading screen</Text>
	
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

export default LoadingScreen;
