const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please add a username'],
		unique: true
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		match: [/.+@.+\..+/, 'Please enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please add a password']
	}
}, {
	timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
	// only hash if password is new or modified
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});


userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);