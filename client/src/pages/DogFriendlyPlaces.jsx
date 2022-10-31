import React from 'react';
import MapView from '../components/MapView';
import Auth from '../utils/auth';
import Login from '../pages/LoginPage';

function DogFriendlyPlaces() {
	if (!Auth.isLoggedIn()) return <Login />
	
	return (
		<MapView />
	);
}

export default DogFriendlyPlaces;
