import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useAppContext } from '../utils/context/GlobalState';
import { UPDATE_MAPRESULTS } from '../utils/context/actions';

const libraries = ["places"];

// Docs: https://react-google-maps-api-docs.netlify.app/#section-introduction
function MapView({ centre }) {
	// Cannot be called in a useEffect hook
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyDazc7vWn0pL38tEErJSmrCcsjjsJvVpFc",
		libraries: libraries
	});
	const [nearbyPlaces, setNearbyPlaces] = useState([]);
	const [activeMarker, setActiveMarker] = useState(null);
	const [state, dispatch] = useAppContext();
	const dogParkMapIcon = '/images/icons/dogParkMapIcon.png'
	const currentLocationMapIcon = '/images/icons/currentLocation.png'

	// https://stackoverflow.com/questions/66944396/can-i-use-google-places-with-react-google-maps-api
	// Requires the places library be passed in through the useJsApiLoader
	const onMapLoad = (map) => {
		let request = {
			location: centre,
			radius: '50000',
			query: 'dog park'
		};

		let service = new window.google.maps.places.PlacesService(map);

		// https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests
		service.textSearch(request, (results, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				const np = [];

				for (var i = 0; i < results.length; i++) {
					// Save each result in the coords
					np.push(results[i]);
				}

				setNearbyPlaces(np);
				console.log(results);
				dispatch({ type: UPDATE_MAPRESULTS, mapResults: results });
			}
		});
	};

	// https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js
	const handleActiveMarker = (marker) => {
		if (marker === activeMarker) {
			return;
		}

		setActiveMarker(marker);
	};
	
	const renderRating = (rating) => {
		const ratingIcons = [];
		const ratingDeci = rating % 1;
		const ratingWhole = rating - ratingDeci;
		const zeroRating = Math.floor(5 - rating);
		
		ratingIcons.push(<span key="98" className="infoWindow-star__rating">{rating}</span>)
		
		// Adds filled stars
		for (let i = 0; i < ratingWhole; i++) {
			ratingIcons.push(<i key={i} className="infoWindow-star fa-solid fa-star"></i>);
		}
		
		// If the rating is less than 4, add empty stars
		for (let i = 0; i < zeroRating; i++) {
			ratingIcons.push(<i key={i + 5} className="infoWindow-star fa-regular fa-star"></i>);
		}
		
		if (ratingDeci !== 0) {
			// There is a decimal portion
			if (ratingDeci < 0.2) {
				ratingIcons.push(<i key="99" className="infoWindow-star fa-regular fa-star"></i>);
			}
			else if (ratingDeci >=0.2 && ratingDeci <= 0.7) {
				ratingIcons.push(<i key="99" className="infoWindow-star fa-regular fa-star-half-stroke"></i>);
			}
			else {
				ratingIcons.push(<i key="99" className="infoWindow-star fa-solid fa-star"></i>);
			}
		}
		
		return ratingIcons;
	};

	if (!isLoaded) {
		// Prevents errors before the google map is rendered
		return <div>Loading...</div>
	}

	return (
		<GoogleMap
			center={centre}
			zoom={13}
			// height: Subtract the navbar size
			mapContainerStyle={{ width: '100%', height: 'calc(100vh - 64px)' }}
			onLoad={onMapLoad}
			onClick={() => setActiveMarker(null)}
			options={{
				streetViewControl: false,
				mapTypeControl: false,
				fullscreenControl: false,
			}}>

			{/* Your location marker */}
			<Marker position={centre} icon={`${process.env.PUBLIC_URL}${currentLocationMapIcon}`} onClick={() => handleActiveMarker("yourLocation")}>
				{activeMarker === "yourLocation" ? (
					<InfoWindow onCloseClick={() => setActiveMarker(null)}>
						<div>
							Your location
						</div>
					</InfoWindow>)
					: null}
			</Marker>
			{/* Nearby places markers */}
			{nearbyPlaces.map((np, i) => <Marker key={i} position={np.geometry.location} icon={`${process.env.PUBLIC_URL}${dogParkMapIcon}`} onClick={() => handleActiveMarker(i)}>
				{activeMarker === i ? (
					<InfoWindow onCloseClick={() => setActiveMarker(null)}>
						<div className="infoWindow">
							{np?.photos && np?.photos.length >= 1 ?
								<img className="infoWindow-img" src={np.photos[0].getUrl()} alt="" />
							: null}
							<h5 className="center-align">
								{np.name}
							</h5>
							
							<div className="center-align">
								{np.formatted_address}
							</div>
							{np?.rating !== null || np?.rating !== undefined ? <div className="center-align">{renderRating(np.rating)}</div> : null}
							{/* {np?.opening_hours?.open_now ? <div className="infoWindow-nowOpen">Now Open</div> : <div className="infoWindow-closed">Closed</div>} */}
						</div>
					</InfoWindow>)
					: null}
			</Marker>)}
		</GoogleMap>
	);
}

export default MapView;