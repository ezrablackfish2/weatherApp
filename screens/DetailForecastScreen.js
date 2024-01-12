import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




import weatherData from "../weatherData.json";
import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import backgroundImage from "../assets/images/weather.png";
import generalImage from "../assets/images/sunny.png";
import colors from "../colors.js";




const DetailForecastScreen = props => {
	// this function shows detailed weather of that day up to 5 days from mock API

	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);
	
	const fetchData = async() => {
		try {
			const response = await axios.get('https://659e4dd347ae28b0bd358673.mockapi.io/api/v1/weatherData');
			setData(response.data);
		}
		catch (error) {
			console.error("Error Fetching Weather data", error);
		}
	};




    return (
	<SafeAreaView 
		edges={["right", "left", "bottom"]}
	    style={styles.container}>

		<ImageBackground 
		source={backgroundImage}
		style={styles.backgroundImage}
		resizeMode="stretch"
		>
	    	<View style={styles.generalHome}>
	    	<ImageBackground 
		source={generalImage}
		style={styles.backgroundImageGeneral}
		resizeMode="stretch"
		>
	    	<Text style={styles.generalTemp}>
	    	10 °C
	    	</Text>
	    	<Text style={styles.generalPlace}>
	    	Addis Ababa, Ethiopia
	    	</Text>
	    	</ImageBackground>
	    	</View>
		<TouchableOpacity 
	    	style={styles.settingsbutton} 
	    	title="Settings" 
	    	onPress={() => { props.navigation.toggleDrawer() }}>{/* this directs the user to the weather setting screen */}
	    	<Feather name="menu" size={30} color={colors.l} />
	    	</TouchableOpacity>
		<TouchableOpacity 
	    	style={styles.locationButton} 
	    	title="Settings" 
	    	onPress={() => { console.log("location Pressed")}}
	    	>
	    	<Entypo name="location" size={30} color={colors.l} />
	    	</TouchableOpacity>

	    	<View style={styles.detailHome}>
	    	<Text style={styles.detailTitle}>Detail
	    	</Text>
	    	<Text style={styles.detailSubtitle}> Weather Now
	    	</Text>

		<View>
		
		{data.map((item, index) => (
		<View key={index} style={styles.table}>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="temperature-high" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Max | Min </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Weather Type</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.max} | {item.min} C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="temperature-high" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Max | Min </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Weather Type</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.max} | {item.min} C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="temperature-high" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Max | Min </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Weather Type</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.max} | {item.min} C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="temperature-high" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Max | Min </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Weather Type</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.max} | {item.min} C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="temperature-high" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Max | Min </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Weather Type</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.max} | {item.min} C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>

			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="temperature-high" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Max | Min </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Weather Type</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.max} | {item.min} C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>



        	</View>
      	))}

		</View>



	    	</View>

		</ImageBackground>
    </SafeAreaView>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
	settingsbutton : {
		position: "absolute",
		right: 10,
		top: 5,
		backgroundColor: "#000000",
		backgroundColor: colors.lightBlue,
		backgroundColor: colors.lightGreen,
		borderRadius: 50,
		padding: 10,
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		opacity: 1,
		
	},
	backgroundImageGeneral: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
		opacity: 1,
	},
	generalHome: {
		position: "absolute",
		left: 20,
		top: 20,
		width: "70%",
		height: "40%",
		borderRadius: 20,
		opacity: 1,
		overflow: "hidden",
//		backgroundColor: colors.white,
	},
	generalContent: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
	},
	generalTemp: {
		position: "relative",
		width: "70%",
		height: "35%",
		fontSize: 90,
		fontFamily: "BlackOps",
    		color: colors.lightGreen, 
    		color: colors.darkBlue, 
	},
	generalPlace: {
		position: "relative",
		width: "70%",
		height: "35%",
		fontSize: 20,
		fontFamily: "BlackOps",
    		color: colors.lightGreen, 
		color: colors.darkBlue,
	},
	locationButton: {
		position: "absolute",
		top: 65,
		right: 10,
		backgroundColor: colors.lightGreen,
		padding: 10,
		borderRadius: 50,
	},
	detailHome: {
		position: "absolute",
		left: 30,
		bottom: 40,
		height: "53%",
		width: "80%",
		backgroundColor: colors.lightGreen,
		padding: 25,
		borderRadius: 50,
		opacity: 0.75,
	},
	detailTitle: {
		position: "relative",
		width: "50%",
		fontFamily: "Lilita",
		fontSize: 35,
		color: colors.white,
	},

	table: {
    		flexDirection: 'column',
    		borderWidth: 0, 
 		borderColor: 'transparent',
		margin: -5,
  	},
  	row: {
    		flexDirection: 'row',
  	},
  	cell: {
    		flex: 1,
    		padding: 10,
		paddingVertical: 7,
    		textAlign: 'center',
		fontFamily: "Lilita",
		color: colors.white,
  	},
	mergedCell: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: "center",
		top: 25,
		borderRightWidth: 0,
		width: "10%",
	},
	detailSubtitle: {
		fontFamily: "Lilita",
		color: colors.white,
	},
});

export default DetailForecastScreen;
