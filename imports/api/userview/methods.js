import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import { Roles } from 'meteor/alanning:roles';
import moment from "moment";
import lodash from "lodash";

import UserViews from "./index.js";

Meteor.methods({
    "stats.record.userview": function (userVisitedId, location) {
        "use strict";
        check(arguments, [Match.Any]);
        check(userVisitedId,String);
        check(location,String);

        var currentUser = Meteor.userId();

        let userView = {
            userVisitedId,
            userVisitorId : currentUser,
            location,
        };

        UserViews.insert(userView);
    },
    "stats.record.userviews": function (views) {
        "use strict";
        check(arguments, [Match.Any]);

        views.forEach(v=>Meteor.call("stats.record.userview",v));
    }
});