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
var Toolbox = (function () {
    function Toolbox() {
    }
    Toolbox.prototype.formatDate = function (date) {
        var day = date.getDate();
        var dayString = '' + day;
        if (day < 10) {
            dayString = '0' + day;
        }
        var month = date.getMonth();
        var monthString = '' + month;
        if (month < 10) {
            monthString = '0' + month;
        }
        var year = date.getFullYear();
        var hour = date.getHours();
        var hourString = '' + hour;
        if (hour < 10) {
            hourString = '0' + hour;
        }
        var minute = date.getMinutes();
        var minuteString = '' + minute;
        if (minute < 10) {
            minuteString = '0' + minute;
        }
        return year + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minuteString;
    };
    Toolbox = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Toolbox);
    return Toolbox;
}());
exports.Toolbox = Toolbox;
//# sourceMappingURL=toolbox.service.js.map