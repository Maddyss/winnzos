import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Meetups from '../../Meetups';

// All Meetups for the current user
function meetupsAllQuery() {
    if (!this.userId) {
        // Linter for server side traces
        /* eslint-disable */
//        console.warn('Unauthorized use of Meetup publications');
        /* eslint-enable */
        return this.ready();
    }
    const query = {
        $or: [
            {proId: this.userId},
            {userId: this.userId},
        ],
        isActive:true
    };
    const options = {
        sort: {start: -1},
    };
    return Meetups.find(query, options);
}
Meteor.publish('Meetups.all', meetupsAllQuery);


Meteor.publishComposite('Meetups.withEmployees', function () {
    return {
        find() {
            return Meteor.users.find(this.userId);
        },
        children: [
            {
                find(user) {
                    return Meetups.find({proId: user._id,isActive:true});
                }
            },
            {
                find(user) {
                    return Meteor.users.find({companyId: user._id});
                },
                children: [
                    {
                        find(user) {
                            return Meetups.find({proId: user._id,isActive:true});
                        }
                    }
                ]
            }
        ]
    }
});

// Next pro meetups
function meetupsSinglePro(proId) {
    try {
        check(proId, String);
        const query = {proId,isActive:true};
        const options = {
            fields: {
                start: true,
                end: true,
                allDay: true,
            },
        };
        // Linter for server side traces
        /* eslint-disable */
        console.log('Meetups published for', proId, 'to', this.userId);
        /* eslint-enable */
        return Meetups.find(query, options);
    } catch (err) {
        // Linter for server side traces
        /* eslint-disable */
        console.warn('Unauthorized use of Users publications');
        /* eslint-enable */
        return this.ready();
    }
}
Meteor.publish('Meetups.all.pro', meetupsSinglePro);
