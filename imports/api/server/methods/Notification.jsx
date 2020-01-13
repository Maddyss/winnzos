import { Meteor } from 'meteor/meteor';

import { Notification } from '/imports/api/collection/collection';

Meteor.methods ({
    'Methods.Insert.Notification.NewVisit': function (proId) {
        check(proId, String);
        var now = new Date ().getTime ();

        Notification.insert ({ title: 'Nouvelle utilisateur visitant votre profil !', time: now, category: 'user', userId: proId });
    },
    'Methods.Insert.Notification.NewFriends': function (proId) {
        check(proId, String);
        var now = new Date ().getTime ();

        Notification.insert ({ title: 'Un client a sauvegardé votre contact !', category: 'private', time: now, userId: proId });
    },
    'Methods.Insert.Notification.RDV': function (proId) {
        check(proId, String);
        var now = new Date ().getTime ();

        Notification.insert ({ title: 'Nouvelle demande de rendez-vous !', category: 'visiteur', time: now, userId: proId });

    },
    'Methods.Insert.Notification.Message': function (proId) {
        check(proId, String);
        var now = new Date ().getTime ();

        Notification.insert ({ title: 'Nouveau message de contact !', category: 'private', time: now, userId: proId });
    }
});