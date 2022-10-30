import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, ADD_PET } from '../utils/graphql/mutations';
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { UPDATE_ISLOGGEDIN } from '../utils/context/actions';
import { useAppContext } from '../utils/context/GlobalState';
import M from '@materializecss/materialize';
import BreedAutofillInput from '../components/BreedAutofillInput';

function Signup() {
	// Local state for the new user and pet
	const [newUser, setNewUser] = useState({});
	const [newPupper, setNewPupper] = useState({});
	const navigate = useNavigate();
	const [createUser] = useMutation(ADD_USER);
	const [addPet] = useMutation(ADD_PET);
	const [state, dispatch] = useAppContext();
	
	useEffect(() => {
		var datePicker = document.getElementById('birthday');
		M.Datepicker.init(datePicker, {
			maxDate: new Date(),
			autoClose: true,
			onSelect: (date) => {
				setNewPupper({
					...newPupper,
					birthday: date
				});
			}
		});
	}, [setNewPupper, newPupper]);
	
	const handleInputChange = (e, updateVar, updateCallback) => {
		const { name, value } = e.target;
		
		// Update the correct field
		updateCallback({
			...updateVar,
			[name]: value
		});
	};
	
	const handleSignUp = async (e) => {
		e.preventDefault();
		
		if (newUser?.firstName === undefined || newUser?.password === undefined || newUser?.email === undefined || newUser?.firstName === '' || newUser?.password === '' || newUser?.email === '') {
			return;
		}
		
		try {
			// Create the new user
			const { data } = await createUser({
				variables: { newUser: newUser },
			});
			
			if (data) {
				// Log the user in
				Auth.login(data.addUser.token);
				
				dispatch({ type: UPDATE_ISLOGGEDIN, isLoggedIn: true });
				
				// Upload the dog pic to the server
				const file = await uploadDogPic();
				
				// Add your puppers
				addPuppers(file);
				
				navigate('/');
			}
		}
		catch (err) {
			// A more verbose error
			console.log(JSON.stringify(err, null, 2));
		}
	};
	
	const addPuppers = async (file) => {
		try {
			// Creating a new object instead of setting the puppers state because the update is asyncronous so imageFilePath may not be there when adding the pet
			const pupper = {
				...newPupper,
				imageFilePath: file.publicFilePath
			}
			
			const { data } = await addPet({
				variables: { newPet: pupper },
			});

			if (data) {
				console.log(data);
			}
		}
		catch (err) {
			console.log(JSON.stringify(err, null, 2));
		}
	};
	
	const uploadDogPic = async () => {
		// https://blog.logrocket.com/multer-nodejs-express-upload-file/
		const dogPic = document.getElementById("dogPic");
		const formData = new FormData();
		for (let i = 0; i < dogPic.files.length; i++) {
			formData.append("dogPic", dogPic.files[i]);
		}
		
		// Upload the image to the server in the public folder
		const filePath = await fetch('/api/image/upload', {
			method: "POST",
			body: formData
		})
		.then(res => res.json());
		
		return filePath;
	};
	
	return (
		<div className="container">
			<div className="row">
				<div className="col s12 center-align">
					<h3>Sign Up</h3>
				</div>
				<form className="col s12 m8 l6 offset-m3 offset-l3 mt-25" encType="multipart/form-data">
					<div className="row">
						<div className="input-field col s6">
							<input id="firstName" name="firstName" type="text" className="validate" value={newUser?.firstName || ''} onChange={(e) => handleInputChange(e, newUser, setNewUser)} />
							<label htmlFor="firstName">First Name</label>
						</div>
						<div className="input-field col s6">
							<input id="lastName" name="lastName" type="text" className="validate" value={newUser?.lastName || ''} onChange={(e) => handleInputChange(e, newUser, setNewUser)} />
							<label htmlFor="lastName">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" name="password" type="password" className="validate" value={newUser?.password || ''} onChange={(e) => handleInputChange(e, newUser, setNewUser)} />
								<label htmlFor="password">Password</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" name="email" type="email" className="validate" value={newUser?.email || ''} onChange={(e) => handleInputChange(e, newUser, setNewUser)} />
								<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="col s12 center-align">
						<h4>Puppers Details</h4>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="name" name="name" type="text" className="validate" value={newPupper?.name || ''} onChange={(e) => handleInputChange(e, newPupper, setNewPupper)} />
							<label htmlFor="name">Puppers Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="birthday" name="birthday" type="text" readOnly className="datepicker" />
							<label htmlFor="birthday">Puppers birthday</label>
						</div>
					</div>
					<div className="row">
						<BreedAutofillInput selectedBreed={newPupper?.breed} setSelectedBreed={(e) => handleInputChange(e, newPupper, setNewPupper)} onAutocomplete={(auto) => setNewPupper({...newPupper, breed: auto})} />
					</div>
					<div className="row">
						<label htmlFor="dogPic">Picture of your dog: </label>
						<input type="file" id="dogPic" name="dogPic" className="btn-filepicker" />
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
