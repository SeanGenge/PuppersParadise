import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from '@materializecss/materialize';
import Auth from '../utils/auth';
import { useAppContext } from '../utils/context/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphql/queries';

function SideNavMobile() {
	const [user, setUserData] = useState({});
	const [state] = useAppContext();
	const { data } = useQuery(QUERY_ME);
	
	useEffect(() => {
		if (!Auth.isLoggedIn() && !state.isLoggedIn) return;

		setUserData(data?.me);
	}, [state, data]);
	
	useEffect(() => {
		// Run once all elements are rendered correctly
		var elem = document.getElementById('sideNav-mobile');
		M.Sidenav.init(elem);
	}, []);

	return (
		<>
			<ul id="sideNav-mobile" className="sidenav">
				{
					user?.firstName ?
					(
						<>
							<li>
								<Link to="/profile">
									{user?.pets ? <img className="profile-pic" src={user.pets[0]?.imageFilePath} /> : null}
									{user.firstName}'s profile
								</Link>
							</li>
							<li>
								<a href="#" onClick={() => Auth.logout()}>
									Logout
								</a>
							</li>
						</>
					) :
					(
						<>
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
						</>
					)
				}
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
			</ul>
		</>
	);
}

export default SideNavMobile;