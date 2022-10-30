import React, { useEffect } from 'react';
import M from '@materializecss/materialize';
import FindBuddyList from '../components/FindBuddyList';
import FriendsList from '../components/FriendsList';
import Auth from '../utils/auth';
import Login from '../pages/LoginPage';

function FindBuddy() {
	useEffect(() => {
		M.Tabs.init(document.getElementById("buddytabs"));
	}, []);
	
	if (!Auth.isLoggedIn()) return <Login />

	return (
		<div className="container">
			<div className="row">
				<div className="col s12 center-align">
					<h3>Find a dog buddy</h3>
				</div>
				<ul id="buddytabs" className="tabs">
					<li className="tab col s3">
						<a className="active" href="#findabuddy">Find a buddy</a>
					</li>
					<li className="tab col s3">
						<a href="#friends">Friends</a>
					</li>
				</ul>
				<div id="findabuddy" className="col s12">
					<FindBuddyList />
				</div>
				<div id="friends" className="col s12">
					<FriendsList />
				</div>
			</div>
		</div>
	);
}

export default FindBuddy;