import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import M from '@materializecss/materialize';
import { UPDATE_PET } from '../../utils/graphql/mutations';
import { QUERY_ME } from '../../utils/graphql/queries';

function PuppersProfile() {
	const [id, setId] = useState('');
	const [puppersName, setPuppersName] = useState('');
	const [birthday, setBirthday] = useState('');
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

		// Update the global user as well as the database
		if (puppersName === "") {
			console.log("Puppers name is required!");
			return;
		}

		try {
			const updatedPet = {
				_id: id,
				name: puppersName,
				birthday: birthday
			};
			
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

	return (
		<>
			<form className="col s12 m6 offset-m3 mt-25">
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
				<button className="btn waves-effect waves-light right background-primary" onClick={handleSave}>
					Save
					<i className="material-icons right">send</i>
				</button>
			</form>
		</>

	);
}

export default PuppersProfile;
