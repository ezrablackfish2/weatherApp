import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SettingsScreen = props => {
	// this function allows users to change setting if temperature celsius to kelvin or Farheniet
	//
    
    return <View style={styles.container}>
        <Text>setting screen</Text>
	
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

export default SettingsScreen;
