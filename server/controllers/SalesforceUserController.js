var constants = require('../config/constants.js');
var httpService = require('../services/HttpService.js');
var eventService = require('../services/EventService.js');
var promise = require('bluebird');
var redis = require('redis');

module.exports = {
	submitLogin: function(req, res) {
		var salesforceEmail	= req.body.email;
		var password = req.body.password;

		return httpService.httpPostWithForm(constants.salesforceOauthUrl, {}, {
			grant_type: "password",
			client_id: constants.salesforceClientID,
			client_secret: constants.salesforceClientSecret,
			username: salesforceEmail,
			password: password
		}).then(function(response) {
			var accessToken = JSON.parse(response).access_token;
			client = redis.createClient();
			client.auth(constants.redisPass);
			client.set(salesforceEmail, accessToken);
			client.quit();
			// save the successfully logged in user in session
			req.session.loggedInSalesforceEmail = salesforceEmail;
			return res.send('ok');
		}).catch(function(err) {
			return res.status(403).send('Retrieve access token failed');
		});
	},
	hasUserLoggedIn: function(req, res) {
		if (req.session.loggedInSalesforceEmail) {
			return res.send('ok');
		} else {
			return res.status(403).send('User not logged in');
		}
	}
};