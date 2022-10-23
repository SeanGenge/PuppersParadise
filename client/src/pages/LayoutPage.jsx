import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidenav from "../components/Sidenav";

class Layout extends React.Component {
	render() {
		return (
			<>
				<Navbar />
				<Sidenav />
				<div className="main-container">
					<Outlet />
				</div>
			</>
		);
	}
};

export default Layout;