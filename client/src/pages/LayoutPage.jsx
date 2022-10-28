import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import SideNavMobile from "../components/SideNavMobile";
import Footer from '../components/Footer';

class Layout extends React.Component {
	render() {
		return (
			<>
				<Navbar />
				<SideNavMobile />
				<Outlet />
			</>
		);
	}
};

export default Layout;