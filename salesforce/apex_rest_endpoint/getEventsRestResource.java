// search events url example: 'https://instance.salesforce.com/services/apexrest/conference360/get_events?keyword=someSearchWord&page=1&itemsPerPage=20'
// get events with status url example: 'https://instance.salesforce.com/services/apexrest/conference360/get_events?status=Open&page=1&itemsPerPage=20'
// get events with no specific condition url example: 'https://instance.salesforce.com/services/apexrest/conference360/get_events?page=1&itemsPerPage=20'
@RestResource(urlMapping= '/conference360/get_events/*')
global with sharing class GetEventsRestResource {
    @HttpGet
    global static String doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

        // retrieve http parameters
        Map<String,String> params = req.params;
        String countString, queryString;
        if (params.get('keyword') != null) {
            String keyword = params.get('keyword');
            String page = params.get('page');
            String itemsPerPage = params.get('itemsPerPage');

            Integer offset = (Integer.valueof(page) - 1) * Integer.valueof(itemsPerPage);

            countString = 'SELECT COUNT() FROM conference360_event__c WHERE title__c LIKE \'%' + keyword + '%\' AND status__c != \'Draft\'';
            queryString = 'SELECT id,title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c,description__c,image_url__c FROM conference360_event__c WHERE title__c LIKE \'%' + keyword + '%\' AND status__c != \'Draft\' LIMIT ' + itemsPerPage + 'OFFSET ' + offset;
        } else if (params.get('status') != null) {
            String status = params.get('status');
            String page = params.get('page');
            String itemsPerPage = params.get('itemsPerPage');

            Integer offset = (Integer.valueof(page) - 1) * Integer.valueof(itemsPerPage);

            countString = 'SELECT COUNT() FROM conference360_event__c WHERE status__c = \'' + status + '\'';
            queryString = 'SELECT id,title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c,description__c,image_url__c FROM conference360_event__c WHERE status__c = \'' + status + '\' LIMIT ' + itemsPerPage + ' OFFSET ' + offset;
        } else {
            String page = params.get('page');
            String itemsPerPage = params.get('itemsPerPage');

            Integer offset = (Integer.valueof(page) - 1) * Integer.valueof(itemsPerPage);

            countString = 'SELECT COUNT() FROM conference360_event__c WHERE status__c != \'Draft\'';
            queryString = 'SELECT id,title__c,status__c,start__c,end__c,registration_limit__c,remaining_seats__c,description__c,image_url__c FROM conference360_event__c WHERE status__c != \'Draft\' LIMIT ' + itemsPerPage + ' OFFSET ' + offset;
        }

        Integer count = Database.countQuery(countString);
        SObject[] events = Database.query(queryString);
        String eventsJSONString = JSON.serialize(events);
        String result = '{\"totalSize\":' + count + ',\"records\":' + eventsJSONString + '}';

        return result;
    }
}