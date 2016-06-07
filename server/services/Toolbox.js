var promise = require('bluebird');
var request = promise.promisifyAll(require('request'));
var redis = require('redis');
var constants = require('../config/constants.js');

var httpGet = function(url, headers, body) {
	return request.getAsync({
		url: url,
		headers: headers,
		form: body
	}).then(function(httpResponse, body) {
		if (httpResponse.statusCode == 200) {
			return promise.resolve(httpResponse.body);
		} else if (httpResponse.statusCode == 401) {
			return promise.reject({
				statusCode: 401,
				message: 'access token invalid or expired'
			});
		} else {
			return promise.reject({
				statusCode: 500,
				message: httpResponse.body[0].message
			});
		}
	}).catch(function(err) {
		return promise.reject(err);	
	});
};
var httpPostWithForm = function(url, headers, body) {
	return request.postAsync({
		url: url,
		headers: headers,
		form: body
	}).then(function(httpResponse, body) {
		if (httpResponse.statusCode == 200 || httpResponse.statusCode == 201) {
			return promise.resolve(httpResponse.body);
		} else if (httpResponse.statusCode == 401) {
			return promise.reject({
				statusCode: 401,
				message: 'access token invalid or expired'
			});
		} else {
			return promise.reject({
				statusCode: 500,
				message: httpResponse.body[0].message
			});
		}
	}).catch(function(err) {
		return promise.reject(err);	
	});
};
var httpPostWithJson = function(url, headers, body) {
	return request.postAsync({
		url: url,
		headers: headers,
		json: body
	}).then(function(httpResponse, body) {
		if (httpResponse.statusCode == 200 || httpResponse.statusCode == 201) {
			return promise.resolve(httpResponse.body);
		} else if (httpResponse.statusCode == 401) {
			return promise.reject({
				statusCode: 401,
				message: 'access token invalid or expired'
			});
		} else {
			return promise.reject({
				statusCode: 500,
				message: httpResponse.body[0].message
			});
		}
	}).catch(function(err) {
		return promise.reject(err);	
	});
};
var oauthHttpGet = function(url) {
	return getAccessToken()
	.then(function(accessToken) {
		return httpGet(url, {'Authorization': 'Bearer ' + accessToken});
	}).then(function(response) {
		return promise.resolve(response);
	}).catch(function(err) {
		if (err.statusCode == 401) {
			// access token is expired, retrieve the access token again from remote salesforce server
			return retrieveAccessTokenFromRemoteServer()
			.then(function(accessToken) {
				return httpGet(url, {'Authorization': 'Bearer ' + accessToken});
			}).then(function(response) {
				return promise.resolve(fetchedData);	
			}).catch(function(err) {
				return promise.reject({
					statusCode: 500,
					message: err.message
				});
			});
		} else {
			return promise.reject({
				statusCode: 500,
				message: err.message
			});
		}
	});
};
var oauthHttpPost = function(url, body) {
	return getAccessToken()
	.then(function(accessToken) {
		return httpPostWithJson(url, {'Authorization': 'Bearer ' + accessToken}, body);
	}).then(function(response) {
		return promise.resolve(response);
	}).catch(function(err) {
		if (err.statusCode == 401) {
			// access token is expired, retrieve the access token again from remote salesforce server
			return retrieveAccessTokenFromRemoteServer()
			.then(function(accessToken) {
				return httpPostWithJson(url, {'Authorization': 'Bearer ' + accessToken}, body);
			}).then(function(response) {
				return promise.resolve(fetchedData);	
			}).catch(function(err) {
				return promise.reject({
					statusCode: 500,
					message: err.message
				});
			});
		} else {
			return promise.reject({
				statusCode: 500,
				message: err.message
			});
		}
	});
};
var retrieveAccessTokenFromRemoteServer = function() {
	return httpPostWithForm(constants.salesforceOauthUrl, {}, {
		grant_type: "password",
		client_id: constants.salesforceClientID,
		client_secret: constants.salesforceClientSecret,
		username: constants.salesforceUsername,
		password: constants.salesforcePassword
	}).then(function(response) {
		var accessToken = JSON.parse(response).access_token;
		var client = redis.createClient();
		client.auth(constants.redisPass);
		client.set('access_token', accessToken);
		client.quit();
		return promise.resolve(accessToken);
	}).catch(function(err) {
		return promise.reject('Retrieve access token failed');
	});
};
var getAccessToken = function() {
	// first try to get access token from redis database
	var client = redis.createClient();
	client.auth(constants.redisPass);
	client.get = promise.promisify(client.get);
	return client.get('access_token')
	.then(function(reply) {
		client.quit();
		if (!reply) {
			// access token not exists in redis database, now get it from salesforce
			return retrieveAccessTokenFromRemoteServer();
		} else {
			// access token exists in redis database
			return promise.resolve(reply);
		}
	}).catch(function(err) {
		return promise.reject('Get access token failed');
	});
};
var getAccessTokenForLoggedInSalesforceUser = function(loggedSalesforceUser) {
	if (!loggedSalesforceUser) {
		return promise.reject('No user');
	}
	var client = redis.createClient();
	client.auth(constants.redisPass);
	client.get = promise.promisify(client.get);
	return client.get(loggedSalesforceUser)
	.then(function(reply) {
		if (!reply) {
			return promise.reject('No access token in local database');
		} else {
			return promise.resolve(reply);
		}
	}).catch(function(err) {
		return promise.reject(err);
	});
};
module.exports = {
	httpGet: httpGet,
	httpPostWithForm: httpPostWithForm,
	httpPostWithJson: httpPostWithJson,
	oauthHttpGet: oauthHttpGet,
	oauthHttpPost: oauthHttpPost,
	getAccessToken: getAccessToken,	
	retrieveAccessTokenFromRemoteServer: retrieveAccessTokenFromRemoteServer,
	getAccessTokenForLoggedInSalesforceUser: getAccessTokenForLoggedInSalesforceUser
};