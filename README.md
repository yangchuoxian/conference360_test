Conference360_test README_
The project folder contains 3 main parts
* frontend ——— angular2 app folder
* server ———— expressJS 4 app folder
* salesforce ——- salesforce APEX source code(classes and triggers)

======================= Salesforce =======================
Created SObjects/tables:
* conference360_event
* conference360_session
* conference360_attendee 
* conference360_event_attendee  (many-to-many relationship between events and attendees)
* conference360_session_attendee (many-to-many relationship between sessions and attendees)
Added two APEX classes
* RegisterAttendeeRestResource — Serves as a custom REST API for attendee registrations. It
	* first accepts the following as http POST parameters:
		* attendee information including company, email, last name, first name and phone, 
		* the event id this new attendee tends to register and 
		* one or more session ids that belong to this event the new attendee tends to register as well
	* then creates the new attendee SObject, and the event-attendee relationship SObject, and several session-attendee relationship SObjects if one or more session ids are provided
	* finally sends an email to the attendee with registered event info and registered sessions info if any.
* GetEventsRestResource — Serves as a custom REST API to retrieve events and also the pagination info. The http method is GET, depending on the parameters included in the request URL, this API can get
	* events sorted by start date and the number of total events
	* events with title containing user designated search keyword sorted by start date and the number of events meeting this search condition
	* events with specific status sorted by start date and the number of events meeting this status condition
Apex trigger source code can be found under salesforce/triggers/ but didn’t get activated in Salesforce.com

========================= Express =========================
The backend app utilizes MVC design pattern with some common tasks extracted as services. It uses express-session for user login, and redis database to save salesforce oauth access token.
The folder structure of the backend ExpressJS app looks like this:
* server
	* app.js - the main node.js file, all routes reside here
	* config
		* constants.js - some global constants such as salesforce URLs, pagination constants, salesforce user credentials to get access token and etc
	* controllers
		* AttendeeController.js
			- With user entered information, send http POST request to salesforce.com to create a new attendee and registers the attendee to desired event and sessions 
		* EventController.js
			- get events and pagination info based on user actions, can either be searching events, getting events with specific status or getting events with no specific criteria, all 3 types of query results are ordered chronologically
			- given an event id, retrieve all its sessions from salesforce.com
			- create new events for logged in salesforce user
		* SalesforceUserController.js
			- handles salesforce user login, post the entered email/password to salesforce.com to get access token and save it in Redis database for later use
			- validates if a user has logged in as salesforce user by checking if his/her salesforce email exists in express-session
		* SessionController.js — session related instructions
		* ViewController.js — renders the index.html view
* services
	* EventService.js — help fetch events data and pagination info from salesforce.com response
	* SessionService.js — help fetch sessions data and pagination info from salesforce.com response
	* Toolbox.js
		- http get method
		- http post method with form data
		- http post method with JSON data
		- get salesforce access token with developer user credential and save it in local reds database
		- get salesforce access token for a logged in salesforce user and save the token with the logged in salesforce user email in local reds database

================== Angular2/Angular2-material ==================
The front-end app uses Angular2 and Angular2-material. Given that angular2-material is not yet production-ready, some external libraries are used here, to be specific:
* bootstrap.css — Angular2-material grid-list cannot make responsive layout at the time, so bootstrap grid layout is used here for responsive layout to support multiple screen sizes. Only the stylesheet, no bootstrap.js, no jquery.js are imported.
* Tinymce — a rich text/WYSIWYG editor, related angular2 component is implemented as well
* webpack — systemjs in Angular2 is replaced by webpack to reduce the number of http requests when loading the page. The generated minified bundle.js file resides in dist/bundle.js
The front-end app folder structure looks like this:
* index.html — the entry html view
* main.ts — the bootstrap file for Angular2
* components
	* app.component — the root app component
	* datepicker.component — a custom date picker input component
	* editor.component — editor component to make Tinymce editor compatible with Angular2
	* event_basic_info.component — a small card view that shows event basic info
	* event_details.component — the event details component that shows the details of the event and contains session basic info components if any and a new attendee form component  
	*  event_list.component —_ the event list component contains multiple event_basic_info components and a pagination component
	* login.component — when user wants to create new event, the backend checked if the user is logged in as a salesforce user, if not, he/she will be prompted with this login view to login as a salesforce user first before he/she can create new event
	* pagination.component — the pagination component that contains at most 5 buttons with different page index
	* session_basic_info.component — the session basic info card view component
	* new_attendee.component — the new attendee form component_
* models
	* attendee.model — the attendee model class
	* event.model — the event model class
	* session.model — the session model class
* services
	* event.service — interface for event CRUD instructions
	* attendee.service — interface for attendee CRUD instructions
	* salesforce_user.service — interface for salesforce user login and validates if the current user is logged in as salesforce user_
	* session.service — interface to get sessions that belong to a specific event
	* state.service — a singleton service that remembers the app state/route and notifies the root app to go to different routes upon user action
	* toolbox.service — some general functions
* config
	* constants.ts — some global constants
	* environment.ts — whether current environment is development or production
* templates — all corresponding html views of the components reside in here
* styles
	* styles.css — all css styles reside in here
