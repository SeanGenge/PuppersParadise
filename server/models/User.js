const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
	},
	friends: [this],
	password: {
		type: String,
		required: true,
		minLength: 5
	}
});

userSchema.pre('save', async function(next) {
	// Check to see if the saved document is a new entry or the password is changed
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	
	next();
});

userSchema.methods.isCorrectPassword = async function(password) {
	// Compare the password with what is in the collection
	return await bcrypt.compare(password, this.password);
}

const User = model('user', userSchema);

module.exports = User;
