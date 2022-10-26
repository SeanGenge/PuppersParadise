import React, { useEffect } from 'react';
import M from '@materializecss/materialize';
import AccountSettings from './AccountSettings';
import PuppersProfile from './PuppersProfile';

function Profile() {
	useEffect(() => {
		M.Tabs.init(document.getElementById("tabs"));
	}, []);

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h3>Your Profile</h3>
					</div>
					<div className="col s12">
						<ul id="tabs" className="tabs">
							<li className="tab col s3">
								<a className="active" href="#puppersProfile">Puppers Profile</a>
							</li>
							<li className="tab col s3"><a href="#accountSettings">Account Settings</a>
							</li>
						</ul>
					</div>
					<div id="puppersProfile" className="col s12">
						<PuppersProfile />
					</div>
					<div id="accountSettings" className="col s12">
						<AccountSettings />
					</div>
				</div>
			</div>
			
		</>
		
	);
}

export default Profile;
