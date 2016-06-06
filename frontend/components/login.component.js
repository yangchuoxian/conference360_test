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
var button_1 = require('@angular2-material/button');
var input_1 = require('@angular2-material/input');
var progress_bar_1 = require('@angular2-material/progress-bar');
var icon_1 = require('@angular2-material/icon');
// custom service
var salesforce_user_service_1 = require('../services/salesforce_user.service');
var LoginComponent = (function () {
    function LoginComponent(salesforceUserService) {
        this.salesforceUserService = salesforceUserService;
        this.stateAnounced = new core_1.EventEmitter();
    }
    LoginComponent.prototype.submitSalesforceUserLogin = function () {
        var _this = this;
        this.loginHintMessage = '';
        this.isLoggingIn = true;
        this.salesforceUserService.login(this.salesforceEmail, this.salesforcePassword).subscribe(function (data) {
            _this.isLoggingIn = false;
            _this.hasLoginSucceeded = true;
            _this.loginHintMessage = 'Login Succeeded';
        }, function (error) {
            _this.isLoggingIn = false;
            _this.hasLoginSucceeded = false;
            _this.loginHintMessage = 'Login Failed';
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "stateAnounced", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'frontend/templates/login.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [button_1.MD_BUTTON_DIRECTIVES, icon_1.MdIcon, input_1.MD_INPUT_DIRECTIVES, progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES],
            providers: [icon_1.MdIconRegistry, salesforce_user_service_1.SalesforceUserService]
        }), 
        __metadata('design:paramtypes', [salesforce_user_service_1.SalesforceUserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map