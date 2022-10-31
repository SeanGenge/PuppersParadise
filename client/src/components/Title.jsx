import React from 'react';

function Title({ title }) {

	return (
		<h2 className="header center-align">{title}<br /><i className="fa-solid fa-bone foreground-primary"></i></h2>
	);
}

export default Title;