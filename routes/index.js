var express = require('express');
const app = express();

var Model = require('../model/index');

const routes = express.Router();

routes.post('/create', async (req, res) => {
	const data = new Model({
		name: req.body.name,
		email: req.body.email,
		age: req.body.age,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: e });
	}
});

routes.get('/all-users', async (req, res) => {
	try {
		var data = await Model.find();
		res.json(data);
	} catch (e) {
		res.status(400).json({ message: e });
	}
});

routes.get('/by-id/:id', async (req, res) => {
	try {
		var data = await Model.findById(req.params.id);
		res.json(data);
	} catch (e) {
		res.status(400).json({ message: e });
	}
});

routes.patch('/by-id/:id', async (req, res) => {
	try {
		var data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(data);
	} catch (e) {
		res.status(400).json({ message: e });
	}
});

// app.route().post((req, res) => createUser(req, res));

module.exports = routes;
