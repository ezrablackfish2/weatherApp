import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./MainNavigator";



// app navigator is used to make a navigation between main and also if there is a user so that if the user signed in or not
const AppNavigator = (props) => {
	return (
        <NavigationContainer>
		<MainNavigator />
        </NavigationContainer>
	
	)
}



export default AppNavigator;
