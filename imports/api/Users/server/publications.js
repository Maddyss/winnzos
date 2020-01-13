import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Meetups from '../../Meetups';
import {Entreprise,FichePro} from '/imports/api/collection/collection.js';

// Agenda settings for a given user
function agendaSettingsSingle(proId) {
  try {
    check(proId, String);
    const options = {
      fields: {
        _id: 1,
        profile: 1
      }
    };
    const res = Meteor
      .users
      .find(proId, options);
    if (res.count() !== 1) {
      // Linter for server side traces
      /* eslint-disable */
      console.warn('Unauthorized use of Users publications');
      /* eslint-enable */
      return this.ready();
    }
    // Linter for server side traces
    /* eslint-disable */
    console.log('User agenda settings published', proId, 'for', this.userId);
    /* eslint-enable */
    return res;
  } catch (err) {
    // Linter for server side traces
    /* eslint-disable */
    console.warn('Unauthorized use of Users publications');
    /* eslint-enable */
    return this.ready();
  }
}
Meteor.publish('Users.agendaSettings.single', agendaSettingsSingle);

Meteor.publish('Users.employee', function () {
  return Meteor.users.find({
    _id: this.userId,
    companyId: { $exists: true }
  }, {
      fields: {
        _id: true,
        username: true,
        emails: true,
        companyId: true,
        description: true,
        roles: true
      }
    });
});


Meteor.publish('User.current', function () {
    return Meteor.users.find({
        _id: this.userId,
    }, {
        fields: {
            _id: true,
            username: true,
            emails: true,
            subscriptionExpirationDate: true,
            roles: true,
            favorites:true,
        }
    });
});

Meteor.publishComposite('Users.employees', function () {
  return {
    find() {
      return Meteor
        .users
        .find(this.userId);
    },
    children: [
      {
        find(user) {
          return Meteor.users.find({ companyId: user._id });
        }
      }
    ]
  }
});


Meteor.publishComposite('Users.specific.employees.with.events', function (userId) {
  check(userId, String);
  return {
    find() {
      return Meteor
        .users
        .find(userId);
    },
    children: [
      {
        find(user) {
          return Meteor.users.find({ companyId: user._id }, { fields: { username: true, companyId: true, description: true } });
        },
        children: [
          {
            find(user) {
              return Meetups.find({ proId: user._id,isActive: true });
            }
          }
        ]
      },
      {
        find(user) {
          return Meetups.find({ proId: user._id,isActive: true });
        }
      }
    ]
  }
});



Meteor.publishComposite('User.with.fichePro.and.enterprise', function () {
    return {
        find() {
            return Meteor
                .users
                .find(this.userId);
        },
        children: [
            {
                find(user ) {
                    return FichePro.find({userId : user._id});
                }
            },
            {
                find(user ) {
                    return Entreprise.find({userId : user._id});
                }
            }
        ]
    }
});



Meteor.publishComposite('Users.parentCompany', function () {
  return {
    find() {
      return Meteor
          .users
          .find(this.userId);
    },
    children: [
      {
        find(user ) {
          return Meteor.users.find({_id : user.companyId});
        }
      }
    ]
  }
});

