import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from '../components/Navigation';
import Sidenav from "../components/Sidenav";

class Layout extends React.Component {
	render() {
		return (
			<>
				<Navigation />
				<Sidenav />
				<div className="main-container">
					<Outlet />
				</div>
			</>
		);
	}
};

export default Layout;