import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import backgroundImage from "../assets/images/forecast.webp";
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


import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
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



const WeatherForecastScreen = props => {
	// this function shows weather up to 5 days from mock API
   	const [data, setData] = useState([]);
	const [shower, setShower] = useState(false);
	const [selectedCity, setSelectedCity] = useState('Monterey Park');
	const [todayDateString, setTodayDateString] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [todayWeather, setTodayWeather] = useState("sunny");


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

useEffect(() => {
		fetchData();
	}, []);


	useEffect(() => {
    		const today = new Date();
    		const year = today.getFullYear();
    		const month = today.getMonth() + 1;
    		const day = today.getDate();
    		setTodayDateString(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
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
		
	const setBackgroundImage = () => {
        return weatherDict[todayWeather];
};

useEffect(() => {
  if (data.length > 0 && todayDateString !== '') {
    const cityData = data.find((city) => city.city === selectedCity);
    if (cityData) {
      const futureCityData = cityData.forecast.filter(
        (item) => item.date !== todayDateString
      ).slice(0, 5);

      setFilteredData(futureCityData);

      if (futureCityData.length > 0) {
        const futureWeatherTypes = futureCityData.map((item) => item.weather);
        console.log(`Weather forecast for the next 5 days in ${selectedCity}:`, futureWeatherTypes);
      }
    }
  }
}, [data, selectedCity, todayDateString]);




    return <View style={styles.container}>
		<ImageBackground 
		source={backgroundImage} 
		style={styles.backgroundImage}
		resizeMode="stretch"
		>	

		</ImageBackground>
		<View>
			<Button title="Settings" onPress={() => { props.navigation.navigate("Settings") }}/>{/* this directs the user to the weather setting screen */}
		</View>
    </View>
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	label : {
		fontFamily: "Bellota",
		fontSize: 20,
	},
	backgroundImage: {
    		width: "100%",
		height: "100%",
	},
});

export default WeatherForecastScreen;
