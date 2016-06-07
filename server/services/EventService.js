var constants = require('../config/constants.js');

module.exports = {
	fetchEventsFromBulkResponse: function(response) {
		response = JSON.parse(response);
		response = JSON.parse(response);
		var totalSize = response.totalSize;
		var events = [];
		for (var i = 0; i < response.records.length; i ++) {
			events.push({
				Id: response.records[i].Id,
				title: response.records[i].title__c,
				status: response.records[i].status__c,
				start: response.records[i].start__c,
				end: response.records[i].end__c,
				registration_limit: response.records[i].registration_limit__c,
				remaining_seats: response.records[i].remaining_seats__c,
				description: response.records[i].description__c,
				image_url: response.records[i].image_url__c
			});
		}
		return {
			totalSize: totalSize,
			itemsPerPage: constants.itemsPerPage,
			events: events
		};
	}
};