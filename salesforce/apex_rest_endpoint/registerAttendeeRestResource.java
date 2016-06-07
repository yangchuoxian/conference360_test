// url example: 'https://instance.salesforce.com/services/apexrest/conference360/register_attendee'
@RestResource(urlMapping= '/conference360/register_attendee/*')
global with sharing class RegisterAttendeeRestResource {
    @HttpPost
    global static String registerAttendee(
        String company, 
        String email, 
        String first_name, 
        String last_name, 
        String phone, 
        String eventId, 
        String[] sessionIds) {

        // create new attendee
        conference360_attendee__c attendee = new conference360_attendee__c(
            company__c = company,
            email__c = email,
            first_name__c = first_name,
            last_name__c = last_name,
            phone__c = phone
        );
        insert attendee;

        conference360_event__c event = [SELECT Id,title__c,start__c,remaining_seats__c FROM conference360_event__c WHERE Id =: eventId LIMIT 1];
        if (event != null) {
            // register this new attendee for the given event
            conference360_event_attendee__c eventAttendeeRelationship = new conference360_event_attendee__c(
                event__c = eventId,
                attendee__c = attendee.Id
            );
            insert eventAttendeeRelationship;
            // update the remaining seats for this event
            event.remaining_seats__c -= 1;
            if (event.remaining_seats__c == 0) {
                event.status__c = 'Sold Out';
            }
            update event;
        }
        conference360_session__c[] sessions = [SELECT Id,title__c,start__c,remaining_seats__c FROM conference360_session__c WHERE Id IN :sessionIds];
        // register this new attendee for the given sessions
        for (conference360_session__c session : sessions) {
            conference360_session_attendee__c sessionAttendeeRelationship = new conference360_session_attendee__c(
                session__c = session.Id,
                attendee__c = attendee.Id
            );
            insert sessionAttendeeRelationship;
            // update the remaining seats for this session
            session.remaining_seats__c -= 1;
            if (session.remaining_seats__c == 0) {
                session.status__c = 'Sold Out';
            }
            update session;
        }

        // send notify email of successful event/session(s) registration
        if (event != null) {
            // send email with registered event and sessions info to the new attendee
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {attendee.email__c};
            mail.setToAddresses(toAddresses);
            // Specify the address used when the recipients reply to the email.
            mail.setReplyTo('ycx.demo@gmail.com');
            // Specify the name used as the display name.
            mail.setSenderDisplayName('Salesforce Support');
            // Specify the subject line for your email address.
            mail.setSubject('Registration succeeded');
            // Set to True if you want to BCC yourself on the email.
            mail.setBccSender(false);
            mail.setUseSignature(false);

            String htmlBodyContent = '<div>You have registered Event: </div>';
            htmlBodyContent += '<h3>' + event.title__c + '</h3>';
            htmlBodyContent += '<div style="font-size:0.8em;color:gray;">' + event.start__c.format() + '</div>';

            Integer index = 0;
            for (conference360_session__c session : sessions) {
                if (index == 0) {
                    htmlBodyContent += '<br><br><div> and Session:</div>';
                }
                htmlBodyContent += '<h4>' + session.title__c + '</h4>';
                htmlBodyContent += '<div style="font-size:0.8em;color:gray;">' + session.start__c.format() + '</div>';
        
                index ++;
            }
            mail.setHtmlBody(htmlBodyContent);
            // Send the email you have created.
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }

        return attendee.Id;
    }
}