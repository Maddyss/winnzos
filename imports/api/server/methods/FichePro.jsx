import { Meteor } from 'meteor/meteor';

import { FichePro } from '/imports/api/collection/collection';

Meteor.methods({
    "insert.FichePro.methods": function(ObjetFichePro) {
        check(ObjetFichePro, {
            fichePro: {
                activiteId: String,
                activiteName: String,
                nomCommercial: String,
                description: String,
                Adresse: {
                    Ville: String,
                    Voie: String,
                    ZipCode: String
                },
                regionId: Number,
                regionName: String,
                siret: String,
                UserId: String,
                valid: Boolean,
                position: Object
            }
        });

        let verifNoFiche = FichePro.find({userId : ObjetFichePro.fichePro.UserId});
        if(verifNoFiche.count() === 0 && ObjetFichePro.fichePro.UserId.length > 0)
        {
            let fichePro = FichePro.insert({
                activiteId: ObjetFichePro.fichePro.activiteId.length > 0 ? ObjetFichePro.fichePro.activiteId : 0,
                activiteName: ObjetFichePro.fichePro.activiteName.length > 0 ? ObjetFichePro.fichePro.activiteName.trim() : 0,
                nomCommercial: ObjetFichePro.fichePro.nomCommercial.length > 0 ? ObjetFichePro.fichePro.nomCommercial.trim() : '',
                description: ObjetFichePro.fichePro.description.length > 0 ? ObjetFichePro.fichePro.description.trim() : '',
                Adresse: {
                    Ville: ObjetFichePro.fichePro.Adresse.Ville.length > 0 ? ObjetFichePro.fichePro.Adresse.Ville.trim() : '',
                    Voie: ObjetFichePro.fichePro.Adresse.Voie.length > 0 ? ObjetFichePro.fichePro.Adresse.Voie.trim() : '',
                    ZipCode: ObjetFichePro.fichePro.Adresse.ZipCode.length > 0 ? parseInt(ObjetFichePro.fichePro.Adresse.ZipCode) : 0
                },
                regionId: ObjetFichePro.fichePro.regionId > 0 ? parseInt(ObjetFichePro.fichePro.regionId) : 0,
                regionName: ObjetFichePro.fichePro.regionName.length > 0 ? ObjetFichePro.fichePro.regionName.trim() : 0,
                siret: ObjetFichePro.fichePro.siret.length > 0 ? ObjetFichePro.fichePro.siret.trim() : '',
                userId: ObjetFichePro.fichePro.UserId.trim(),
                valid: ObjetFichePro.fichePro.valid,
                position: ObjetFichePro.fichePro.position,
                prorenseigne: false
            });
            return fichePro;
        }
        else if (ObjetFichePro.fichePro.UserId.length > 0)
        {
            Meteor.call("update.FichePro.methods", ObjetFichePro);
        }
        else{
            console.log("insert.FichePro.methods " + this.userId + ' Donnée fournie ' + ObjetFichePro.fichePro);
        }

    },
    "update.FichePro.methods": function(ObjetFichePro) {
        check(ObjetFichePro, {
            fichePro: {
                activiteId: String,
                activiteName: String,
                nomCommercial: String,
                description: String,
                Adresse: {
                    Ville: String,
                    Voie: String,
                    ZipCode: String
                },
                regionId: Number,
                regionName: String,
                siret: String,
                UserId: String,
                valid: Boolean,
                position: Object
            }
        });

        let verifNoFiche = FichePro.find ({ userId: ObjetFichePro.fichePro.UserId });
        if ( verifNoFiche.count () > 0 ) {
            FichePro.update ({ userId: ObjetFichePro.fichePro.UserId }, {
                $set: {
                    activiteId:    ObjetFichePro.fichePro.activiteId.length > 0 ? ObjetFichePro.fichePro.activiteId : 0,
                    nomCommercial: ObjetFichePro.fichePro.nomCommercial.length > 0 ? ObjetFichePro.fichePro.nomCommercial.trim () : '',
                    description:   ObjetFichePro.fichePro.description.length > 0 ? ObjetFichePro.fichePro.description.trim () : '',
                    Adresse:       {
                        Ville:   ObjetFichePro.fichePro.Adresse.Ville.length > 0 ? ObjetFichePro.fichePro.Adresse.Ville.trim () : '',
                        Voie:    ObjetFichePro.fichePro.Adresse.Voie.length > 0 ? ObjetFichePro.fichePro.Adresse.Voie.trim () : '',
                        ZipCode: ObjetFichePro.fichePro.Adresse.ZipCode.length > 0 ? parseInt (ObjetFichePro.fichePro.Adresse.ZipCode) : 0
                    },
                    regionId:      ObjetFichePro.fichePro.regionId > 0 ? parseInt (ObjetFichePro.fichePro.regionId) : 0,
                    regionName:    ObjetFichePro.fichePro.regionName.length > 0 ? ObjetFichePro.fichePro.regionName.trim () : 0,
                    siret:         ObjetFichePro.fichePro.siret.length > 0 ? ObjetFichePro.fichePro.siret.trim () : '',
                    valid: ObjetFichePro.fichePro.valid.trim()
                }
            });
        }
        else {
            Meteor.call ("insert.FichePro.methods", ObjetFichePro);
        }
    },
    "Methods.update.fichePro": function(ficheProId) {
        check(ficheProId, String);

        let verifNoFiche = FichePro.find(ficheProId);
        if (verifNoFiche.count() > 0) {
            FichePro.update(ficheProId, {
                $set: {prorenseigne: true}
            });
        }
    }
});