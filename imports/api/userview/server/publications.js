import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import UserViews from '../index.js';

Meteor.publishComposite('ProfileViews.OfCurrentUser', function () {
    return {
        find() {
            return Meteor.users.find(this.userId);
        },
        children: [
            {
                find(user) {
                    return UserViews.find({userVisitedId: user._id});
                },
            },
        ]
    }
});