import React from 'react';
import Navigation from './components/Navigation';
import MapView from './components/MapView';

function App() {

	return (
		<div className="App">
			<Navigation />
			<MapView centre={{ lat: -37.965561, lng: 145.269669 }} />
		</div>
	);
}

export default App;
