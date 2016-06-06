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
// angular2
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// angular2-material
var button_1 = require('@angular2-material/button');
var card_1 = require('@angular2-material/card');
// custom components
var event_list_component_1 = require('./event_list.component');
var login_component_1 = require('./login.component');
var editor_component_1 = require('./editor.component');
var event_details_component_1 = require('./event_details.component');
// custom services
var state_service_1 = require('../services/state.service');
// config
var constants_1 = require('../config/constants');
var AppComponent = (function () {
    function AppComponent(router, stateService) {
        this.router = router;
        this.stateService = stateService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateService.stateChanged.subscribe(function (state) {
            if (state == constants_1.constants.eventDetailsState) {
                _this.router.navigate(['/event_details']);
            }
        });
    };
    AppComponent = __decorate([
        router_1.Routes([
            { path: '/', component: event_list_component_1.EventListComponent },
            { path: '/login', component: login_component_1.LoginComponent },
            { path: '/editor', component: editor_component_1.EditorComponent },
            { path: '/events', component: event_list_component_1.EventListComponent },
            { path: '/event_details', component: event_details_component_1.EventDetailsComponent }
        ]),
        core_1.Component({
            selector: 'vt-app',
            templateUrl: 'frontend/templates/app.html',
            directives: [router_1.ROUTER_DIRECTIVES, button_1.MD_BUTTON_DIRECTIVES, card_1.MD_CARD_DIRECTIVES, login_component_1.LoginComponent],
            providers: [router_1.ROUTER_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_1.Router, state_service_1.StateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map