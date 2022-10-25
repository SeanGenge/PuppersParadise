import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER_BY_ID } from '../utils/graphql/queries';
import {
	UPDATE_LOGGEDINUSER
} from '../utils/context/actions';
import { useAppContext } from '../utils/context/GlobalState';

function Navigation() {
	const [state, dispatch] = useAppContext();
	const [getUserData, { data }] = useLazyQuery(QUERY_USER_BY_ID);
	
	useEffect(() => {
		if (data) {
			dispatch({
				type: UPDATE_LOGGEDINUSER,
				user: data.user
			});
		}
	}, [data, dispatch]);
	
	useEffect(() => {
		if (Auth.isLoggedIn() && !state.loggedInUser) {
			// User may have refreshed the page or some other reason
			// Retrieve the users details again
			const userToken = Auth.getUser();
			
			if (userToken) {
				getUserData({
					variables: { id: userToken.data._id }
				});
			}
		}
	}, [state.loggedInUser, getUserData]);
	
	return (
		<>
			<nav className="background-primary">
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo">
						<i className="fa-solid fa-paw material-icons"></i>
						Puppers Paradise
					</Link>
					<a href="#" data-target="sidenav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
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
							state?.loggedInUser?.firstName ?
							(
								<>
									<li>
										<Link to="/profile">
											{state.loggedInUser?.firstName}'s profile
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