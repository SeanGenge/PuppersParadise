import { gql } from '@apollo/client';

export const ADD_USER = gql`
	mutation addUser($newUser: UserInput) {
		addUser(user: $newUser) {
			token
			user {
				_id
				email
				firstName
				lastName
				address
				city
			}
		}
	}
`;

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				email
				firstName
				lastName
				address
				city
				friends {
					_id
					email
					firstName
					lastName
					address
					city
				}
				pets {
					_id
					name
					breed
					birthday
					imageFilePath
				}
				friendCount
				petCount
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser($updatedUser: UserInput) {
		updateUser(user: $updatedUser) {
			_id
			email
			firstName
			lastName
			address
			city
		}
	}
`;

export const ADD_PET = gql`
	mutation addPet($newPet: PetInput) {
		addPet(pet: $newPet) {
			owner {
				_id
				email
				firstName
				lastName
				address
				city
				friends {
					_id
					email
					firstName
					lastName
					address
					city
				}
				pets {
					_id
					name
					breed
					birthday
					imageFilePath
				}
				friendCount
				petCount
			}
			pet {
				_id
				name
				breed
				birthday
				imageFilePath
			}
		}
	}
`;

export const UPDATE_PET = gql`
	mutation updatePet($updatedPet: PetInputUpdate) {
		updatePet(pet: $updatedPet) {
			_id
			name
			breed
			birthday
			imageFilePath
		}
	}
`;