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
// angular2-material
var button_1 = require('@angular2-material/button');
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.currentPageChanged = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.ngOnInit = function () {
        this.showingPageIndexes = [];
        // calculate the showing page indexes, maximum 5 page index buttons will be showing
        if (this.totalPages <= 5) {
            for (var i = 1; i <= this.totalPages; i++) {
                this.showingPageIndexes.push(i);
            }
        }
        else {
            if (this.currentPage <= 3) {
                this.showingPageIndexes = [1, 2, 3, 4, 5];
            }
            else if ((this.totalPages - this.currentPage) <= 2) {
                for (var i = this.totalPages - 4; i <= this.totalPages; i++) {
                    this.showingPageIndexes.push(i);
                }
            }
            else {
                for (var i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
                    this.showingPageIndexes.push(i);
                }
            }
        }
    };
    PaginationComponent.prototype.notifyOfCurrentPageChanged = function (pageIndex) {
        if (pageIndex != this.currentPage) {
            this.currentPage = pageIndex;
            this.currentPageChanged.emit(this.currentPage);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "currentPage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "totalPages", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PaginationComponent.prototype, "currentPageChanged", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'pagination',
            templateUrl: 'frontend/templates/pagination.html',
            styleUrls: ['frontend/styles/styles.css'],
            directives: [button_1.MD_BUTTON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map