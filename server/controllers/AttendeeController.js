var constants = require('../config/constants.js');
var toolbox = require('../services/Toolbox.js');
var promise = require('bluebird');

module.exports = {
	registerUserForEventAndSessions: function(req, res) {
		var eventId = req.body.eventId;
		var sessionIds = req.body.sessionIds;
		var newAttendee = {
			company__c: req.body.attendee.company,
			email__c: req.body.attendee.email,
			first_name__c: req.body.attendee.first_name,
			last_name__c: req.body.attendee.last_name,
			phone__c: req.body.attendee.phone	
		};
		return toolbox.oauthHttpPost(constants.salesforceRegisterAttendeeUrl, {
			company: req.body.attendee.company,
			email: req.body.attendee.email,
			first_name: req.body.attendee.first_name,
			last_name: req.body.attendee.last_name,
			phone: req.body.attendee.phone,
			eventId: req.body.eventId,
			sessionIds: req.body.sessionIds
		}).then(function(response) {
			return res.send(response);
		}).catch(function(err) {
			return res.status(500).send(err);
		});
	},
};
