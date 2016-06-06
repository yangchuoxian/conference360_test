var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// require controllers
var viewController = require('./controllers/ViewController.js');
var eventController = require('./controllers/EventController.js');
var sessionController = require('./controllers/SessionController.js');
var attendeeController = require('./controllers/AttendeeController.js');

/********************************** Static files **********************************/
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
app.use('/frontend', express.static(path.resolve(__dirname, '../frontend')));
/****************************** End of Static files *******************************/

/********************************** Routes **********************************/
// Event related routes
app.get('/', viewController.renderIndex);
app.get('/get_events', eventController.getEvents);
app.get('/get_event', eventController.getEventAndItsSessions);
// Session related routes
app.get('/get_sessions_for_event', sessionController.getSessionsForEvent);
// Attendee related routes
app.post('/register_user_for_event_and_sessions', attendeeController.registerUserForEventAndSessions);
/******************************* End of Routes ******************************/

app.listen(3000, function () {
	console.log('Conference360_test server app listening on port 3000!');
});