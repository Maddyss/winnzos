/**
 * Created by root on 02/09/16.
 */
import { Meteor } from 'meteor/meteor';

import { ListeRegion } from './../../collection/collection';

Meteor.methods ({
    concordanceRegion: function (idRegion) {
        check([idRegion], [Match.Any]);

        return ListeRegion.findOne({ idRegion: parseInt (idRegion) }, { fields: { nameRegion: true } });

    }
});