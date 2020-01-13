import { Meteor } from 'meteor/meteor';
import { Notification, Entreprise, FichePro, Count, CommuneParRegion } from '/imports/api/collection/collection';
import { Images } from '/imports/api/collection/collection-images';
import { check } from 'meteor/check';
import Fuse from 'fuse.js';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('notification.limit5', function() {
    if (!this.userId) {
        return this.ready();
    }
    return Notification.find({}, {limit: 5});
});

Meteor.publish('infoSociete.Modification', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Entreprise.find({userId: this.userId});
});

Meteor.publish('fichePro', function() {
    "use strict";
    const options = {
        fields: {
            _id:           true,
            activiteId:    true,
            nomCommercial: true,
            description:   true,
            Adresse:       true,
            regionId:      true,
            regionName:    true,
            userId:        true
        }
    };

    return FichePro.find({ valid: true }, options);
});

Meteor.publish('fichePros', function(regionId, activiteId, term) {
    console.log('fichePro publish ' + regionId + activiteId + term);
    check(regionId, Number);
    check(activiteId, String);
    check(term, String);

        const options = {
            fields: {
                _id:           true,
                activiteId:    true,
                nomCommercial: true,
                description:   true,
                Adresse:       true,
                regionId:      true,
                regionName:    true,
                userId:        true
            }
        };

        let fiche = null;
        if(term.length > 0)
        {
            if(parseInt(regionId) === 100 && (activiteId === "-1" || activiteId === "" || activiteId === "0")){
                console.log('Aucun');
                fiche = FichePro.find({ valid: true }, options);
            }
            else if((activiteId === "-1" || activiteId === "" || activiteId === "0") && parseInt(regionId) !== 100) {
                console.log('RegionId uniquement :' + regionId);
                fiche = FichePro.find({regionId: regionId, valid: true}, options);
            }
            else if(activiteId.length > 2 && parseInt(regionId) === 100) {
                console.log('activiteId uniquement :' + activiteId);
                fiche = FichePro.find({activiteId: activiteId, valid: true}, options);
            }
            else {
                console.log('activiteId :' + activiteId + ' RegionId : ' + regionId);
                fiche = FichePro.find({regionId: regionId, activiteId: activiteId, valid: true}, options);
            }

            let res;
            fiche = fiche.fetch();
            let fuse = new Fuse(fiche, {shouldSort:true, threshold: 0.4, maxPatternLength: 32, keys:["nomCommercial", "description"]});
            let result = fuse.search(term);
            result = result.map(function(n, i){
                return n._id;
            });

            Counts.publish(this, 'FichePro.Count', FichePro.find({_id: { $in: result }}) , { noReady: true });
            result = FichePro.find({_id: { $in: result }}, {limit: 24}, options);
            return result;
        }
        else {
            if(parseInt(regionId) === 100 && (activiteId === "-1"|| activiteId === "" || activiteId === "0")){
                console.log('Aucun');
                Counts.publish(this, 'FichePro.Count', FichePro.find({activiteId: activiteId, valid: true}), { noReady: true });
                fiche = FichePro.find({ valid: true }, {limit: 24}, options);
            }
            else if((activiteId === "-1" || activiteId === "" || activiteId === "0") && parseInt(regionId) !== 100) {
                console.log('RegionId uniquement :' + regionId);
                Counts.publish(this, 'FichePro.Count', FichePro.find({activiteId: activiteId, valid: true}), { noReady: true });
                fiche = FichePro.find({regionId: regionId, valid: true}, {limit: 24}, options);
            }
            else if(activiteId.length > 2 && parseInt(regionId) === 100) {
                console.log('activiteId uniquement :' + activiteId);
                Counts.publish(this, 'FichePro.Count', FichePro.find({activiteId: activiteId, valid: true}), { noReady: true });
                fiche = FichePro.find({activiteId: activiteId, valid: true}, {limit: 24}, options);
            }
            else {
                console.log('activiteId :' + activiteId + ' RegionId : ' + regionId);
                Counts.publish(this, 'FichePro.Count', FichePro.find({regionId: regionId, activiteId: activiteId, valid: true}), { noReady: true });
                fiche = FichePro.find({regionId: regionId, activiteId: activiteId, valid: true}, {limit: 24}, options);
            }

            return fiche;
        }

});

Meteor.publish('fichePro.id', function(ficheProId) {
    check(ficheProId, String);
    console.log(ficheProId);
    return FichePro.find (ficheProId, {
        fields: {
            _id: true, activiteId: true, activiteName: true, nomCommercial: true, description: true, Adresse: true, regionId: true,
            regionName: true, userId: true, siret: true, prorenseigne: true, position: true
        }
    });
});

Meteor.publish('fichePro.modification', function() {
    if (!this.userId) {
        return this.ready();
    }

    return FichePro.find({userId: this.userId});
});

Meteor.publish('infoSociete.FichePro', function(proId) {
    check(proId, String);
    let valid = Match.test(proId, String);
    if(!valid){ console.log('infoSociete.FichePro ' + proId); return []; }
    else {
        return Entreprise.find ({ userId: proId });
    }
});

Meteor.publish('get.images.pro', function (userId) {
    check (userId, String);
    
    return Images.find({'userId': userId}).cursor;
});

Meteor.publish('get.communes.by.region', function (regionId) {
    check (regionId, String);

    return CommuneParRegion.find({'fields.reg_code': regionId});
});

function ficheProSingle(ficheProId) {
  try {
    check(ficheProId, String);
    const options = {
      fields: {
        Adresse: true,
        userId: true,
      },
    };
    const res = FichePro.find(ficheProId, options);
    if (res.count() !== 1) {
      return this.ready();
    }
    return res;
  } catch (err) {
    return this.ready();
  }
}
Meteor.publish('fichePro.single', ficheProSingle);
