const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Review } = require('../models');
const { signToken } = require('../utils/auth');
const dateScalar = require('./custom_scalar/Date');

const resolvers = {
	Date: dateScalar,
	Query: {
		users: async () => {
			try {
				const users = await User.find().populate([
					{
						path: 'friends',
						populate: {
							// Get friends pets
							path: 'pets'
						}
					},
					{
						path: 'pets'
					},
				]);
				
				return users;
			}
			catch (err) {
				console.log(err);
				throw new Error(err);
			}
		},
		user: async (parent, { _id }) => {
			return await User.findById(_id);
		},
		me: async (parent, args, context) => {
			if (context.user) {
				return await User.findOne({ _id: context.user._id }).populate([
					{
						path: 'friends',
						populate: {
							// Get friends pets
							path: 'pets'
						}
					},
					{
						path: 'pets'
					},
				]);
			}
			
			throw new AuthenticationError('You need to be logged in!');
		},
		pets: async () => {
			return await Pet.find();
		},
		pet: async (parent, { _id }) => {
			return await Pet.findById(_id);
		},
		reviews: async () => {
			return await Review.find();
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args.user);
			const token = signToken(user);
			
			return { token, user };
		},
		updateUser: async(parent, { user }, context) => {
			if (context.user) {
				const userData = User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						...user
					},
					{
						new: true
					}
				);

				return userData;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email }).populate([
				{
					path: 'friends',
					populate: {
						// Get friends pets
						path: 'pets'
					}
				},
				{
					path: 'pets'
				},
			]);
			
			const a = JSON.parse(JSON.stringify(user));
			
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
						$push: {
							friends: friend._id
						}
					},
					{
						new: true
					}
				).populate([
					{
						path: 'friends',
						populate: {
							// Get friends pets
							path: 'pets'
						}
					},
					{
						path: 'pets'
					},
				]);
			}
			
			throw new AuthenticationError("You need to be logged in!");
		},
		removeFriend: async (parent, { friendId }, context) => {
			if (context.user) {
				// attempts to find the friend by the id given
				const friend = await User.findById(friendId);

				if (!friend) {
					throw new Error(`No user (friend) found by id ${friendId}`);
				}

				return User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$pull: {
							friends: friendId
						}
					},
					{
						new: true
					}
				).populate([
					{
						path: 'friends',
						populate: {
							// Get friends pets
							path: 'pets'
						}
					},
					{
						path: 'pets'
					},
				]);
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
		updatePet: async (parent, { pet: { _id, name, breed, birthday, imageFilePath } }, context) => {
			if (context.user) {
				const pet = Pet.findOneAndUpdate(
					{ _id: _id },
					{
						name,
						birthday,
						breed,
						imageFilePath
					},
					{
						new: true
					}
				);
				
				return pet;
			}
			
			throw new AuthenticationError("You need to be logged in!");
		},
		addReview: async (parent, args, context) => {
			const review = await Review.create(args.review);

			return review;
		},
	}
};

module.exports = resolvers;
