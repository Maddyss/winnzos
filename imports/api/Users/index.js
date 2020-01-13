import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {primary} from '/imports/constants/colors';
import getDefaultsFromModel from '/imports/api/utils/getDefaultsFromModel';
import {
    payRendezVous,
    setAgendaSettings,
    setEmployeeManagement,
} from './methods';
import AgendaSettings from './models';

import moment from "moment";

// Fat model
Meteor.users.helpers({
    // Linter for using Mongo API
    /* eslint-disable */
    userId() {
        return this._id;
    },
    /* eslint-enable */
    email() {
        return this.emails[0].address;
    },
    rawAgendaSettings() {
        return this.profile && this.profile.agendaSettings ?
            this.profile.agendaSettings : null;
    },
    agendaSettings() {
        return Object.assign(
            getDefaultsFromModel(AgendaSettings),
            this.rawAgendaSettings()
        );
    },
    agendaColor() {
        if (this.profile && this.profile.agendaSettings) {
            return this.profile.agendaSettings.color;
        }
        return primary;
    },
    displayName(){
        if (this.username.indexOf('@') !== -1) {
            return this.username.substr(0, this.username.indexOf('@'));
        } else {
            return this.username;
        }
    },
    agendaStep() {
        let step = 30;
        if (this.profile && this.profile.agendaSettings) {
            const timeFrame = this.profile.agendaSettings.timeFrame;
            switch (timeFrame) {
                case '15m':
                    step = 15;
                    break;
                case '30m':
                    step = 30;
                    break;
                case '1h':
                    step = 60;
                    break;
                case '2h':
                    step = 120;
                    break;
                case '3h':
                    step = 180;
                    break;
                default:
                    // Linter for settings errors
                    /* eslint-disable */
                    console.warn('Unknown timeFrame', Meteor.user().profile.agendaSettings);
                /* eslint-enable */
            }
        }
        return step;
    },
    officeHourStart() {
        let officeHourStart = AgendaSettings.officeHourStart.defaultValue;
        if (this.profile &&
            this.profile.agendaSettings &&
            this.profile.agendaSettings.officeHourStart) {
            officeHourStart = this.profile.agendaSettings.officeHourStart;
        }
        return officeHourStart;
    },
    officeHourEnd() {
        let officeHourEnd = AgendaSettings.officeHourEnd.defaultValue;
        if (this.profile &&
            this.profile.agendaSettings &&
            this.profile.agendaSettings.officeHourEnd) {
            officeHourEnd = this.profile.agendaSettings.officeHourEnd;
        }
        return officeHourEnd;
    },
    //Application Marketing Email
    hasMarketingMail() {
        if(this.currentPlan() === 'premium'){
            return true;
        }
        return Roles.userIsInRole(this._id, 'marketemail');
    },
    //Application Devis Facture
    hasCreationPdf() {
        if(this.currentPlan() === 'premium'){
            return true;
        }
        return Roles.userIsInRole(this._id, 'creationPDF');
    },
    //Application Devis Facture
    hasChat() {
        if(this.currentPlan() === 'premium'){
            return true;
        }
        return Roles.userIsInRole(this._id, 'chatInstant');
    },
    hasEmployeeManagement() {

        if(this.currentPlan() === 'premium'){
            return true;
        }

        return Roles.userIsInRole(this._id, 'employeeManagement');
    },
    hasRendezVous() {
        if(this.currentPlan() === 'premium'){
            return true;
        }

        return Roles.userIsInRole(this._id, 'rendezvous');
    },
    currentPlan() {
        var isPremium = Roles.userIsInRole(this._id, 'plan-premium');
        var isComfort = Roles.userIsInRole(this._id, 'plan-comfort');
        var isStarter = Roles.userIsInRole(this._id, 'plan-starter');

        if (this.subscriptionExpirationDate && (isPremium || isComfort)) {
            var expDate = moment(this.subscriptionExpirationDate);
            if (expDate.isBefore(moment())) {
                return 'starter';
            } else {
                if (isPremium) {
                    return 'premium';
                } else if (isComfort) {
                    return 'comfort';
                }
            }
        }
        return 'starter';
    },
    isEmployee(){
        return Roles.userIsInRole(this._id, 'employee');
    },
    company(){
        return Meteor.users().findOne(this._companyId);
    }
});

export {
    // Methods
    payRendezVous,
    setAgendaSettings,
    setEmployeeManagement,
    // Models
    AgendaSettings,
};
