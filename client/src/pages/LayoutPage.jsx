import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import SideNavMobile from "../components/SideNavMobile";

class Layout extends React.Component {
	render() {
		return (
			<>
				<Navbar />
				<SideNavMobile />
				<div className="main-container">
					<Outlet />
				</div>
			</>
		);
	}
};

export default Layout;