import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {checkLoggedInError} from '/imports/api/utils/validatedMethodsConstants';
import {Meetup, DayOff} from './models';
import {idType} from '../utils/simpleSchemaTypes';
import Meetups from './index.js'

// Methods
let serverMethods = null;
if (Meteor.isServer) {
    // Linter for special patterns of methods hiding
    /* eslint-disable */
    serverMethods = require('./server/methods.js');
    /* eslint-disable */
}

export const insertMeetup = new ValidatedMethod({
    name: 'Meetups.methods.insert',
    validate: new SimpleSchema(Meetup).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.insertMeetup(this.userId, content);
        }
    },
});

export const removeMeetup = new ValidatedMethod({
    name: 'Meetups.methods.remove',
    validate: new SimpleSchema({
        _id : {
            type : String,
        }    
    }).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.removeMeetup(this.userId, content);
        }
    },
});

export const insertDayOff = new ValidatedMethod({
    name: 'Meetups.methods.insertDayOff',
    validate: new SimpleSchema(DayOff).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.insertDayOff(this.userId, content);
        }
    },
});

export const removeDayOff = new ValidatedMethod({
    name: 'Meetups.methods.removeDayOff',
    validate: new SimpleSchema(DayOff).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.removeDayOff(this.userId, content);
        }
    },
});


export const validateMeetup = new ValidatedMethod({
    name: 'Meetups.methods.validateMeetup',
    validate: null,
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(meetupId) {
        var meetup = Meetups.findOne(meetupId);
        //Should do some validation here

        Meetups.update(meetupId,{$set:{validatedStatus : true}});
        Meteor.call('sendConfRDV', meetup.userId, meetup.proId, meetup.start, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    },
});


export const cancelMeetup = new ValidatedMethod({
    name: 'Meetups.methods.cancelMeetup',
    validate: null,
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run({meetupId,cancelationReason}) {
        check(meetupId,String);
        check(cancelationReason,String);
        var meetup = Meetups.find(meetupId);
        //Should do some validation here

        Meetups.update(meetupId,{$set:{
            validatedStatus : false,
            cancelationReason :cancelationReason,
            isActive : false,
        }});
        Meteor.call('sendRefusRDV', meetup.userId, meetup.proId, meetup.start, cancelationReason, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    },
});

export const insertPublicHolydays = new ValidatedMethod({
    name: 'Meetups.methods.insertPublicHolydays',
    validate: null,
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run() {
        if (Meteor.isServer) {
            serverMethods.insertPublicHolydays(this.userId);
        }
    },
});

export const updateMeetup = new ValidatedMethod({
    name: 'Meetups.methods.update',
    validate: new SimpleSchema(
        Object.assign({}, Meetup, idType)
    ).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.updateMeetup(this.userId, content);
        }
    },
});

export const deleteMeetup = new ValidatedMethod({
    name: 'Meetups.methods.delete',
    validate: new SimpleSchema(idType).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.deleteMeetup(this.userId, content);
        }
    },
});


export const createMeetupRequest = new ValidatedMethod({
    name: 'Meetups.methods.createMeetupRequest',
    validate:  new SimpleSchema(Meetup).validator(),
    run(data) {
        var enterpriseOrEmployee =   Meteor.users.findOne(data.proId);

        if(!enterpriseOrEmployee){
            throw new Error("Employee not found!");
        }

        var company;
        if(enterpriseOrEmployee.companyId){
            company = Meteor.users.findOne(enterpriseOrEmployee.companyId);
        }else{
            company = enterpriseOrEmployee;
        }

        data.validatedStatus = false;
        if(company.profile.agendaSettings && company.profile.agendaSettings.automaticValidation){
            data.validatedStatus = true;
        };


        Meetups.insert(data);
    },
});
