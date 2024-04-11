require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
const path = require('path');
const route = require('./routes');
const auth = require('./routes/auth');
const config = require('./utiles/config');
const configuration = require('./utiles/config');
const db_url = process.env.DB_URL;

const app = express();

mongoose.connect(db_url);

const db = mongoose.connection;
db.on('error', (err) => {
	console.log(err);
});

db.on('connected', () => {
	console.log('connected');
});

app.use(express.json());
app.use('/api', route);
app.use('/api/auth', auth);
app.listen(configuration.server.port, configuration.server.host, () => {
	console.log('Server Connected' + configuration.server.host);
});
