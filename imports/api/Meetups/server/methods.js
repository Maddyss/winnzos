import moment from 'moment';
import 'moment-ferie-fr';
import omit from 'lodash/omit';
import {Meteor} from 'meteor/meteor';
import {weekDayNumberToString} from '/imports/constants/weekDays';
import getDefaultsFromModel from '/imports/api/utils/getDefaultsFromModel';
import Meetups, {Model, DayOff} from '../../Meetups';

export const insertMeetup = (userId, content) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    try {
        const augmentedContent = content;

        Meetups.insert(augmentedContent);
        // Linter disabled for server side traces
        /* eslint-disable */
        console.log('Meetup inserted by:', user.email(), ':', content.title);
        /* eslint-enable */
    } catch (err) {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.warn('Meetup insertion failed', err, content);
        /* eslint-enable */
        throw new Meteor.Error('failed', `Meetup not inserted: ${err.toString()} for ${user.email()}`);
    }
};

export const removeMeetup = (userId, content) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    try {
        Meetups.remove({_id:content._id});
        console.log('Meetup removed by:', user.email(), ':', content._id);
    } catch (err) {
        console.warn('Meetup removal failed', err, content);
        throw new Meteor.Error('failed', `Meetup not removed: ${err.toString()} for ${user.email()}`);
    }
};

export const insertDayOff = (userId, content) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    try {
        const dayOff = content.dayOff;
        const currentDate = moment().startOf('year').isoWeekday(dayOff);
        const lastDate = moment().endOf('year');
        const dayOffStr = weekDayNumberToString(dayOff);
        const dayOffLabel = DayOff.dayOff.label;
        const meetupDayOff = {
            ...getDefaultsFromModel(Model),
            proId: userId,
            allDay: true,
            type: Model.type.allowedValues[2],
            title: `${dayOffStr} - ${dayOffLabel}`,
            validatedStatus : true,
        };
        while (currentDate.isSameOrBefore(lastDate)) {
            meetupDayOff.start = currentDate.clone().hour(0).minutes(1).toDate();
            meetupDayOff.end = currentDate.clone().hour(23).minutes(59).toDate();
            Meetups.insert(meetupDayOff);
            // Linter disabled for server side traces
            /* eslint-disable */
            console.log('Day off inserted by:', user.email(), ':', currentDate.format('DD/MM/YYYY'));
            /* eslint-enable */
            currentDate.add(1, 'week');
        }
    } catch (err) {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.warn('Day off insertion failed', err, content);
        /* eslint-enable */
    }
};

export const removeDayOff = (userId, content) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    try {
        const dayOff = content.dayOff;
        const currentDate = moment().startOf('year').isoWeekday(dayOff);
        const lastDate = moment().endOf('year');
        const dayOffStr = weekDayNumberToString(dayOff);
        const dayOffLabel = DayOff.dayOff.label;
        const meetupDayOff = {
            ...getDefaultsFromModel(Model),
            proId: userId,
            allDay: true,
            type: Model.type.allowedValues[2],
            title: `${dayOffStr} - ${dayOffLabel}`,
            validatedStatus : true,
        };
        while (currentDate.isSameOrBefore(lastDate)) {
            meetupDayOff.start = currentDate.clone().hour(0).minutes(1).toDate();
            meetupDayOff.end = currentDate.clone().hour(23).minutes(59).toDate();
            Meetups.remove(meetupDayOff);
            // Linter disabled for server side traces
            /* eslint-disable */
            console.log('Day off removed by:', user.email(), ':', currentDate.format('DD/MM/YYYY'));
            /* eslint-enable */
            currentDate.add(1, 'week');
        }
    } catch (err) {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.warn('Day off removal failed', err, content);
        /* eslint-enable */
    }
};

export const insertPublicHolydays = (userId) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    const publicHolydays = moment().getFerieList();
    const dayOff = {
        ...getDefaultsFromModel(Model),
        proId: userId,
        allDay: true,
        type: Model.type.allowedValues[2],
        validatedStatus : true,
    };
    try {
        publicHolydays.forEach((day) => {
            const date = day.date.toDate();
            dayOff.title = day.name;
            dayOff.start = moment(date).hour(0).minutes(1).toDate();
            dayOff.end = moment(date).hour(23).minutes(59).toDate();
            Meetups.insert(dayOff);
            // Linter disabled for server side traces
            /* eslint-disable */
            console.log('Public holyday inserted by:', user.email(), ':', day.name);
            /* eslint-enable */
        });
    } catch (err) {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.warn('Public holydays insertion failed', err);
        /* eslint-enable */
    }
};

export const updateMeetup = (userId, content) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    try {
        // Linter for dangling usage of Mongo
        /* eslint-disable */
        const id = String(content._id);
        /* eslint-enable */
        const innerContent = {...omit(content, '_id')};
        Meetups.update(id, {$set: innerContent}, {bypassCollection2: true});
        // Linter disabled for server side traces
        /* eslint-disable */
        console.log('Meetup updated by:', user.email(), ':', content.title);
        /* eslint-enable */
    } catch (err) {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.warn('Meetup update failed for:', user.email(), ':', err, content);
        /* eslint-enable */
        throw new Meteor.Error('failed', `Meetup not updated: ${err.toString()} for ${user.email()}`);
    }
};

export const deleteMeetup = (userId, content) => {
    const user = Meteor.users.findOne(userId, {fields: {emails: true}});
    // Linter for dangling usage of Mongo
    /* eslint-disable */
    const res = Meetups.remove(content._id);
    /* eslint-enable */
    if (res === 1) {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.log('Meetup deleted by:', user.email(), ':', content._id);
        /* eslint-enable */
    } else {
        // Linter disabled for server side traces
        /* eslint-disable */
        console.warn('Meetup deletion failed for:', user.email(), ':', content);
        /* eslint-enable */
        throw new Meteor.Error('failed', 'Meetup not deleted');
    }
};
