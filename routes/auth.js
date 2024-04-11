var express = require('express');

const routes = express.Router();

var Model = require('../model/authModel');

routes.post('/register', async (req, res) => {
	const dataToSave = new Model({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		dob: req.body.dob,
		email: req.body.email,
		password: req.body.password,
	});
	try {
		const data = await dataToSave.save();
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

routes.post('/login', async (req, res) => {
	try {
		var data = await Model.findOne({ email: req.body.email });

		if (req.body.password === data.password) {
			res.status(200).json(data);
		} else if (req.body.email !== data.email) {
			res.status(401).json({ message: 'Email is incorrect' });
		} else {
			res.status(401).json({ message: 'Passowrd is incorrect' });
		}
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

module.exports = routes;
