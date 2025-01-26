var express = require('express');

const routes = express.Router();

const nodemailer = require('nodemailer');

var Model = require('../model/authModel');
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	auth: {
		user: 'gsoft2404@gmail.com',
		pass: 'gkfx gczs xrgq kwdo',
	},
	port: 587,
	ignoreTLS: false,
	secure: false, // upgrades later with STARTTLS -- change this based on the PORT
});
async function sendMail(email) {
	const mailData = {
		from: 'gsoft2404@gmail.com',
		to: email,
		cc: 'gramosoftpvtltd@gmail.com',
		subject: 'Congrats',
		text: 'Welcome dood',
		html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
	};

	await transporter.sendMail(mailData, (error, info) => {
		if (error) {
			return console.log(error);
		}
		// console.log(info);
		// res.status(200).send({ message: "Mail send", message_id: info.messageId });
	});
}

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
			sendMail(req.body.email);
		} else {
			res.status(401).json({ message: 'Passowrd is incorrect' });
		}
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

module.exports = routes;
