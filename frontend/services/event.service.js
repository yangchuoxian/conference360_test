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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var event_model_1 = require('../models/event.model');
var EventService = (function () {
    function EventService(http) {
        this.http = http;
    }
    EventService.prototype.getEvents = function (url) {
        return this.http.get(url)
            .map(this.extractEventData)
            .catch(this.handleError);
    };
    EventService.prototype.extractEventData = function (res) {
        var events = [];
        var body = res.json();
        for (var i = 0; i < body.events.length; i++) {
            var newEvent = new event_model_1.Event();
            newEvent.initialize(body.events[i]);
            events.push(newEvent);
        }
        var totalPages = Math.floor(body.totalSize / body.itemsPerPage);
        if (body.totalSize % body.itemsPerPage != 0) {
            totalPages += 1;
        }
        return {
            totalPages: totalPages,
            events: events
        };
    };
    EventService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errorMessage = null;
        if (error.message != null) {
            errorMessage = error.message;
        }
        return Observable_1.Observable.throw(errorMessage);
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map