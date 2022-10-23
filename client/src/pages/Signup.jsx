import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const [createUser] = useMutation(ADD_USER);
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		
		// Return the correct function based on the name of the input field
		switch (name) {
			case 'first_name':
				return setFirstName(value);
			case 'last_name':
				return setLastName(value);
			case 'email':
				return setEmail(value);
			case 'password':
				return setPassword(value);
			default:
				return null;
		}
	};
	
	const handleSignUp = async (e) => {
		e.preventDefault();
		
		const newUser = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}
		
		try {
			// Create the new user
			const { data } = await createUser({
				variables: { newUser: newUser },
			});
			
			// Log the user in
			Auth.login(data.addUser.token);
		}
		catch (err) {
			// A more verbose error
			console.log(JSON.stringify(err, null, 2));
		}
	};
	
	return (
		<div className="container">
			<div className="row">
				<div className="col s12 center-align">
					<h3>Sign Up</h3>
				</div>
				<form className="col s12 mt-25">
					<div className="row">
						<div className="input-field col s6">
							<input id="first_name" name="first_name" type="text" className="validate" value={firstName} onChange={handleInputChange} />
								<label htmlFor="first_name">First Name</label>
						</div>
						<div className="input-field col s6">
							<input id="last_name" name="last_name" type="text" className="validate" value={lastName} onChange={handleInputChange} />
								<label htmlFor="last_name">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" name="password" type="password" className="validate" value={password} onChange={handleInputChange} />
								<label htmlFor="password">Password</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" name="email" type="email" className="validate" value={email} onChange={handleInputChange} />
								<label htmlFor="email">Email</label>
						</div>
					</div>
					<button className="btn waves-effect waves-light right background-primary" onClick={handleSignUp}>
						Sign up
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
