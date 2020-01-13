import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

export const payRendezVous = (userId) => {
  const user = Meteor.users.findOne(userId, { fields: { emails: true,profile:true } });
  try {
    Roles.addUsersToRoles(userId, 'rendezvous');

    if(!user.profile.agendaSettings){
        Meteor.users.update(userId,{ $set: { "profile.agendaSettings": {} } })
    }

    // Linter disabled for server side traces
    /* eslint-disable */
    console.log('User has role "rendezvous": ', user.email());
    /* eslint-enable */
  } catch (err) {
    // Linter disabled for server side traces
    /* eslint-disable */
    console.warn('User role insertion failed', err, user.email());
    /* eslint-enable */
    throw new Meteor.Error('failed', `User role insertion failed: ${err.toString()}`);
  }
};


export const setEmployeeManagement = (userId) => {
  const user = Meteor.users.findOne(userId, { fields: { emails: true } });
  try {
    Roles.addUsersToRoles(userId, 'employeeManagement');
    // Linter disabled for server side traces
    /* eslint-disable */
    console.log('User has role "employeeManagement": ', user.email());
    /* eslint-enable */
  } catch (err) {
    // Linter disabled for server side traces
    /* eslint-disable */
    console.warn('User role insertion failed', err, user.email());
    /* eslint-enable */
    throw new Meteor.Error('failed', `User role insertion failed: ${err.toString()}`);
  }
};



export const setChatInstant = (userId) => {
  const user = Meteor.users.findOne(userId, { fields: { emails: true } });
  try {
    Roles.addUsersToRoles(userId, 'chatInstant');
    // Linter disabled for server side traces
    /* eslint-disable */
    console.log('User has role "chatInstant": ', user.email());
    /* eslint-enable */
  } catch (err) {
    // Linter disabled for server side traces
    /* eslint-disable */
    console.warn('User role insertion failed', err, user.email());
    /* eslint-enable */
    throw new Meteor.Error('failed', `User role insertion failed: ${err.toString()}`);
  }
};

export const setAgendaSettings = (userId, content) => {
  const user = Meteor.users.findOne(userId, { fields: { emails: true } });
  try {
    const profile = { ...user.profile, agendaSettings: content };
    Meteor.users.update(userId, { $set: { profile } });
    // Linter disabled for server side traces
    /* eslint-disable */
    console.log('Agenda settings updated for user: ', user.email());
    /* eslint-enable */
  } catch (err) {
    // Linter disabled for server side traces
    /* eslint-disable */
    console.warn('Agenda settings update failed', err, user.email());
    /* eslint-enable */
    throw new Meteor.Error('failed', `Agenda settings update failed: ${err.toString()}`);
  }
};
