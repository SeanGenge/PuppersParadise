import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import M from '@materializecss/materialize';
import { UPDATE_USER } from '../../utils/graphql/mutations';
import { QUERY_ME } from '../../utils/graphql/queries';

function AccountSettings() {
	// Store the values locally first until required
	const [updatedUser, setUpdatedUser] = useState({});
	const [updateUser] = useMutation(UPDATE_USER);
	const { data } = useQuery(QUERY_ME);
	
	useEffect(() => {
		M.updateTextFields();
	});
	
	useEffect(() => {
		if (data) {
			const user = data.me;
			setUpdatedUser({
				firstName: user?.firstName || '',
				lastName: user?.lastName || '',
				email: user?.email || '',
			});
		}
	}, [data, setUpdatedUser]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		
		if (name === "password" && value === "") {
			// Remove the password field if it is empty
			const updatedUserCopy = {...updatedUser};
			delete updatedUserCopy['password'];
			
			setUpdatedUser(updatedUserCopy);
		}
		else {
			// Update the correct field
			setUpdatedUser({
				...updatedUser,
				[name]: value
			});
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		
		if (updatedUser?.firstName === "" || updatedUser?.email ==="") {
			console.log("first name and email fields are required!");
			return;
		}
		
		try {
			// Update the database user first
			const { data } = await updateUser({
				variables: { updatedUser: updatedUser },
			});
			
			// Clear the password field
			if ("password" in updatedUser) {
				const updatedUserCopy = { ...updatedUser };
				delete updatedUserCopy['password'];

				setUpdatedUser(updatedUserCopy);
			}
			
			if (data) {
				console.log("Saved successfully!");
			}
		}
		catch (err) {
			console.log(JSON.stringify(err, null, 2));
		}
	};

	return (
		<>
			<form className="col s12 m6 offset-m3 mt-25">
				<div className="row">
					<div className="input-field col s12">
						<input id="firstName" name="firstName" type="text" className="validate" value={updatedUser?.firstName || ''} onChange={(handleInputChange)} />
						<label htmlFor="firstName" className="active">First name</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input id="lastName" name="lastName" type="text" className="validate" value={updatedUser?.lastName || ''} onChange={handleInputChange} />
						<label htmlFor="lastName">Last name</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input id="email" name="email" type="email" className="validate" value={updatedUser?.email || ''} onChange={handleInputChange} />
						<label htmlFor="email">Email</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input id="password" name="password" type="password" className="validate" value={updatedUser?.password || ''} onChange={handleInputChange} />
						<label htmlFor="password">New Password</label>
					</div>
				</div>
				<button className="btn waves-effect waves-light right background-primary" onClick={handleUpdate}>
					Save
					<i className="material-icons right">send</i>
				</button>
			</form>
		</>

	);
}

export default AccountSettings;
