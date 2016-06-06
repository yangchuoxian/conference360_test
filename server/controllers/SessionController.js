var constants = require('../config/constants.js');
var httpService = require('../services/HttpService.js');
var sessionService = require('../services/SessionService.js');
var promise = require('bluebird');

module.exports = {
	// Given Id of an event, retrieve all of its sessions from remote salesforce server
	getSessionsForEvent: function(req, res) {
		var eventID = req.query.id;
		var queryString = "SELECT Id,title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c,belongs_to_event__c from conference360_session__c WHERE belongs_to_event__c='" + eventID + "' AND status__c = 'Open'";
		return httpService.oauthHttpGet(constants.salesforceQueryUrl + encodeURIComponent(queryString))
		.then(function(response) {
			var fetchedData = sessionService.fetchSessionsFromBulkResponse(response);
			return res.send(fetchedData);
		}).catch(function(err) {
			return res.status(500).send(err);
		});
	}
};