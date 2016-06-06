var constants = require('../config/constants.js');
var httpService = require('../services/HttpService.js');
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
		var baseQueryString = 'SELECT id,title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c,description__c,image_url__c from conference360_event__c';
		// query with specific criteria
		var whereClauseString = '';
		// order the query results by start datetime
		var orderByString = ' ORDER BY start__c ASC';
		// get paginated query results
		var paginationString = ' LIMIT ' + constants.itemsPerPage + ' OFFSET ' + (currentPage - 1) * constants.itemsPerPage;
		var queryString = '';
		if (keyword) {
			// searching events
			whereClauseString = " WHERE title__c LIKE '%" + keyword + "%' AND status__c != 'Draft'";
		} else if (eventStatus) {
			// retrieving events based on event status
			whereClauseString = " WHERE status__c = '" + eventStatus + "'";
		} else {
			whereClauseString = " WHERE status__c != 'Draft'";
		}
		queryString = baseQueryString + whereClauseString + orderByString + paginationString;
		// retrieving events without any specific criteria	
		return httpService.oauthHttpGet(constants.salesforceQueryUrl + encodeURIComponent(queryString))
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
		return httpService.oauthHttpGet(constants.salesforceQueryUrl + encodeURIComponent(queryString))
		.then(function(response) {
			var fetchedData = eventService.fetchEventsFromBulkResponse(response);
			return res.send(fetchedData);
		}).catch(function(err) {
			return res.status(500).send(err);
		});
	}
};