import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Model from './model.js'

const PromotionCodes = new Mongo.Collection('PromotionCodes');
PromotionCodes.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
PromotionCodes.attachSchema(new SimpleSchema(Model));

PromotionCodes.helpers({
});

export default PromotionCodes;