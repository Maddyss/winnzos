import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import { Roles } from 'meteor/alanning:roles';
import moment from "moment";
import lodash from "lodash";

import PromotionCodes from "./index.js";

Meteor.methods({
    "promotioncodes.get": function (code) {
        "use strict";
        check(arguments, [Match.Any]);
        check(code,String);

        var promotionCode = PromotionCodes.findOne({code : code.trim()});

        return promotionCode;
    }
});