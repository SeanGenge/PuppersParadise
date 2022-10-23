import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navigation() {
	return (
		<>
			<nav className="background-primary">
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo">
						<i className="fas fa-solid fa-paw material-icons"></i>
						Puppers Paradise
					</Link>
					<a href="#" data-target="sidenav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					<ul className="right hide-on-med-and-down">
						<li>
							<Link to="/findbuddy">
								<i className="fas fa-solid fa-dog material-icons left"></i>
								Find Dog Buddies
							</Link>
						</li>
						<li>
							<Link to="/dogfriendlyplaces">
								<i className="fas fa-solid fa-map-location-dot material-icons left"></i>
								Dog friendly places near me
							</Link>
						</li>
						{
							Auth.isLoggedIn() ?
							(
								<>
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