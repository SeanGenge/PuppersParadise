const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models');
const { signToken } = require('../utils/auth');
const dateScalar = require('./custom_scalar/Date');

const resolvers = {
	Date: dateScalar,
	Query: {
		users: async () => {
			return User.find().populate('friends').populate('pets');
		},
		user: async (parent, { _id }) => {
			return User.findById(_id);
		},
		pets: async () => {
			return Pet.find();
		},
		pet: async (parent, { _id }) => {
			return Pet.findById(_id);
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args.user);
			const token = signToken
			
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email: email });
			
			if (!user) {
				throw AuthenticationError("No user found with this email address!");
			}
			
			const correctPw = await user.checkPassword(password);
			
			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials!");
			}
			
			const token = signToken(user);
			
			return { token, user };
		},
		addFriend: async (parent, { friendId }, context) => {
			if (context.user) {
				// attempts to find the friend by the id given
				const friend = await User.findById(friendId);
				
				if (!friend) {
					throw new Error(`No user (friend) found by id ${friendId}`);
				}
				
				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$addToSet: {
							friends: { ...friend }
						}
					},
					{
						new: true
					}
				);
			}
			
			throw new AuthenticationError("You need to be logged in!");
		},
		addPet: async (parent, args, context) => {
			
			if (context.user) {
				const pet = await Pet.create(args.pet);
				
				if (!pet) {
					throw new Error(`Error creating pet!`);
				}
				
				// Add the pet to the owner
				const owner = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$addToSet: {
							pets: { ...pet }
						}
					},
					{
						new: true
					}
				).populate('pets');
				
				return { owner, pet };
			}
			
			throw new AuthenticationError("You need to be logged in!");
		},
		removePet: async (parent, args, context) => {
			if (context.user) {
				// Remove the pet
				const pet = await Pet.findOneAndDelete(
					{ _id: args.petId }
				);
				
				// Remove the pet id from the owner
				const owner = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$pull: {
							pets: pet._id
						}
					},
					{
						new: true
					}
				).populate('pets');

				return owner;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		updatePet: async (parent, { pet: { _id, name, birthday } }, context) => {
			if (context.user) {
				const pet = Pet.findOneAndUpdate(
					{ _id: _id },
					{
						name,
						birthday
					},
					{
						new: true
					}
				);
				
				return pet;
			}
			
			throw new AuthenticationError("You need to be logged in!");
		}
	}
};

module.exports = resolvers;
