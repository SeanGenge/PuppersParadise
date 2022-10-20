const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate('friends');
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args.user);
			const token = signToken
			
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			
			if (!user) {
				throw AuthenticationError("No user found with this email address!");
			}
			
			const correctPw = await user.isCorrectPassword(password);
			
			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials!");
			}
			
			const token = signToken(user);
			
			return { token, user };
		},
		addFriend: async (parent, { friendId }, context) => {
			context.user = await User.findById("6350e46e7934b80056cf5da4");
			
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
		}
	}
};

module.exports = resolvers;
