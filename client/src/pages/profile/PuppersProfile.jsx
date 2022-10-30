import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import M from '@materializecss/materialize';
import { UPDATE_PET } from '../../utils/graphql/mutations';
import { QUERY_ME } from '../../utils/graphql/queries';
import BreedAutofillInput from '../../components/BreedAutofillInput';

function PuppersProfile() {
	const [id, setId] = useState('');
	const [puppersName, setPuppersName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [pupperBreed, setPupperBreed] = useState('');
	const [pupperImage, setPupperImage] = useState('');
	const [hasUpdatedImage, setHasUpdatedImage] = useState('');
	const { data } = useQuery(QUERY_ME);
	const [updatePupper] = useMutation(UPDATE_PET)

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Return the correct function based on the name of the input field
		switch (name) {
			case 'firstName':
				return setPuppersName(value);
			default:
				return null;
		}
	};
	
	useEffect(() => {
		if (data) {
			const user = data.me;
			// Since there is only going to be one pet currently, can just get the first pet
			const pet = user.pets[0];
			
			setPuppersName(pet.name);
			setBirthday(pet.birthday);
			setPupperBreed(pet.breed);
			setPupperImage(pet.imageFilePath);
			setHasUpdatedImage(false);
			setId(pet._id);
			
			var elems = document.querySelectorAll('.datepicker');
			M.Datepicker.init(elems, {
				onSelect: (e) => setBirthday(e),
				autoClose: true,
				maxDate: new Date(),
				defaultDate: new Date(pet.birthday),
				setDefaultDate: true
			});
		}
	}, [data, setPuppersName, setBirthday]);

	const handleSave = async (e) => {
		e.preventDefault();
		
		let imageFilePath = null;

		// Update the global user as well as the database
		if (puppersName === "") {
			console.log("Puppers name is required!");
			return;
		}

		try {
			// Upload the image first
			if (hasUpdatedImage) {
				imageFilePath = await uploadDogPic();
			}
			
			let updatedPet = {
				_id: id,
				name: puppersName,
				birthday: birthday,
				breed: pupperBreed,
			};
			
			if (imageFilePath) {
				updatedPet = {
					...updatedPet,
					imageFilePath: imageFilePath.publicFilePath
				}
			}
			
			// Update the database user first
			const { data } = await updatePupper({
				variables: { updatedPet: updatedPet },
			});

			if (data) {
				console.log("Saved successfully!");
			}
		}
		catch (err) {
			console.log(JSON.stringify(err, null, 2));
		}
	};
	
	const onDogPicChange = (e) => {
		let profilePic = document.getElementById("profile-pic");
		const file = e.target.files[0];
		
		if (file) {
			profilePic.src = URL.createObjectURL(file);
			setHasUpdatedImage(true);
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
		<div className="row puppers-profile">
			<div className="col">
				<div className="row">
					<img id="profile-pic" className="puppers-profile__image" src={pupperImage} />
				</div>
				<div className="row">
					<input type="file" id="dogPic" name="dogPic" className="btn-filepicker" onChange={(e) => onDogPicChange(e)} />	
				</div>
			</div>
			<div className="col s5">
				<form>
					<div className="row">
						<div className="input-field col s12">
							<input id="puppersName" name="firstName" type="text" className="validate" value={puppersName} onChange={handleInputChange} />
							<label htmlFor="puppersName">Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="birthday" name="birthday" type="text" readOnly className="datepicker" />
							<label htmlFor="birthday">Birthday</label>
						</div>
					</div>
					<div className="row">
						<BreedAutofillInput selectedBreed={pupperBreed} setSelectedBreed={(e) => setPupperBreed(e.target.value)} onAutocomplete={(auto) => setPupperBreed(auto)} />
					</div>
					<button className="btn waves-effect waves-light right background-primary" onClick={handleSave}>
						Save
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>
		</div>
	);
}

export default PuppersProfile;
