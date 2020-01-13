import Messages from '/imports/api/Message/index.js';
import {Meteor} from 'meteor/meteor';

import moment from 'moment';

export default function startAutoSendReminderTask() {
    "use strict";

    var delay = Meteor.settings.private.delayBeforeSendingReminderEmail;
    console.log("Delay is "+delay)

    Meteor.setInterval(() => {

        let date = moment().add(-1 * delay, 'seconds').toDate();
        console.log("Date : "+ date)

        var messages = Messages.find({
            date: {
                $lt: date,
            },
            isReminderSent: false,
            isReadByReceiver: false,
        }).fetch();

        messages.forEach((m) => {

            var userTo = Meteor.users.findOne(m.to);
            var userFrom = Meteor.users.findOne(m.from);

            Meteor.call('sendMessageReminder', userTo.email(), userFrom.username, m.message, m.date, (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    Messages.update(m._id,{$set:{isReminderSent : true}});
                }
            });
        });

    }, delay * 1000);

}