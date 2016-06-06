trigger SessionRegisteredTrigger on conference360_session_attendee__c (after insert) {
    conference360_attendee__c attendee;
    conference360_session__c[] sessions = new conference360_session__c[0];
    for (conference360_session_attendee__c sessionAttendeeRelationship : Trigger.New) {
        // get the new attendee
        if (attendee == null) {
            attendee = [SELECT Id, email__c FROM conference360_attendee__c WHERE Id =: sessionAttendeeRelationship.attendee__c LIMIT 1];
        }
        // get the title of each registered session
        conference360_session__c session = [SELECT Id, status__c, title__c, start__c, end__c, registration_limit__c, remaining_seats__c FROM conference360_session__c WHERE Id =: sessionAttendeeRelationship.session__c LIMIT 1];
        sessions.add(session);
    }

    // update the remaining seats and/or status depending on if there are any seats left for each registered session
    for (conference360_session__c session : sessions) {
        session.remaining_seats__c -= 1;
        if (session.remaining_seats__c == 0) {
            session.status__c = 'Sold Out';
        }
        update session;
    }

    // get user registered event
    conference360_event_attendee__c eventAttendeeRelationship = [SELECT event__c FROM conference360_event_attendee__c WHERE attendee__c =: attendee.Id LIMIT 1];
    conference360_event__c event; 
    if (eventAttendeeRelationship != null) {
        event = [SELECT title__c, start__c FROM conference360_event__c WHERE Id =: eventAttendeeRelationship.event__c LIMIT 1];
    }
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
}