import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Model from './model.js'

const Messages = new Mongo.Collection('Messages');
Messages.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
Messages.attachSchema(new SimpleSchema(Model));

Messages.helpers({
    userFrom() {
        return Meteor.users.findOne(this.from);
    },
    userTo() {
        return Meteor.users.findOne(this.to);
    }
});

export default Messages;