"use strict";
var Session = (function () {
    function Session() {
    }
    Session.prototype.initialize = function (session) {
        this.Id = session.Id;
        this.title = session.title;
        this.start = new Date(session.start);
        this.end = new Date(session.end);
        this.status = session.status;
        this.registration_limit = session.registration_limit;
        this.remaining_seats = session.remaining_seats;
        this.belongs_to_event = session.belongs_to_event;
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.model.js.map