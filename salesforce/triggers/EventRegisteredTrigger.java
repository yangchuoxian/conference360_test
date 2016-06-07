trigger EventRegisteredTrigger on conference360_event_attendee__c (after insert) {
    conference360_attendee__c attendee;
    conference360_event__c event;
    for (conference360_event_attendee__c eventAttendeeRelationship : Trigger.New) {
        // get the new attendee
        if (attendee == null) {
            attendee = [SELECT Id, email__c FROM conference360_attendee__c WHERE Id =: eventAttendeeRelationship.attendee__c LIMIT 1];
        }
        // get registered event
        if (event == null) {
            event = [SELECT Id, status__c, title__c, start__c, end__c, registration_limit__c, remaining_seats__c FROM conference360_event__c WHERE Id =: eventAttendeeRelationship.event__c LIMIT 1];
        }
    }

    // update the remaining seats and/or status depending on if there are any seats left for the registered event
    event.remaining_seats__c -= 1;
    if (event.remaining_seats__c == 0) {
        event.status__c = 'Sold Out';
    }
    update event;

    // send notify email of successful session registration
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

        mail.setHtmlBody(htmlBodyContent);
        // Send the email you have created.
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}