import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity, FlatList, Easing } from 'react-native';
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
import { BarChart } from 'react-native-chart-kit';
import * as d3 from "d3";
import { Canvas, Path, runTiming, Skia, useComputedValue, useFont, useValue, } from "@shopify/react-native-skia";

import { Text as ShopifyText } from '@shopify/react-native-skia'; 

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


const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 20;
const CanvasHeight = 400;
const CanvasWidth = 500;

const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const graphWidth = CanvasWidth - 2;


const WeatherForecastScreen = props => {
	// this function shows weather up to 5 days from mock API
   	const [data, setData] = useState([]);
	const [shower, setShower] = useState(false);
	const [selectedCity, setSelectedCity] = useState('Monterey Park');
	const [todayDateString, setTodayDateString] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [todayWeather, setTodayWeather] = useState("sunny");
	const animationState = useValue(0);
//	const [randomData, setRandomData] = useState([]);

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
          const ChartData = futureCityData.map((item) => ({
            label: item.date, // assuming item.date is the label
            value: item.avg,
          }));

          // Set up data for the bar chart
          setBarChartData(ChartData);
	      }
	    }
	  }
	}, [data, selectedCity, todayDateString]);
	
	
	const [barChartData, setBarChartData] = useState([]);
	console.log(JSON.stringify(barChartData));

	const randomData = [
		{label: 'Mon', value: 50},
		{label: 'Teu', value: 100},
		{label: 'Wed', value: 150},
		{label: 'Thu', value: 200},
		{label: 'Fri', value: 250},
	]
	
//	useEffect(() => {
//
//	const transformedData = barChartData.labels.map((label, index) => ({
//      label,
//      value: barChartData.datasets[0].data[index],
//    }));
//	setRandomData(transformedData);
//
//	}, [barChartData]);
//	
//
//	console.log(JSON.stringify(randomData));

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < barChartData.length; i++) {
    const dateObject = new Date(barChartData[i].label);
    const dayOfWeek = daysOfWeek[dateObject.getDay()];
    barChartData[i].label = dayOfWeek;
  }


	const xDomain = barChartData.map((xDataPoint) => xDataPoint.label)
	const xRange = [0, graphWidth]
	const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

	const font = useFont(require("../assets/fonts/Rajdhani-Regular.ttf"), 30);

	const yDomain = [
		0,
		d3.max(barChartData, (yDataPoint) => yDataPoint.value)
	]
	const yRange = [0, graphHeight]
	const y = d3.scaleLinear().domain(yDomain).range(yRange);

	const graphPath = useComputedValue(() => {
    const newPath = Skia.Path.Make();

    barChartData.forEach((dataPoint) => {
        const rect = Skia.XYWHRect(
            x(dataPoint.label) - GRAPH_BAR_WIDTH / 2,
            graphHeight,
            GRAPH_BAR_WIDTH,
            y(dataPoint.value * animationState.current) * -1
        );

        const roundedRect = Skia.RRectXY(rect, 8, 8);
        newPath.addRRect(roundedRect);
    });
    return newPath;
}, [animationState, barChartData]);

	const animate = () => {
		animationState.current = 0

		runTiming(animationState,1, {
			duration: 1600,
			easing: Easing.inOut(Easing.exp),
		});
	}


    return <View style={styles.container}>
		<ImageBackground 
		source={backgroundImage} 
		style={styles.backgroundImage}
		resizeMode="stretch"
		>	
		<View style={styles.generalHome}>
		<Canvas style={styles.canvas}>
			<Path path={graphPath} color="purple"/>
			{
				barChartData.map((dataPoint) => (
				<ShopifyText
					key={dataPoint.label}
					font={font}
					x={x(dataPoint.label) - 20}
					y={CanvasHeight - 5}
					text={dataPoint.label}
				/>
				))
			}
		</Canvas>
		<Button title="Update Forecast" onPress={animate}/>	

		</View>
		

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
	generalHome: {
		position: "absolute",
		left: 20,
		top: 300,
		width:  "100%",
		height: "100%",
		borderRadius: 20,
		opacity: 1,
		overflow: "hidden",
//		backgroundColor: colors.white,
	},
	canvas: {
		height: CanvasHeight,
		width: CanvasWidth,
	}
});

export default WeatherForecastScreen;
