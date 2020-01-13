import {Meteor} from 'meteor/meteor';

import moment from 'moment';

export default function startAutoCancelExpiredSubscriptions() {
    "use strict";

    var delay = Meteor.settings.private.checkExpiredSubscriptionsTimeout;

    let task = () => {
        let date = moment().toDate();

        var expiredOrders = Meteor.users.find({
            $and: [
                {
                    subscriptionExpirationDate: {
                        $exists: true,
                    },
                },
                {
                    subscriptionExpirationDate: {
                        $lt: date,
                    },
                },
                {
                    roles: {
                        $in: ['plan-comfort','plan-premium'],
                    },
                },
            ]
        }).fetch();

        console.log("Found " + expiredOrders.length + " users to disable");
        expiredOrders.forEach((user) => {
            Roles.removeUsersFromRoles (user._id, ['plan-starter','plan-comfort','plan-premium']);
            Roles.addUsersToRoles(user._id, 'plan-starter');
        });

    };

    Meteor.setTimeout(task,0);

    Meteor.setInterval(task, delay * 1000);

}