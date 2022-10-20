import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react'

function Navigation() {
	
	const result = (async () => {
		const r = await fetch("/api/maps/")
			.then(result => result.json());
			
		console.log(r);
	})();
	
	return (
		<>
			<Button animated>
				<Button.Content visible>Next</Button.Content>
				<Button.Content hidden>
					<Icon name='arrow right' />
				</Button.Content>
			</Button>
			<Button primary>Primary</Button>
		</>
	);
}

export default Navigation;