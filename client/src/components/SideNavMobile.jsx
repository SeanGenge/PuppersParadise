import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from '@materializecss/materialize';

function SideNavMobile() {
	useEffect(() => {
		// Run once all elements are rendered correctly
		var elem = document.getElementById('sideNav-mobile');
		M.Sidenav.init(elem);
	}, []);

	return (
		<>
			<ul id="sideNav-mobile" className="sidenav">
				<li>
					<Link to="/findbuddy">
						<i className="fa-solid fa-dog material-icons left"></i>
						Find Dog Buddies
					</Link>
				</li>
				<li>
					<Link to="/dogfriendlyplaces">
						<i className="fa-solid fa-map-location-dot material-icons left"></i>
						Dog friendly places near me
					</Link>
				</li>
				<li>
					<Link to="/login">
						Login
					</Link>
				</li>
				<li>
					<Link to="/signup">
						Sign up
					</Link>
				</li>
			</ul>
		</>
	);
}

export default SideNavMobile;