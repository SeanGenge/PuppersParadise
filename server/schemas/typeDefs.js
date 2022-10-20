const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		email: String!
		firstName: String!
		lastName: String
		friends: [User]!
		password: String!
	}
	
	type Auth {
		token: ID
		user: User
	}
	
	input UserInput {
		email: String!
		firstName: String!
		lastName: String
		password: String!
	}

	type Query {
		users: [User]!
		
	}
	
	type Mutation {
		addUser(user: UserInput): Auth
		login(email: String!, password: String!): Auth
		addFriend(friendId: ID!): User
	}
`;

module.exports = typeDefs;
