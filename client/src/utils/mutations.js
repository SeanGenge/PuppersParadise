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