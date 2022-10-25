import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useAppContext } from '../utils/context/GlobalState';

function Navigation() {
	const [user, setUserData] = useState({});
	const [state, dispatch] = useAppContext();
	
	useEffect(() => {
		if (!Auth.isLoggedIn() && !state.isLoggedIn) return;
		
		setUserData(Auth.getUser().data);
	}, [setUserData, state]);
	
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
							user?.firstName ?
							(
								<>
									<li>
										<Link to="/profile">
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