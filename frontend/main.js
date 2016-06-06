"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var environment_1 = require('./config/environment');
// Custom components
var app_component_1 = require('./components/app.component');
// Custom services
var state_service_1 = require('./services/state.service');
if (environment_1.environment == 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    state_service_1.StateService
]);
//# sourceMappingURL=main.js.map