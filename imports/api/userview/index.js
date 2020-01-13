import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Model from './model.js'

const UserViews = new Mongo.Collection('UserViews');
UserViews.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
UserViews.attachSchema(new SimpleSchema(Model));

UserViews.helpers({
});

export default UserViews;