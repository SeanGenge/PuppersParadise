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
					birthday
				}
				petCount
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
`