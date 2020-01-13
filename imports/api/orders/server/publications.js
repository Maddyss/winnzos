import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Orders from '../index.js';

Meteor.publishComposite('Orders.from.user', function () {
    return {
        find() {
            return Meteor.users.find(this.userId);
        },
        children: [
            {
                find(user) {
                    return Orders.find({userId : user._id});
                },
            },
        ]
    }
});

Meteor.publishComposite('Orders.specific', function (orderId) {
    check(orderId, String);
    return {
        find() {
            return Meteor.users.find(this.userId);
        },
        children: [
            {
                find(user) {
                    return Orders.find({
                        userId : user._id,
                        _id : orderId
                    });
                },
            },
        ]
    }
});

Meteor.publishComposite('Orders.last', function () {
    return {
        find() {
            return Meteor.users.find(this.userId);
        },
        children: [
            {
                find(user) {
                    return Orders.find({
                        userId : user._id,
                    },{
                        sort: {
                            "purchaseDate": -1
                        },
                        limit : 1
                    });
                },
            },
        ]
    }
});