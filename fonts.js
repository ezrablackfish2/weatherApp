import React from "react";
import * as Font from 'expo-font';

export async function loadFonts(setAppIsLoaded) { // is async cause it should be loaded from any other fucntion starts
      try {
        await Font.loadAsync({ // this is where the fonts are being loaded from a directory
				"Bellota": require("./assets/fonts/Bellota-Regular.ttf"),
				"Aguafina": require("./assets/fonts/AguafinaScript-Regular.ttf"),
				"Barrio": require("./assets/fonts/Barrio-Regular.ttf"),
				"Amatic": require("./assets/fonts/AmaticSC-Regular.ttf"),
				"BlackOps": require("./assets/fonts/BlackOpsOne-Regular.ttf"),
				"Caveat": require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
				"Chakra": require("./assets/fonts/ChakraPetch-Regular.ttf"),
				"Croissant": require("./assets/fonts/CroissantOne-Regular.ttf"),
				"Dancing": require("./assets/fonts/DancingScript-VariableFont_wght.ttf"),
				"Hammer": require("./assets/fonts/HammersmithOne-Regular.ttf"),
				"Itim": require("./assets/fonts/Itim-Regular.ttf"),
				"Lilita": require("./assets/fonts/LilitaOne-Regular.ttf"),
				"Montserrat": require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
				"Orbitron": require("./assets/fonts/Orbitron-VariableFont_wght.ttf"),
				"Rajdhani": require("./assets/fonts/Rajdhani-Regular.ttf"),
				"SedgwickAve": require("./assets/fonts/SedgwickAve-Regular.ttf"),
				"Shadows": require("./assets/fonts/ShadowsIntoLight-Regular.ttf"),
	  
        });
      } catch (error) {
        if (error.message !== "Font.loadAsync unexpected exception: Font not found /data/user/0/host.exp.exponent/cache/ExponentAsset-9bd9bde59dc816ef93cd18069b65a40e.ttf") 
	{
    	console.log(error);
  	} // if error happens while loading font show this
      } finally {
        setAppIsLoaded(true); //after finish load the app to hide the splash screen
      }
}

