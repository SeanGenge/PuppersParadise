import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import M from '@materializecss/materialize';

function PuppersProfile() {
	const [puppersName, setPuppersName] = useState('');
	const [birthday, setBirthday] = useState('');

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
		var elems = document.querySelectorAll('.datepicker');
		var instances = M.Datepicker.init(elems, {
			onSelect: (e) => setBirthday(e),
			autoClose: true,
			maxDate: new Date()
		});
	}, []);
	
	useEffect(() => {
		console.log(birthday);
	}, [birthday]);

	const handleSave = async (e) => {

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
						<input id="birthday" name="birthday" type="text" readOnly className="datepicker" value={birthday} />
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
