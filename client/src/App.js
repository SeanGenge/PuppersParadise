import React, { useState } from 'react';
import './App.css';
import MapView from './components/MapView';

function App() {
	
	return (
		<div className="App">
			<MapView centre={{lat: -37.965561, lng: 145.269669}} />
		</div>
	);
}

export default App;
