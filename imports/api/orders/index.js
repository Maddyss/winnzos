import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Model from './model.js'

import pricingManager from '/imports/api/utils/pricingManager.js';

const Orders = new Mongo.Collection('Orders');
Orders.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
Orders.attachSchema(new SimpleSchema(Model));

Orders.helpers({
    getTotals(){
        "use strict";

        return pricingManager.computeOrderOrShoppingCartPrices(this.items,this.promotionCode);
    },

});

export default Orders;