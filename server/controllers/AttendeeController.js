var constants = require('../config/constants.js');
var httpService = require('../services/HttpService.js');
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
		var newAttendeeId = '';
		// create new attendee
		return httpService.oauthHttpPost(constants.salesforceCreateAttendeeUrl, newAttendee)
		.then(function(response) {
			// now register the new created attendee to the event
			newAttendeeId = response.id;
			return httpService.oauthHttpPost(constants.salesforceCreateEventAndAttendeeRelationUrl, {
				attendee__c: newAttendeeId,
				event__c: eventId
			});
		}).then(function(response) {
			if (sessionIds.length > 0) {
				// the user has selected one or more session to register as well, now register the new created attendee to the selected sessions
				var selectedSessionsForAttendeeRecords = [];
				for (var i = 0; i < sessionIds.length; i ++) {
					selectedSessionsForAttendeeRecords.push({
						attributes: {
							type: 'conference360_session_attendee__c',
							referenceId: 'ref' + i
						},
						attendee__c: newAttendeeId,
						session__c: sessionIds[i]
					});
				}
				return httpService.oauthHttpPost(constants.salesforceCreateMultipleSessionsAndAttendeeRelationUrl, {records: selectedSessionsForAttendeeRecords});
			} else {
				return promise.resolve(response);
			}
		}).then(function(response) {
			return res.send(response);
		}).catch(function(err) {
			return res.status(500).send(err);
		});	
	},
};
