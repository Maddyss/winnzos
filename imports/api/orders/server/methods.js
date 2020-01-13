import lodash from 'lodash';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Random } from 'meteor/random';
import moment from "moment";
import pricingManager from '/imports/api/utils/pricingManager.js';

import {payRendezVous, setEmployeeManagement, setChatInstant} from '/imports/api/Users/server/methods.js';

import Orders from '/imports/api/orders/index.js';
import PromotionCodes from '/imports/api/promotioncodes/index.js';

function generateOrderItemFromCartItem(cartItem) {
    "use strict";

    let orderItem = {
        id: cartItem.id,
        option: cartItem.option,
        name: cartItem.name,
        priceTtc: cartItem.priceTtc,
        priceHt: cartItem.priceHt,
        duration: cartItem.duration,
    };

    let id = cartItem.id;

    if (lodash.startsWith(id, 'application-')) {
        var {ht, ttc} = pricingManager.getApplicationPrice(id.replace('application-', ''));
        orderItem.priceTtc = ttc;
        orderItem.priceHt = ht;
    } else if (id === 'plan') {
        var {ht, ttc} = pricingManager.getPlanPriceWithTtc(cartItem.option, cartItem.duration);
        orderItem.priceTtc = ttc;
        orderItem.priceHt = ht;
    }

    return orderItem;
}

function getOrderFromShoppingCartItems(shopingCartItems, promotionCode) {
    "use strict";
    let items = shopingCartItems.map(generateOrderItemFromCartItem);
    var promotionCodeDatabase = null;
    if (promotionCode) {
        promotionCodeDatabase = PromotionCodes.findOne({ _id: promotionCode._id });
    }

    var {totalTtc, totalHt, totalDiscount} = pricingManager.computeOrderOrShoppingCartPrices(items, promotionCodeDatabase);


    var order = {
        _id: Random.id(),
        items,
        totalHt,
        totalTtc,
        totalDiscount,
        userId: Meteor.userId(),
        status: 'created',
    }

    if (promotionCode) {
        order.promotionCode = {
            ...promotionCode
        };
    }


    return order;
}

function applyOrderAfterPayment(order) {
    "use strict";

    let shoppingCartItems = order.items;
    let currentUserId = order.userId;


    shoppingCartItems.forEach((item) => {
        if (item.id === 'plan') {
            check(item.option, String);

            Roles.removeUsersFromRoles(currentUserId, ['plan-starter', 'plan-comfort', 'plan-premium']);

            Roles.addUsersToRoles(currentUserId, 'plan-' + item.option);

            if (item.option === 'starter') {
                Meteor.users.update({ _id: currentUserId }, { $set: { subscriptionExpirationDate: null } });
            } else {
                var planExpirationDate = moment().add(item.duration, 'month').toDate();
                Meteor.users.update({ _id: currentUserId }, { $set: { subscriptionExpirationDate: planExpirationDate } });
            }
        } else if (lodash.startsWith(item.id, 'application')) {
            if (item.id === 'application-rendezvous') {
                payRendezVous(currentUserId);
            }
            else if (item.id === 'application-chatInstant') {
                setChatInstant(currentUserId);
            }
            else if (item.id === 'application-employeemanagement') {
                setEmployeeManagement(currentUserId);
            }
            else {
                throw new Error('Unknown item ' + item.id);
            }
        }

    });
}

export {getOrderFromShoppingCartItems, triggerPayment, applyOrderAfterPayment};