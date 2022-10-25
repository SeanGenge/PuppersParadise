import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/graphql/mutations';
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { UPDATE_ISLOGGEDIN } from '../utils/context/actions';
import { useAppContext } from '../utils/context/GlobalState';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const [state, dispatch] = useAppContext();
	const [login] = useMutation(LOGIN);
	const navigate = useNavigate();
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Return the correct function based on the name of the input field
		switch (name) {
			case 'email':
				return setEmail(value);
			case 'password':
				return setPassword(value);
			default:
				return null;
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Login
			const { data } = await login({
				variables: { email: email, password: password },
			});
			
			if (data) {
				setEmail('');
				setPassword('');
				
				// Log the user in
				Auth.login(data.login.token);
				
				dispatch({ type: UPDATE_ISLOGGEDIN, isLoggedIn: true });
				
				// Go to the home page
				navigate("/");
			}
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
					<h3>Login</h3>
				</div>
				<form className="col s12 m6 offset-m3 mt-25">
					<div className="row">
						<div className="input-field col s12">
							<input id="email" name="email" type="email" className="validate" value={email} onChange={handleInputChange} />
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" name="password" type="password" className="validate" value={password} onChange={handleInputChange} />
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<button className="btn waves-effect waves-light right background-primary" onClick={handleLogin}>
						Login
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
