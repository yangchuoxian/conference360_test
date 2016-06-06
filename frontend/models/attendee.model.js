"use strict";
var Attendee = (function () {
    function Attendee() {
    }
    Attendee.prototype.initialize = function (attendee) {
        this.Id = attendee.Id;
        this.company = attendee.company;
        this.email = attendee.email;
        this.first_name = attendee.first_name;
        this.last_name = attendee.last_name;
        this.phone = attendee.phone;
    };
    return Attendee;
}());
exports.Attendee = Attendee;
//# sourceMappingURL=attendee.model.js.map