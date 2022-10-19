import React, { useState } from 'react';

function Navigation() {
	
	const result = (async () => {
		const r = await fetch("/api/maps/")
			.then(result => result.json());
			
		console.log(r);
	})();
	
	return (
		<div>Hello</div>
	);
}

export default Navigation;