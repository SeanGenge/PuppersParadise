const { Schema, model } = require('mongoose');

const petSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	breed: {
		type: String,
		required: true,
		trim: true,
	},
	birthday: {
		type: Date,
		trim: true,
	},
});

const Pet = model('pet', petSchema);

module.exports = Pet;
