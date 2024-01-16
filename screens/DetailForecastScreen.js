import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useSharedState } from '../SharedStateContext.js';


import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import backgroundImage from "../assets/images/weather.png";
import sunny from "../assets/images/sunny.png";
import blizzard from "../assets/images/blizzard.png";
import cloudy from "../assets/images/cloudy.png";
import cyclone from "../assets/images/cyclone.png";
import drizzle from "../assets/images/drizzle.png";
import foggy from "../assets/images/foggy.png";
import misty from "../assets/images/misty.png";
import snowy from "../assets/images/snowy.png";
import sunnyCloud from "../assets/images/sunnyCloud.png";
import thunderstorm from "../assets/images/thunderstorm.png";
import tornado from "../assets/images/tornado.png";
import windy from "../assets/images/windy.png";
import rainy from "../assets/images/rainy.png";
import colors from "../colors.js";
import loadingImage from '../assets/images/loading.gif';



const DetailForecastScreen = props => {
	// this function shows detailed weather of that day up to 5 days from mock API

	const [data, setData] = useState([]);  // a state where data is to be fetched from the weather api
	const [shower, setShower] = useState(false); // this state is used to show more or less version of detail in weather
	const { selectedCity, setSelectedCity } = useSharedState(); // this is a state to tell us where we city chosen will be kept
	const [todayDateString, setTodayDateString] = useState(''); // this is a state to tell the date of today
	const [filteredData, setFilteredData] = useState([]); //this is a state to filter the whole data with a date of today and a city chosen
	const [todayWeather, setTodayWeather] = useState("sunny"); // this state is need to tell today's weather condition
	const [loading, setLoading] = useState(true); // this state tells if a loading screen appears or disappears initially it is true
	const [Error, setError] = useState(false); // this state tells if an error occured from fetching from an api or not initially it is false
	
	// this function is used to change or toggle the appearing details in weather app to shorten or lengthen
	const toggleShower = () => {
		setShower(!shower);
	}

	// this are the all the conditions of weather with thier respective image and icons
	const weatherDict = {
		"sunny": sunny,
		"blizzard": blizzard,
		"cloudy": cloudy,
		"cyclone": cyclone,
		"drizzle": drizzle,
		"foggy": foggy,
		"misty": misty,
		"snowy": snowy,
		"sunnyCloud":sunnyCloud,
		"thunderstorm": thunderstorm,
		"tornado": tornado,
		"windy": windy,
		"rainy": rainy
	}

	// this starts the fetching process before all the other process
	useEffect(() => {
		fetchData();
	}, []);


	useEffect(() => {
		
    		const today = new Date(); // a date datatype variable is declared
    		const year = today.getFullYear(); //to get up to the full year we make this
    		const month = today.getMonth() + 1; // getting the month
    		const day = today.getDate(); // getting the day iin date
    		setTodayDateString(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`); // we make it in a year month date format
  }, []);

	// this is where our data is fetched	
	const fetchData = async() => {
		try {
			const response = await axios.get('https://659e4dd347ae28b0bd358673.mockapi.io/api/v1/weatherData'); //fetching using axios
			setData(response.data); // this sets our state the fetched response data
			setLoading(false); // now loading disappears
		}
		catch (error) {
			console.error("Error Fetching Weather data from api", error); // this logs an error in the console
			setLoading(false); // even now loading disappears
			setError(true); // we are setting an error to true of our state
		}
	};



// now we are telling the image background or icon of the weather to make it an image from our weather dictionary
const setBackgroundImage = () => {
        return weatherDict[todayWeather];
};	




useEffect(() => {
    if (data.length > 0 && todayDateString !== '') { // if the date of today is found
      const cityData = data.find(city => city.city === selectedCity); //filter the data with city selected
      if (cityData) {
        const filteredCityData = cityData.forecast.filter(item => item.date === todayDateString); //filtering our data using the date of today
        setFilteredData(filteredCityData); //now we make this filtered data into our filtered data
	setTodayWeather(filteredCityData[0].weather); // we are making the first array the data of weather
      }
    }
  }, [data, selectedCity, todayDateString]); // this are the dependencies the function depends on








    return (
	<SafeAreaView 
		edges={["right", "left", "bottom"]}
	    style={styles.container}>

		<ImageBackground 
		source={backgroundImage}
		style={styles.backgroundImage}
		resizeMode="stretch"
		>
	    	{Error && <View><Text style={styles.Error}>Error Fetching Data From Weather Data Api</Text></View>}
	    {!Error && (loading ? (
        	<View style={styles.loadingContainer}>
         	 <Image source={loadingImage} style={styles.loadingImage} />
        	</View>
      			) : (
		<>
	    	<View style={styles.generalHome}>
	    	<ImageBackground 
		source={setBackgroundImage()}
//	    	source={sunny}
		style={styles.backgroundImageGeneral}
		resizeMode="stretch"
		>
	    	{filteredData
			.map((item, index) => (
	    	<Text 
			key={index}
			style={styles.generalTemp}
		>
	    	{item.avg}° C
	    	</Text>

			))}
	    {data
		.filter((item) => item.city === props.selectedCity)
		.map((item, index) => ( 
		<Text 
			key={index}
			style={styles.generalPlace}>
		{item.city}, {item.country}
	    	</Text>
		))}
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
	    	>

	<Picker
	style={styles.picker}
	itemStyle={styles.pickerItem}
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}>

        {data.map((item, index) => (
          <Picker.Item key={item.city} label={`${item.country} - ${item.city}`} value={item.city} />
        ))}
	</Picker>	

	

	    	<Entypo name="location" size={30} color={colors.l} bottom={55} left={0}/>
	    	</TouchableOpacity>

	    	<View style={ shower ? styles.detailHomeShow : styles.detailHomeHide}>
	    	<Text style={styles.detailTitle}>Detail
	    	</Text>
	    	<Text style={styles.detailSubtitle}> Weather Now                                                                        
	    	</Text>
	    {!shower && (<TouchableOpacity 
	    		style={styles.shower}
	    		onPress={toggleShower}>
			<Entypo name="arrow-with-circle-down" size={24} color={colors.white} />
	    	</TouchableOpacity>)}

		{shower && (<TouchableOpacity 
	    		style={styles.shower}
	    		onPress={toggleShower}>
			<Entypo name="arrow-with-circle-up" size={24} color={colors.white} />
	    	</TouchableOpacity>)}
	

		<View>
		
		{filteredData
			.map((item, index) => (
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

				<Text style={styles.cell}>{item.max}° C| {item.min}° C</Text>

				<Text style={styles.cell}> {item.weather}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<FontAwesome name="thermometer-2" size={27} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   average </Text>
				<View style={styles.mergedCell}>
				<FontAwesome5 name="umbrella" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Chance</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.avg}° C</Text>

				<Text style={styles.cell}> {item.chance}%</Text>
			</View>
			{ shower && (
			<>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<Feather name="wind" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>   Wind Speed </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="car-brake-low-pressure" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Pressure</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.wind} km/hr</Text>

				<Text style={styles.cell}> {item.pressure} hPa</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<Entypo name="drop" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>Humidity </Text>
				<View style={styles.mergedCell}>
				<SimpleLineIcons name="eyeglass" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>UV index</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.humidity}%</Text>

				<Text style={styles.cell}> {item.UV}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<AntDesign name="cloud" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>Cloud Cover </Text>
				<View style={styles.mergedCell}>
				<MaterialCommunityIcons name="sun-thermometer" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Dew Point</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.cloudCover}%</Text>

				<Text style={styles.cell}> {item.dew}° C</Text>
			</View>

			<View style={styles.row}>
				<View style={styles.mergedCell}>
				<AntDesign name="eye" size={24} color={colors.white} />
        			</View>
          				<Text style={styles.cell}>Visibility </Text>
				<View style={styles.mergedCell}>
				<Feather name="sunrise" size={24} color={colors.white} />
        			</View>

          				<Text style={styles.cell}>Sun Rise</Text>
          			
			</View>
			<View style={styles.row}>
				<View style={styles.mergedCell}>
        			</View>

				<Text style={styles.cell}>{item.Visibility} km/hr</Text>

				<Text style={styles.cell}> {item.Sunrise}</Text>
			</View>
			</>
			)}


        	</View>
      	))}

		</View>



	    	</View>
		</>
		))}

		</ImageBackground>
    </SafeAreaView>
    );
};

// using dimension property we are getting the phone screen width
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
		color: colors.white,
	},
	locationButton: {
		position: "absolute",
		top: 65,
		right: 10,
		backgroundColor: colors.lightGreen,
		padding: 10,
		borderRadius: 50,
		width: 50,
		height: 50,
		fontFamily: "Itim",
	},
	detailHomeShow: {
		position: "absolute",
		left: 30,
		bottom: 20,
		height: "53%",
		width: "80%",
		backgroundColor: colors.lightGreen,
		padding: 25,
		borderRadius: 50,
		opacity: 0.75,
	},
	detailHomeHide: {
		position: "absolute",
		left: 30,
		bottom: 270,
		height: "25%",
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
	shower: {
		position: "absolute",
		right: 45,
		top: 30,
	},
	loadingImage:{
		left: 120,
		width: 250,
		top: 200,
	},
	Error: {
		fontFamily: "Itim",
		fontSize: 40,
		color: "red",
		zIndex: 999,
		margin: 20,
	},
	picker: {
		flex: 1,
		height: 50,
		width: "100%",
		color: "#333333",
	},
	pickerItem: {
    		color: '#333',
    		fontSize: 16,
		fontFamily: "Itim",
  	},
});

export default DetailForecastScreen;
