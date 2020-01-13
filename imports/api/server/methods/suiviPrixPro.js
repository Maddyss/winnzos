/**
 * Created by root on 18/09/16.
 */
import { Meteor } from 'meteor/meteor';

import { SuiviAchat } from './../../collection/collection';

Meteor.methods ({
    'Methods.Insert.SuiviAchat': function (userId, offres, prix) {
        "use strict";
        check(userId, String);
        check(offres, String);
        check(prix, Number);

        SuiviAchat.insert({
            userId: userId,
            offres: offres,
            prix: prix,
            acheter: false
        });
    }

});