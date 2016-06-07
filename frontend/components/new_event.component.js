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
var common_1 = require('@angular/common');
// angular2 material dependencies
var input_1 = require('@angular2-material/input');
var button_1 = require('@angular2-material/button');
var progress_bar_1 = require('@angular2-material/progress-bar');
// custom components
var editor_component_1 = require('./editor.component');
var datepicker_component_1 = require('./datepicker.component');
// custom models
var event_model_1 = require('../models/event.model');
// custom services
var event_service_1 = require('../services/event.service');
var NewEventComponent = (function () {
    function NewEventComponent(eventService) {
        this.eventService = eventService;
        this.hasCreationFailed = false;
        this.isCreatingNewEvent = false;
    }
    NewEventComponent.prototype.ngOnInit = function () {
        this.event = new event_model_1.Event();
    };
    NewEventComponent.prototype.descriptionChanged = function (changedDescription) {
        this.event.description = changedDescription;
    };
    NewEventComponent.prototype.createNewEvent = function () {
        var _this = this;
        this.hasCreationFailed = false;
        this.creationHintMessage = null;
        // make sure all fields are entered
        if (!this.event.title ||
            !this.event.image_url ||
            !this.event.start ||
            !this.event.end ||
            !this.event.status ||
            !this.event.registration_limit ||
            !this.event.remaining_seats ||
            !this.event.description) {
            this.hasCreationFailed = true;
            this.creationHintMessage = 'Please enter all field';
            return;
        }
        this.isCreatingNewEvent = true;
        this.eventService.createNewEvent(this.event).subscribe(function (data) {
            // clear user input
            _this.event = new event_model_1.Event();
            _this.isCreatingNewEvent = false;
            _this.hasCreationFailed = false;
            _this.creationHintMessage = 'New event successfully created';
        }, function (error) {
            _this.isCreatingNewEvent = false;
            _this.hasCreationFailed = true;
            _this.creationHintMessage = 'New event creation failed';
        });
    };
    NewEventComponent = __decorate([
        core_1.Component({
            selector: 'new-event',
            templateUrl: 'frontend/templates/new_event.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [editor_component_1.EditorComponent, input_1.MD_INPUT_DIRECTIVES, datepicker_component_1.DatePicker, common_1.FORM_DIRECTIVES, button_1.MD_BUTTON_DIRECTIVES, progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES],
            providers: [editor_component_1.EditorComponent, event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], NewEventComponent);
    return NewEventComponent;
}());
exports.NewEventComponent = NewEventComponent;
//# sourceMappingURL=new_event.component.js.map