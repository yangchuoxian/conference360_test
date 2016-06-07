module.exports = {
	// salesforce urls
	salesforceGetEventsUrl: 'https://ap2.salesforce.com/services/apexrest/conference360/get_events',
	salesforceRegisterAttendeeUrl: 'https://ap2.salesforce.com/services/apexrest/conference360/register_attendee',
	salesforceCreateAttendeeUrl: 'https://ap2.salesforce.com/services/data/v36.0/sobjects/conference360_attendee__c/',
	salesforceCreateEventUrl: 'https://ap2.salesforce.com/services/data/v36.0/sobjects/conference360_event__c/',
	salesforceCreateEventAndAttendeeRelationUrl: 'https://ap2.salesforce.com/services/data/v36.0/sobjects/conference360_event_attendee__c/',
	salesforceCreateMultipleSessionsAndAttendeeRelationUrl: 'https://ap2.salesforce.com/services/data/v36.0/composite/tree/conference360_session_attendee__c/',
	salesforceQueryUrl: 'https://ap2.salesforce.com/services/data/v36.0/query/?q=',
	salesforceOauthUrl: 'https://login.salesforce.com/services/oauth2/token',
	// salesforce credentials
	salesforceClientID: '3MVG9ZL0ppGP5UrDiBM2wIlqdk.6nv3PMWwAooSO4SNUfzvIJcm0RaGdca2nJ6YZ_oJxhrPlkDAjqI5Y3fuo.',
	salesforceClientSecret: '1650007753225855784',
	salesforceUsername: 'ycx.demo@gmail.com',
	salesforcePassword: '12345678ycx',
	// redis credentials
	redisPass: 'jd8kasef0j!@koz*jgpNMuB&*auH1fnw^%hdksz7Jh164yYTHhn*kg361lkaizng7ohlHLIY9piBofhjvk',
	// pagination constants
	itemsPerPage: 20,
	// session password
	sessionPass: 'jljlafnx*l1hlh1331pi',
};
