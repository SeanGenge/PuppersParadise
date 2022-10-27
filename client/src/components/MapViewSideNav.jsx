import React, { useState } from 'react';
import { useAppContext } from '../utils/context/GlobalState';

function MapViewSideNav() {
	const [state, dispatch] = useAppContext();
	
	return (
		<div className="mapView-sideNav">
			{state.mapResults ? state.mapResults.map(result => <div>test</div>) : null}
		</div>
	);
}

export default MapViewSideNav;