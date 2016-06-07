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
var event_details_component_1 = require('./event_details.component');
var new_event_component_1 = require('./new_event.component');
// custom services
var state_service_1 = require('../services/state.service');
var salesforce_user_service_1 = require('../services/salesforce_user.service');
// config
var constants_1 = require('../config/constants');
var AppComponent = (function () {
    function AppComponent(router, stateService, salesforceUserService) {
        this.router = router;
        this.stateService = stateService;
        this.salesforceUserService = salesforceUserService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateService.stateChanged.subscribe(function (state) {
            if (state == constants_1.constants.eventDetailsState) {
                _this.router.navigate(['/event_details']);
            }
            else if (state == constants_1.constants.newEventState) {
                _this.router.navigate(['/new_event']);
            }
        });
    };
    AppComponent.prototype.goCreateEventOrLoginFirst = function () {
        var _this = this;
        this.salesforceUserService.hasUserLoggedIn().subscribe(
        // user has already logged in
        function (data) { return _this.router.navigate(['/new_event']); }, 
        // user has NOT logged in, remember which state the router should go to after successful login and show login view
        function (error) {
            _this.stateService.afterLoginState = constants_1.constants.newEventState;
            _this.router.navigate(['/login']);
        });
    };
    AppComponent = __decorate([
        router_1.Routes([
            { path: '/', component: event_list_component_1.EventListComponent },
            { path: '/login', component: login_component_1.LoginComponent },
            { path: '/events', component: event_list_component_1.EventListComponent },
            { path: '/event_details', component: event_details_component_1.EventDetailsComponent },
            { path: '/new_event', component: new_event_component_1.NewEventComponent }
        ]),
        core_1.Component({
            selector: 'vt-app',
            templateUrl: 'frontend/templates/app.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [router_1.ROUTER_DIRECTIVES, button_1.MD_BUTTON_DIRECTIVES, card_1.MD_CARD_DIRECTIVES],
            providers: [router_1.ROUTER_PROVIDERS, salesforce_user_service_1.SalesforceUserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, state_service_1.StateService, salesforce_user_service_1.SalesforceUserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map