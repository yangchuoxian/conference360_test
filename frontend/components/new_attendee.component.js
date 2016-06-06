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
var input_1 = require('@angular2-material/input');
var button_1 = require('@angular2-material/button');
var progress_bar_1 = require('@angular2-material/progress-bar');
// custom models
var attendee_model_1 = require('../models/attendee.model');
// custom services
var attendee_service_1 = require('../services/attendee.service');
var NewAttendeeComponent = (function () {
    function NewAttendeeComponent(attendeeService) {
        this.attendeeService = attendeeService;
        this.isRegisteringNewAttendee = false;
        this.hasRegistrationFailed = false;
        this.hasRegistrationSucceeded = false;
        this.attendee = new attendee_model_1.Attendee();
    }
    NewAttendeeComponent.prototype.registerAttendee = function () {
        var _this = this;
        this.hasRegistrationFailed = false;
        this.hasRegistrationSucceeded = false;
        this.isRegisteringNewAttendee = true;
        this.attendeeService.registerUserForEventAndSessions(this.attendee, this.eventId, this.selectedSessionIds).subscribe(function (data) {
            // clear user input
            _this.attendee = new attendee_model_1.Attendee();
            _this.hasRegistrationSucceeded = true;
            _this.hasRegistrationFailed = false;
            _this.isRegisteringNewAttendee = false;
            _this.registrationHintMessage = 'Registration succeeded';
        }, function (error) {
            _this.hasRegistrationSucceeded = false;
            _this.hasRegistrationFailed = true;
            _this.isRegisteringNewAttendee = false;
            _this.registrationHintMessage = 'Registration failed';
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], NewAttendeeComponent.prototype, "selectedSessionIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewAttendeeComponent.prototype, "eventId", void 0);
    NewAttendeeComponent = __decorate([
        core_1.Component({
            selector: 'new-attendee',
            templateUrl: 'frontend/templates/new_attendee.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [input_1.MD_INPUT_DIRECTIVES, button_1.MD_BUTTON_DIRECTIVES, progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES],
            providers: [attendee_model_1.Attendee, attendee_service_1.AttendeeService]
        }), 
        __metadata('design:paramtypes', [attendee_service_1.AttendeeService])
    ], NewAttendeeComponent);
    return NewAttendeeComponent;
}());
exports.NewAttendeeComponent = NewAttendeeComponent;
//# sourceMappingURL=new_attendee.component.js.map