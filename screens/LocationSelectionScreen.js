import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LocationSelectionScreen = props => {
	// this function allows users to select location so that they can see the weather
    
    return <View style={styles.container}>
        <Text>Locations for the user to select</Text>
	
	<Button title="ForeCast Wheather" onPress={() => { props.navigation.navigate("WeatherForecast") }}/>{/* this directs the user to the weather forecasting screen */}
	<Button title="Settings" onPress={() => { props.navigation.navigate("Settings") }}/>{/* this directs the user to the weather setting screen */}
	<Button title="About" onPress={() => { props.navigation.navigate("About") }}/>{/* this directs the user to about screen */}
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

export default LocationSelectionScreen;
