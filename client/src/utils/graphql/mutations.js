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
				birthday
			}
			friendCount
			petCount
		}
	}
}
`;