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
var session_model_1 = require('../models/session.model');
var SessionService = (function () {
    function SessionService(http) {
        this.http = http;
        this.getSessionsForEventUrl = '/get_sessions_for_event?id=';
    }
    SessionService.prototype.getSessionsForEvent = function (eventId) {
        return this.http.get(this.getSessionsForEventUrl + eventId)
            .map(this.extractSessionData)
            .catch(this.handleError);
    };
    SessionService.prototype.extractSessionData = function (res) {
        var sessions = [];
        var body = res.json();
        for (var i = 0; i < body.sessions.length; i++) {
            var newSession = new session_model_1.Session();
            newSession.initialize(body.sessions[i]);
            sessions.push(newSession);
        }
        return sessions;
    };
    SessionService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errorMessage = null;
        if (error.message != null) {
            errorMessage = error.message;
        }
        return Observable_1.Observable.throw(errorMessage);
    };
    SessionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map