const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
	first_name: {
		required: true,
		type: String,
	},
	last_name: {
		required: false,
		type: String,
	},
	dob: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
});

module.exports = mongoose.model('Register', registerSchema);
