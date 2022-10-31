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
				<div className="content">
					<Outlet />
				</div>
				<Footer />
			</>
		);
	}
};

export default Layout;