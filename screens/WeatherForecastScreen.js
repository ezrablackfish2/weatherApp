import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WeatherForecastScreen = props => {
	// this function shows weather up to 5 days from mock API
    
    return <View style={styles.container}>
        <Text>Weather Forecasing screen</Text>

	<Button title="detail forecast" onPress={() => { props.navigation.navigate("DetailForecast")}}/>
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

export default WeatherForecastScreen;