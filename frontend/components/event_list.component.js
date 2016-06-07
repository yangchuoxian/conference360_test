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
var router_1 = require('@angular/router');
// angular2-material
var input_1 = require('@angular2-material/input');
var progress_bar_1 = require('@angular2-material/progress-bar');
var icon_1 = require('@angular2-material/icon');
var radio_1 = require('@angular2-material/radio');
// custom services
var event_service_1 = require('../services/event.service');
// custom models
var event_model_1 = require('../models/event.model');
// custom components
var pagination_component_1 = require('./pagination.component');
var event_basic_info_component_1 = require('./event_basic_info.component');
var EventListComponent = (function () {
    function EventListComponent(eventService) {
        this.eventService = eventService;
        this.events = [];
    }
    EventListComponent.prototype.ngOnInit = function () {
        this.currentPage = 1;
        this.searchKeyword = null;
        this.currentEventStatus = null;
        this.fetchEvents('/get_events');
    };
    EventListComponent.prototype.getEventsWithStatus = function (status) {
        if (this.currentEventStatus != status) {
            this.currentEventStatus = status;
            this.searchKeyword = null;
            this.fetchEvents('/get_events?status=' + status);
        }
    };
    EventListComponent.prototype.searchEvents = function () {
        if (!this.searchKeyword) {
            return;
        }
        this.currentEventStatus = null;
        this.fetchEvents('/get_events?keyword=' + this.searchKeyword);
    };
    EventListComponent.prototype.changeCurrentPage = function (newPage) {
        this.currentPage = newPage;
        if (this.searchKeyword) {
            // get paginated search results
            this.fetchEvents('/get_events?keyword=' + this.searchKeyword + '&page=' + newPage);
        }
        else if (this.currentEventStatus) {
            // get paginated events with specific status
            this.fetchEvents('/get_events?status=' + this.currentEventStatus + '&page=' + newPage);
        }
        else {
            // get paginated events with no specific criteria
            this.fetchEvents('/get_events?page=' + newPage);
        }
    };
    EventListComponent.prototype.fetchEvents = function (url) {
        var _this = this;
        this.isFetchingDataFromServer = true;
        this.canShowPagination = false;
        this.eventService.getEvents(url).subscribe(function (data) {
            _this.isFetchingDataFromServer = false;
            _this.canShowPagination = true;
            _this.totalPages = data.totalPages;
            _this.events = data.events;
        }, function (error) { return _this.errorMessage = error; });
    };
    EventListComponent = __decorate([
        core_1.Component({
            selector: 'event-list',
            templateUrl: 'frontend/templates/event_list.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [router_1.ROUTER_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, icon_1.MdIcon, radio_1.MD_RADIO_DIRECTIVES, progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES, pagination_component_1.PaginationComponent, event_basic_info_component_1.EventBasicInfoComponent],
            providers: [router_1.ROUTER_PROVIDERS, icon_1.MdIconRegistry, radio_1.MdRadioDispatcher, event_model_1.Event, event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event_list.component.js.map