"use strict";
var Event = (function () {
    function Event() {
    }
    Event.prototype.initialize = function (event) {
        this.Id = event.Id;
        this.title = event.title;
        this.start = new Date(event.start);
        this.end = new Date(event.end);
        this.status = event.status;
        this.registration_limit = event.registration_limit;
        this.remaining_seats = event.remaining_seats;
        this.description = event.description;
        this.image_url = event.image_url;
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.model.js.map