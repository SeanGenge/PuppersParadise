import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useAppContext } from '../utils/context/GlobalState';
import { useLazyQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphql/queries';
import { UPDATE_ISLOGGEDIN } from '../utils/context/actions';

function Navigation() {
	const [user, setUserData] = useState({});
	const [state, dispatch] = useAppContext();
	const [getLoggedInUser, { data }] = useLazyQuery(QUERY_ME);
	
	useEffect(() => {
		if (Auth.isLoggedIn() && !state.isLoggedIn) {
			// Update the global variable
			dispatch({ type: UPDATE_ISLOGGEDIN, isLoggedIn: true });
		}
		
		if (Auth.isLoggedIn() && state.isLoggedIn) {
			getLoggedInUser();
		}
	}, [state, getLoggedInUser]);
	
	useEffect(() => {
		if (!Auth.isLoggedIn() && !state.isLoggedIn) return;
		
		if (data && data !== undefined) {
			setUserData(data?.me);
		}
	}, [state, data, setUserData]);
	
	return (
		<>
			<nav className="background-primary">
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo">
						<i className="fa-solid fa-paw material-icons"></i>
						Puppers Paradise
					</Link>
					<a href="#" data-target="sideNav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					<ul className="right hide-on-med-and-down">
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
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navigation;