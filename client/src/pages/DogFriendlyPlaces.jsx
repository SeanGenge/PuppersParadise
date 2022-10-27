import React from 'react';
import MapView from '../components/MapView';
import MapViewSideNav from '../components/MapViewSideNav';

function DogFriendlyPlaces() {
	
	return (
		<div className="row">
			{/* <MapViewSideNav /> */}
			<MapView centre={{ lat: -37.934200, lng: 145.179200 }} />
		</div>
	);
}

export default DogFriendlyPlaces;
