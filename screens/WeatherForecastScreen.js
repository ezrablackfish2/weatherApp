import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity, FlatList, Easing, Image } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import { Text as ShopifyText } from '@shopify/react-native-skia'; 
import { useSharedState } from '../SharedStateContext.js';
import loadingImage from '../assets/images/loading.gif';


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
const CanvasWidth = 600;

const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const graphWidth = CanvasWidth - 2;


const WeatherForecastScreen = props => {
	// this function shows weather up to 5 days from mock API
   	const [data, setData] = useState([]); //this is a data state where a fetched data from is stored
	const { selectedCity, setSelectedCity } = useSharedState(); //this again is a shared state of a city chosen by the user is stored
	const [todayDateString, setTodayDateString] = useState(''); // we want to know the date of today
	const [filteredData, setFilteredData] = useState([]); // this tells about a filtered data using city and date 
	const [todayWeather, setTodayWeather] = useState("sunny"); // this is the date of today so that we can see what is going on
	const animationState = useValue(1); // this is a value  to tell whether a bar chart is to be shown or not
	const [loading, setLoading] = useState(true); // this shows if loading screen appears or disappears initially true
	const [Error, setError] = useState(false); // this shows an error screen to appear if fetching failed and initially false


// this is dictionary to show correspondence between weather condition and icon or photo
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


// fetching again begins
useEffect(() => {
		fetchData();
	}, []);

// date of the present day is operated here
	useEffect(() => {
    		const today = new Date(); // date datatype variable is declared
    		const year = today.getFullYear(); // the year of present day
    		const month = today.getMonth() + 1; // the month of present day
    		const day = today.getDate(); // the day of present day
    		setTodayDateString(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`); //format of the year month and day
  }, []);

	
	const fetchData = async() => {
		try {
			const response = await axios.get('https://659e4dd347ae28b0bd358673.mockapi.io/api/v1/weatherData'); // we fetch data from our weather api to us
			setData(response.data); // our state data is set from the url fetched
			setLoading(false); // we are making loading false cause it finished loading
		}
		catch (error) {
			console.error("Error Fetching Weather data", error); //log the error in console
			setLoading(false);// in error loading is done 
			setError(true); // set error to reu
		}
	};
		
	// setting background image for weather is created here too
	const setBackgroundImage = () => {
        return weatherDict[todayWeather];
};

	useEffect(() => {
  		if (data.length > 0 && todayDateString !== '') { //if today is present
    		const cityData = data.find((city) => city.city === selectedCity); //filter through city selected by user
    		if (cityData) {  // if city data is found

		const futureCityData = cityData.forecast.filter( //filter through the date of today
        		(item) => item.date > todayDateString //dates of future that are greater than present day
      	      ).slice(0, 5); // up to 5 items
	      setFilteredData(futureCityData); //now filtered data is set

	      if (futureCityData.length > 0) { // if there is future data
          const ChartData = futureCityData.map((item, index) => ({ //chart data is made here by iterating throught the datas of our filtered data
		key: `${item.date}_${index}`, 
            	label: item.date,  // one value needed is date
            	value: item.avg, // another values is temperature average
		weather: item.weather, //finally condition of the whether is taken
          }));

          // Set up data for the bar chart
          setBarChartData(ChartData);
	      }
	    }
	  }
	}, [data, selectedCity, todayDateString]); // dependencies where our function depends on
	
	
	const [barChartData, setBarChartData] = useState([]); // set a state of bar chart so that we take chart data into it


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // list of datas where our date format will be changed to

  for (let i = 0; i < barChartData.length; i++) {
    const dateObject = new Date(barChartData[i].label); //we are setting new data type where date is the type
    const dayOfWeek = daysOfWeek[dateObject.getDay()]; // this declares a variable
    barChartData[i].label = dayOfWeek; // now the data of barchart is changed to a week data from date format year month and date
  }


	const xDomain = barChartData.map((xDataPoint) => xDataPoint.label) // map through chart data and give an x domain this values
	const xRange = [0, graphWidth] //the width of the graph or x range in mathematics
	const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1); //we are specifying our graph here we are giving it to d3

	const font = useFont(require("../assets/fonts/Rajdhani-Regular.ttf"), 25); // for the barchart use this font and font size

	const yDomain = [
		0,
		d3.max(barChartData, (yDataPoint) => yDataPoint.value) // giving y axis values from the domain from 0 to the y point of the graph
	]
	const yRange = [0, graphHeight] // now the length of the graph or y axis
	const y = d3.scaleLinear().domain(yDomain).range(yRange); //we are giving a y data using d3 

	const graphPath = useComputedValue(() => { // we are to compute the chart datas
    const newPath = Skia.Path.Make();

    barChartData.forEach((dataPoint) => {
        const rect = Skia.XYWHRect( // we are creating a rounded table using our datas
            x(dataPoint.label) - GRAPH_BAR_WIDTH / 2, // we are giving the x axis data
            graphHeight, // the graph height is given
            GRAPH_BAR_WIDTH, // the width of the bar
            y(dataPoint.value * animationState.current) * -1 // the y values
        );

        const roundedRect = Skia.RRectXY(rect, 8, 8); // a rounded table is formed
        newPath.addRRect(roundedRect);
    });
    return newPath;
}, [animationState, barChartData]);

	const animate = () => {
		animationState.current = 0 //we are making it start from 0

		runTiming(animationState,1, { //the animation of the bar chart take place here
			duration: 1600, //time taken for the animation
			easing: Easing.inOut(Easing.exp), //when the animation takes place it eases
		});
	}


    return <View style={styles.container}>
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
		<Canvas style={styles.canvas}>
			<Path path={graphPath} color="purple"/>
			{
				barChartData.map((dataPoint, index) => (
				<React.Fragment key={`${dataPoint.label}_${index}`}>
				<ShopifyText
					font={font}
					x={x(dataPoint.label) - 57}
					y={CanvasHeight - 20}
					text={`${dataPoint.weather?.substring(0, 8)}`}
				/>

				<ShopifyText
					font={font}
					x={x(dataPoint.label) - 57}
					y={CanvasHeight  + 0}
					text={`${dataPoint.value}°C`}
				/>

				<ShopifyText
					font={font}
					x={x(dataPoint.label) - 57}
					y={CanvasHeight  - 40}
					text={`${dataPoint.label?.substring(0, 3)}`}
					
				/>

				</React.Fragment>


				))
			}
		</Canvas>
		<TouchableOpacity
			style={styles.forecastButton} 
			title="Update Forecast" 
			onPress={animate}>
			<Ionicons name="reload" size={60} color="purple" />	
		</TouchableOpacity>

		</View>
		
		</>
		))}
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
		left: 0,
		top: 300,
		width:  "100%",
		height: "100%",
		borderRadius: 20,
		opacity: 1,
		overflow: "hidden",
	},
	canvas: {
		height: CanvasHeight,
		width: CanvasWidth,
	},
	forecastButton : {
		left: 250,
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
	}
});

export default WeatherForecastScreen;
