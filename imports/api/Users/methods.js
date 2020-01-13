import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {checkLoggedInError} from '/imports/api/utils/validatedMethodsConstants';
import AgendaSettings from './models';
import { Random } from 'meteor/random'
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';

// Methods
let serverMethods = null;
if (Meteor.isServer) {
  // Linter for special patterns of methods hiding
  /* eslint-disable */
  serverMethods = require('./server/methods.js');
  /* eslint-disable */
}

export const setEmployeeManagement = new ValidatedMethod({
  name: 'Users.methods.setEmployeeManagement',
  validate: new SimpleSchema({}).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run() {
    if (Meteor.isServer) {
      serverMethods.setEmployeeManagement(this.userId);
    }
  }
});

export const updateUserEmail = new ValidatedMethod({
  name: 'Users.updateemail',
  validate: new SimpleSchema({newEmail: {type : String}}).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run({newEmail}) {
    if(Meteor.isServer){
        var currentEmail = Meteor.user().emails[0].address;

        Accounts.removeEmail(Meteor.userId(), currentEmail);
        Accounts.addEmail(Meteor.userId(), newEmail,true);
    }
  }
});


export const setChatInstant = new ValidatedMethod({
  name: 'Users.methods.setChatInstant',
  validate: null,
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run() {
    if (Meteor.isServer) {
      serverMethods.setChatInstant(this.userId);
    }
  }
});

export const payRendezVous = new ValidatedMethod({
  name: 'Users.methods.payRendezVous',
  validate: new SimpleSchema({}).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run() {
    if (Meteor.isServer) {
      serverMethods.payRendezVous(this.userId);
    }
  }
});

export const setAgendaSettings = new ValidatedMethod({
    name: 'Users.method.setAgendaSettings',
    validate: new SimpleSchema(AgendaSettings).validator(),
    mixins: [
        LoggedInMixin, CallPromiseMixin
    ],
    checkLoggedInError,
    run(content) {
        if (Meteor.isServer) {
            serverMethods.setAgendaSettings(this.userId, content);
        }
    }
});

export const createEmployee = new ValidatedMethod({
  name: 'Users.method.createEmployee',
  validate: new SimpleSchema({
    username: {
      type: String
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    companyId: {
      type: String
    },
    color : {
      type: String,
    }
  }).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run(options) {
    if (Meteor.isServer) {
      options.password = Random.hexString(6);
      console.log("Creating user : ", options);
      var id = Accounts.createUser(options);
      Roles.addUsersToRoles(id, ['employee','rendezvous']);
      Meteor.call('sendEmailEmploye', options.email, '[Winnzos] Création de votre compte', options.password)
      /*Meteor.defer(()=>{
        var text =  'Votre compte winnzos a été créé. \n Votre email est : '+options.username+'\n Votre mot de passe est : '+options.password;

        Email.send({
          to : options.username,
          from : 'Winnzos <***>',
          subject : 'Compte Winnzos créé',
          text
        });
      });*/
    }
  }
});


export const deleteEmployee = new ValidatedMethod({
  name: 'Users.method.deleteEmployee',
  validate: new SimpleSchema({
    userId: {
      type: String,
    }
  }).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run({userId}) {
    var currentUserId = this.userId;
    var user = Meteor.users.findOne(userId);
    console.log(user);
    console.log(currentUserId);
    if(user && user.companyId == currentUserId){
      console.log("Deleting user ",userId);
      Meteor.users.remove(userId);
    }
  }
});





export const updateEmployeeDescription = new ValidatedMethod({
  name: 'Users.method.updateEmployeeDescription',
  validate: new SimpleSchema({
    description: {
      type: String,
    }
  }).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run({description}) {
    if(Meteor.user().isEmployee()){
      Meteor.users.update(Meteor.user()._id,{$set : {description:description}});
    }
  }
});



export const setDefaultCompanyRoles = new ValidatedMethod({
  name: 'Users.method.setDefaultCompanyRoles',
  validate:new SimpleSchema({}).validator(),
  mixins: [
    LoggedInMixin, CallPromiseMixin
  ],
  checkLoggedInError,
  run() {
    //Adds the default roles for this user.
    Roles.addUsersToRoles(Meteor.user()._id, ['company','plan-premium']);

    var planExpirationDate = moment().add(10, 'days').toDate();
    Meteor.users.update({ _id: Meteor.user()._id }, { $set: { subscriptionExpirationDate: planExpirationDate } });

  }
});



