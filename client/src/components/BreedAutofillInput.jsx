import React, { useState, useEffect } from 'react';
import M from '@materializecss/materialize';

function BreedAutofillInput({ selectedBreed, setSelectedBreed, onAutocomplete }) {
	const [breeds, setBreeds] = useState([]);
	
	useEffect(() => {
		// Retrieves all the breeds using the dog API
		fetch("https://api.thedogapi.com/v1/breeds", {
			headers: {
				"x-api-key": "live_e1MQO5WkxfYRvNjWdrazjAxyUNazFVbyCe0CRk7RNcAcNKDo8zx5gqYzV1VN91BD"
			}
		})
			.then(res => res.json())
			.then(result => {
				setBreeds(result);
			});
	}, [setBreeds]);
	
	useEffect(() => {
		if (breeds && breeds.length) {
			var breedAuto = document.getElementById('breed');
			var breedData = {};

			breeds.forEach(breed => breedData[breed.name] = null);

			M.Autocomplete.init(breedAuto, {
				onAutocomplete: (autocomplete) => {
					// Update the breed state of the pupper from the autocomplete text
					onAutocomplete(autocomplete);
				},
				data: {
					...breedData
				}
			});
		}
	}, [breeds, onAutocomplete]);
	
	return (
		<div className="input-field col s12">
			<input id="breed" name="breed" type="text" className="autocomplete" value={selectedBreed || ''} onChange={(e) => setSelectedBreed(e)} />
			<label htmlFor="breed">Breed</label>
		</div>
	);
}

export default BreedAutofillInput;
