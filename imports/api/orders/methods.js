import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import { Roles } from 'meteor/alanning:roles';
import moment from "moment";
import lodash from "lodash";

import Orders from "./index.js";


import {getOrderFromShoppingCartItems,applyOrderAfterPayment} from './server/methods.js';

import mercanetDataGenerator from '/imports/api/mercanet/mercanet-data-generator.js';

Meteor.methods({
    "payment.payFreeOrder": function (shoppingCartItems,promotionCode) {
        "use strict";
        check(arguments, [Match.Any]);

        let currentUserId = this.userId;

        check(shoppingCartItems, [Object]);
        check(currentUserId, String);

        console.log("Inserting order in database");

        let order = getOrderFromShoppingCartItems(shoppingCartItems,promotionCode);
        if(order.totalTtc===0){
            order.status = 'paid';
            Orders.insert(order);
            applyOrderAfterPayment(order);
        }
        return order;
    },
    "payment.generateOrderAndGetMercanetData": function (shoppingCartItems,promotionCode) {
        "use strict";
        check(arguments, [Match.Any]);

        let currentUserId = this.userId;

        check(shoppingCartItems, [Object]);
        check(currentUserId, String);

        console.log("Inserting order in database");

        let order = getOrderFromShoppingCartItems(shoppingCartItems,promotionCode);
        console.log(order);
        Orders.insert(order);

        if(Meteor.isServer){
            return mercanetDataGenerator.getDataForOrder(order._id);
        }
        else{
            return {};
        }
    }
});