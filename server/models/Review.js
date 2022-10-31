const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	review: {
		type: String,
		required: true,
		trim: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 0,
	},
});

const Review = model('review', reviewSchema);

module.exports = Review;
