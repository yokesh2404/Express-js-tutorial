require('dotenv').config();

var configuration = {};
var serverConfig = {
	localhost: {
		url: 'http://my.site.com',
		//mongodb connection settings
		database: {
			host: 'localhost',
			port: '3000',
			db: process.env.DB_URL,
		},
		//server details
		server: {
			host: 'localhost',
			port: '3000',
		},
	},
	development: {
		//url to be used in link generation
		url: 'http://my.site.com',
		//mongodb connection settings
		database: {
			host: '127.0.0.1',
			port: '27017',
			db: 'site_dev',
		},
		//server details
		server: {
			host: '127.0.0.1',
			port: '3422',
		},
	},
	production: {
		//url to be used in link generation
		url: 'http://my.site.com',
		//mongodb connection settings
		database: {
			host: '127.0.0.1',
			port: '27017',
			db: 'site',
		},
		//server details
		server: {
			host: '192.168.1.41',
			port: '3421',
		},
	},
};
var env = process.env.ENV_MODE || 'development';
configuration = serverConfig[env];

module.exports = configuration;
