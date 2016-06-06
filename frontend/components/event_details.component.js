"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// angular2-material
var button_1 = require('@angular2-material/button');
var grid_list_1 = require('@angular2-material/grid-list');
var progress_bar_1 = require('@angular2-material/progress-bar');
var card_1 = require('@angular2-material/card');
// custom models
var event_model_1 = require('../models/event.model');
var session_model_1 = require('../models/session.model');
// custom services
var state_service_1 = require('../services/state.service');
var session_service_1 = require('../services/session.service');
var toolbox_service_1 = require('../services/toolbox.service');
// custom components
var session_basic_info_component_1 = require('./session_basic_info.component');
var new_attendee_component_1 = require('./new_attendee.component');
var EventDetailsComponent = (function () {
    function EventDetailsComponent(stateService, toolbox, sessionService) {
        this.stateService = stateService;
        this.toolbox = toolbox;
        this.sessionService = sessionService;
        this.isFetchingDataFromServer = false;
    }
    EventDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.event = this.stateService.params;
        this.startDateTimeString = this.toolbox.formatDate(this.event.start);
        this.endDateTimeString = this.toolbox.formatDate(this.event.end);
        // Retrieve sessions for this event from server
        this.sessions = [];
        this.isFetchingDataFromServer = true;
        this.sessionService.getSessionsForEvent(this.event.Id).subscribe(function (sessions) {
            _this.isFetchingDataFromServer = false;
            _this.sessions = sessions;
        }, function (error) { return _this.errorMessage = error; });
        this.selectedSessionIds = [];
    };
    EventDetailsComponent.prototype.toggleSessionSelection = function (toggledSessionId) {
        var index = this.selectedSessionIds.indexOf(toggledSessionId);
        if (index != -1) {
            // the toggled session id exists in selectedSessionIds and should be now UNSELECTED
            this.selectedSessionIds.splice(index, 1);
        }
        else {
            // the toggled session id does not exist in selectedSessionIds and should be now SELECTED
            this.selectedSessionIds.push(toggledSessionId);
        }
    };
    EventDetailsComponent.prototype.registerAttendee = function () {
    };
    EventDetailsComponent = __decorate([
        core_1.Component({
            selector: 'event-details',
            templateUrl: 'frontend/templates/event_details.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [button_1.MD_BUTTON_DIRECTIVES, grid_list_1.MD_GRID_LIST_DIRECTIVES, progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES, card_1.MD_CARD_DIRECTIVES, session_basic_info_component_1.SessionBasicInfoComponent, new_attendee_component_1.NewAttendeeComponent],
            providers: [event_model_1.Event, session_model_1.Session, toolbox_service_1.Toolbox, session_service_1.SessionService]
        }), 
        __metadata('design:paramtypes', [state_service_1.StateService, toolbox_service_1.Toolbox, session_service_1.SessionService])
    ], EventDetailsComponent);
    return EventDetailsComponent;
}());
exports.EventDetailsComponent = EventDetailsComponent;
//# sourceMappingURL=event_details.component.js.map