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
var session_model_1 = require('../models/session.model');
// custom services
var toolbox_service_1 = require('../services/toolbox.service');
var SessionBasicInfoComponent = (function () {
    function SessionBasicInfoComponent(toolbox) {
        this.toolbox = toolbox;
        this.sessionToggled = new core_1.EventEmitter();
    }
    SessionBasicInfoComponent.prototype.ngOnInit = function () {
        this.startDateTimeString = this.toolbox.formatDate(this.session.start);
        this.endDateTimeString = this.toolbox.formatDate(this.session.end);
        this.isSessionSelected = false;
    };
    SessionBasicInfoComponent.prototype.notifyChangedSessionSelection = function () {
        this.isSessionSelected = !this.isSessionSelected;
        this.sessionToggled.emit(this.session.Id);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SessionBasicInfoComponent.prototype, "sessionToggled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', session_model_1.Session)
    ], SessionBasicInfoComponent.prototype, "session", void 0);
    SessionBasicInfoComponent = __decorate([
        core_1.Component({
            selector: 'session-basic-info',
            templateUrl: 'frontend/templates/session_basic_info.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [card_1.MD_CARD_DIRECTIVES],
            providers: [session_model_1.Session, toolbox_service_1.Toolbox]
        }), 
        __metadata('design:paramtypes', [toolbox_service_1.Toolbox])
    ], SessionBasicInfoComponent);
    return SessionBasicInfoComponent;
}());
exports.SessionBasicInfoComponent = SessionBasicInfoComponent;
//# sourceMappingURL=session_basic_info.component.js.map