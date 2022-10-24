import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import env from 'react-dotenv';

function MapView({ centre }) {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDazc7vWn0pL38tEErJSmrCcsjjsJvVpFc"
	});
	
	if (!isLoaded) {
		return <div>Loading...</div>
	}
	
	return (
		<GoogleMap center={centre}
		zoom={15}
		mapContainerStyle={{width: '750px', height: '750px'}}
		options={{
			streetViewControl: false,
			mapTypeControl: false,
			fullscreenControl: false,
		}}>
			
		</GoogleMap>
	);
}

export default MapView;