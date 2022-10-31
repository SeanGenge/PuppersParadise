const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar Date
	
	type User {
		_id: ID
		email: String!
		firstName: String!
		lastName: String
		address: String
		city: String
		friends: [User]!
		pets: [Pet]!
		password: String!
		friendCount: Int
		petCount: Int
	}
	
	type Pet {
		_id: ID
		name: String!
		breed: String!
		birthday: Date
		imageFilePath: String
	}
	
	type Review {
		_id: ID
		name: String!
		review: String!
		rating: Float!
	}
	
	type Auth {
		token: ID
		user: User
	}
	
	type PetOwner {
		owner: User
		pet: Pet
	}
	
	input UserInput {
		email: String!
		firstName: String!
		lastName: String
		address: String
		city: String
		password: String
	}
	
	input PetInput {
		name: String!
		breed: String!
		birthday: Date
		imageFilePath: String
	}
	
	input PetInputUpdate {
		_id: ID
		name: String!
		breed: String!
		birthday: Date
		imageFilePath: String
	}
	
	input ReviewInput {
		name: String!
		review: String!
		rating: Float!
	}

	type Query {
		users: [User]!
		user(_id: ID!): User
		me: User
		pets: [Pet]!
		pet(_id: ID!): Pet
		reviews: [Review]!
	}
	
	type Mutation {
		addUser(user: UserInput): Auth
		updateUser(user: UserInput): User
		login(email: String!, password: String!): Auth
		addFriend(friendId: ID!): User
		removeFriend(friendId: ID!): User
		addPet(pet: PetInput): PetOwner
		removePet(petId: ID!): User
		updatePet(pet: PetInputUpdate): Pet
		addReview(review: ReviewInput): Review
	}
`;

module.exports = typeDefs;
