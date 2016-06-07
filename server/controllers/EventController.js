var constants = require('../config/constants.js');
var toolbox = require('../services/Toolbox.js');
var eventService = require('../services/EventService.js');
var promise = require('bluebird');

module.exports = {
	getEvents: function(req, res) {
		var keyword = req.query.keyword;
		var eventStatus = req.query.status;
		var currentPage = req.query.page;
		if (!currentPage) {
			currentPage = 1;
		}
		var url = constants.salesforceGetEventsUrl;
		if (keyword) {
			// searching events
			url += '?keyword=' + keyword + '&page=' + currentPage + '&itemsPerPage=' + constants.itemsPerPage;
		} else if (eventStatus) {
			// retrieving events based on event status
			url += '?status=' + eventStatus + '&page=' + currentPage + '&itemsPerPage=' + constants.itemsPerPage;
		} else {
			url += '?page=' + currentPage + '&itemsPerPage=' + constants.itemsPerPage;
		}
		// retrieving events without any specific criteria	
		return toolbox.oauthHttpGet(url)
		.then(function(response) {
			var fetchedData = eventService.fetchEventsFromBulkResponse(response);
			return res.send(fetchedData);
		}).catch(function(err) {
			return res.status(500).send(err);
		});
	},
	// parent and children relationship SOQL query
	getEventAndItsSessions: function(req, res) {
		var eventID = req.query.id;
		var queryString = "SELECT title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c,description__c, (SELECT title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c from conference360_session__r) from conference360_event__c WHERE Id='" + eventID + "'";
		return toolbox.oauthHttpGet(constants.salesforceQueryUrl + encodeURIComponent(queryString))
		.then(function(response) {
			var fetchedData = eventService.fetchEventsFromBulkResponse(response);
			return res.send(fetchedData);
		}).catch(function(err) {
			return res.status(500).send(err);
		});
	},
	createNewEvent: function(req, res) {
		var event = req.body.event;
		var newEvent = {
			title__c: event.title,
			status__c: event.status,
			start__c: event.start,
			end__c: event.end,
			image_url__c: event.image_url,
			registration_limit__c: event.registration_limit,
			remaining_seats__c: event.remaining_seats,
			description__c: event.description
		};
		var loggedSalesforceUser = req.session.loggedInSalesforceEmail;
		if (!loggedSalesforceUser) {
			return res.status(403).send('User not logged in');
		}
		return toolbox.getAccessTokenForLoggedInSalesforceUser(loggedSalesforceUser)
		.then(function(accessToken) {
			return toolbox.httpPostWithJson(constants.salesforceCreateEventUrl, {'Authorization': 'Bearer ' + accessToken}, newEvent);
		}).then(function(response) {
			return res.send('ok');
		}).catch(function(err) {
			return res.status(403).send(err);
		});
	},
	test: function(req, res) {
		return toolbox.oauthHttpPost(constants.salesforceRegisterAttendeeUrl, {
			company: 'someCompany',
			email: 'yangchuoxian.appdev@gmail.com',
			first_name: 'cx',
			last_name: 'y',
			phone: '18780803115',
			eventId: 'Google Angular IO',
			sessionIds: ['whatsoever']
		}).then(function(response) {
			return res.send(response);
		}).catch(function(err) {
			return res.status(500).send(err);
		});
	}
};