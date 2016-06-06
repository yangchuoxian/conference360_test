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
var card_1 = require('@angular2-material/card');
// custom models
var event_model_1 = require('../models/event.model');
// custom services
var state_service_1 = require('../services/state.service');
var toolbox_service_1 = require('../services/toolbox.service');
// config
var constants_1 = require('../config/constants');
var EventBasicInfoComponent = (function () {
    function EventBasicInfoComponent(stateService, toolbox) {
        this.stateService = stateService;
        this.toolbox = toolbox;
    }
    EventBasicInfoComponent.prototype.ngOnInit = function () {
        this.startDateTimeString = this.toolbox.formatDate(this.event.start);
        this.endDateTimeString = this.toolbox.formatDate(this.event.end);
    };
    EventBasicInfoComponent.prototype.showEventDetails = function () {
        // change state info in singleton stateService to notify AppComponent to change route
        this.stateService.params = this.event;
        this.stateService.setState(constants_1.constants.eventDetailsState);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', event_model_1.Event)
    ], EventBasicInfoComponent.prototype, "event", void 0);
    EventBasicInfoComponent = __decorate([
        core_1.Component({
            selector: 'event-basic-info',
            templateUrl: 'frontend/templates/event_basic_info.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [card_1.MD_CARD_DIRECTIVES],
            providers: [event_model_1.Event, toolbox_service_1.Toolbox]
        }), 
        __metadata('design:paramtypes', [state_service_1.StateService, toolbox_service_1.Toolbox])
    ], EventBasicInfoComponent);
    return EventBasicInfoComponent;
}());
exports.EventBasicInfoComponent = EventBasicInfoComponent;
//# sourceMappingURL=event_basic_info.component.js.map