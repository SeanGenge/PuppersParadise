import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
	query getAllUsers {
		users {
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
				pets {
					_id
					name
					breed
					birthday
					imageFilePath
				}
				petCount
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
`;

export const QUERY_USER_BY_ID = gql`
	query getUserById($id: ID!) {
		user(_id: $id) {
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
				petCount
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
`;

export const QUERY_ME = gql`
	query me {
		me {
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
				pets {
					_id
					name
					breed
					birthday
					imageFilePath
				}
				petCount
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
`;

export const QUERY_GET_ALL_PETS = gql`
	query getAllPets {
		pets {
			_id
			name
			birthday
			imageFilePath
		}
	}
`;

export const QUERY_REVIEWS = gql`
	query getAllReviews {
		reviews {
			_id
			name
			review
			rating
		}
	}
`;