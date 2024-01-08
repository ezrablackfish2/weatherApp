import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DetailForecastScreen = props => {
	// this function shows detailed weather of that day up to 5 days from mock API
    
    return <View style={styles.container}>
		<Text>Detail Weather Forecasing screen</Text>
		<Button title="Settings" onPress={() => { props.navigation.navigate("Settings") }}/>{/* this directs the user to the weather setting screen */}
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

export default DetailForecastScreen;
