import { Meteor } from 'meteor/meteor';

import { Entreprise } from '/imports/api/collection/collection';

Meteor.methods ({
    "insert.Societe.methods": function (infoSociete) {
        console.log(infoSociete);
        check(infoSociete, {
            ObjetSociete: {
                UserId: String,
                SocieteName: String,
                titreContact: String,
                AdresseSiege: {
                    ville: String,
                    voie: String,
                    zipcode: String
                },
                roleEntreprise: String,
                siteWeb: String,
                lienFacebook: String,
                lienTwitter: String,
                telContact: String,
                mailContact: String,
                descriptions: String,
                activiteId: String,
                activiteName: String,
                regionId: Number,
                regionName: String,
                fichePro: String,
                Certifie: Boolean
            }
        });

        let societe        = infoSociete.ObjetSociete;
        let verifNoSociete = Entreprise.find ({ userId: societe.UserId });
        //isValid = Match.test(societe, ProfileSocieteSchema);

        let now    = new Date ().getTime ();
        let userId = Meteor.userId ();

        if ( verifNoSociete.count () === 0 && userId.toString ().length > 0 ) {
            let insertCompteSocieteId = Entreprise.insert ({
                SocieteName:    societe.SocieteName ? societe.SocieteName.trim () : '',
                titreContact:   societe.titreContact ? societe.titreContact.trim () : '',
                AdresseSiege:   {
                    Ville:   societe.AdresseSiege ? societe.AdresseSiege.ville.trim () : '',
                    Voie:    societe.AdresseSiege ? societe.AdresseSiege.voie.trim () : '',
                    ZipCode: societe.AdresseSiege ? societe.AdresseSiege.zipcode.trim () : ''
                },
                roleEntreprise: societe.roleEntreprise ? societe.roleEntreprise.trim () : '',
                siteWeb:        societe.siteWeb ? societe.siteWeb.trim () : '',
                lienFacebook:   societe.lienFacebook ? societe.lienFacebook.trim () : '',
                lienTwitter:    societe.lienTwitter ? societe.lienTwitter.trim () : '',
                Certifie:       false,
                telContact:     societe.telContact ? societe.telContact.trim () : '',
                mailContact:    societe.mailContact ? societe.mailContact.trim () : '',
                descriptions:   societe.descriptions ? societe.descriptions.trim () : '',
                activiteId:     societe.activiteId ? societe.activiteId : -1,
                activiteName:   societe.activiteName.length > 0 ? societe.activiteName.trim () : 0,
                regionId:       parseInt (societe.regionId) > 0 ? parseInt (societe.regionId) : -1,
                regionName:     societe.regionName.length > 0 ? societe.regionName.trim () : 0,
                valid:          true,
                fichePro:       societe.fichePro ? societe.fichePro.trim () : 0,
                userId:         userId,
                time:           now
            });
            return insertCompteSocieteId;
        }
        else if ( societe.UserId.length > 0 ) {
            Meteor.call ("update.Societe.methods", infoSociete);
        }


    },
    "update.Societe.methods":                    function (infoSociete) {
        check(infoSociete, {
            ObjetSociete: {
                UserId: String,
                SocieteName: String,
                titreContact: String,
                AdresseSiege: {
                    ville: String,
                    voie: String,
                    zipcode: String
                },
                roleEntreprise: String,
                siteWeb: String,
                lienFacebook: String,
                lienTwitter: String,
                telContact: String,
                mailContact: String,
                descriptions: String,
                activiteId: String,
                activiteName: String,
                regionId: Number,
                regionName: String,
                fichePro: String,
                Certifie: Boolean
            }
        });


        let societe = infoSociete.ObjetSociete;
        check (societe.UserId, String);
        let verifNoSociete = Entreprise.find ({ userId: societe.UserId });
        //isValid = Match.test(compte, ProfileSocieteSchema);
        var now            = new Date ().getTime ();
        var userId         = Meteor.userId ();

        if ( verifNoSociete.count () > 0 && userId.length > 0 ) {
            let updateSociete = Entreprise.update ({ userId: userId }, {
                $set: {
                    SocieteName:    societe.SocieteName ? societe.SocieteName.trim () : '',
                    titreContact:   societe.titreContact ? societe.titreContact.trim () : '',
                    AdresseSiege:   {
                        Ville:   societe.AdresseSiege ? societe.AdresseSiege.ville.trim () : '',
                        Voie:    societe.AdresseSiege ? societe.AdresseSiege.voie.trim () : '',
                        ZipCode: societe.AdresseSiege ? societe.AdresseSiege.zipcode.trim () : ''
                    },
                    roleEntreprise: societe.roleEntreprise ? societe.roleEntreprise.trim () : '',
                    siteWeb:        societe.siteWeb ? societe.siteWeb.trim () : '',
                    lienFacebook:   societe.lienFacebook ? societe.lienFacebook.trim () : '',
                    lienTwitter:    societe.lienTwitter ? societe.lienTwitter.trim () : '',
                    Certifie:       societe.Certifie ? societe.Certifie : false,
                    telContact:     societe.telContact ? societe.telContact.trim () : '',
                    mailContact:    societe.mailContact ? societe.mailContact.trim () : '',
                    descriptions:   societe.descriptions ? societe.descriptions.trim () : '',
                    activiteId:     societe.activiteId ? societe.activiteId : -1,
                    activiteName:   societe.activiteName.length > 0 ? societe.activiteName.trim () : 0,
                    regionId:       parseInt (societe.regionId) > 0 ? parseInt (societe.regionId) : -1,
                    regionName:     societe.regionName.length > 0 ? societe.regionName.trim () : 0,
                    valid:          true,
                    fichePro:       societe.fichePro ? societe.fichePro.trim () : 0,
                    userId:         userId,
                    time:           now
                }
            });


            return updateSociete;
        }
        else {
            Meteor.call ("insert.Societe.methods", infoSociete);
        }

    },
    "insert.Societe.InfoComplementaire.methods": function (infoSociete) {
        let societe = infoSociete.ObjetSociete;
        check(infoSociete, {
            ObjetSociete: {
                UserId : String,
                Capital: Number,
                Effectif : Number,
                DateCreation : String,
                FormeJuridique :String,
                Siret :String
            }
        });

        let verifNoSociete = Entreprise.find ({ userId: societe.UserId });
        //isValid = Match.test(societe, ProfileSocieteSchema);

        let now    = new Date ().getTime ();
        let userId = Meteor.userId ();

        if ( verifNoSociete.count () === 0 && userId.toString ().length > 0 ) {
            let insertCompteSocieteId = Entreprise.insert ({
                siret:          societe.Siret ? societe.Siret.trim () : '',
                capital:        societe.Capital ? societe.Capital : '',
                formeJuridique: societe.FormeJuridique ? societe.FormeJuridique.trim () : '',
                effectif:       societe.Effectif ? societe.Effectif : '',
                dateCreation:   societe.DateCreation ? societe.DateCreation : '',
                valid:          true,
                userId:         userId,
                time:           now
            });
            return insertCompteSocieteId;
        }
        else if ( infoSociete.ObjetSociete.UserId.length > 0 ) {
            Meteor.call ("update.Societe.InfoComplementaire.methods", infoSociete);
        }

    },
    "update.Societe.InfoComplementaire.methods": function (infoSociete) {
        let societe = infoSociete.ObjetSociete;
       check(infoSociete, {
            ObjetSociete: {
                UserId : String,
                Capital: Number,
                Effectif : Number,
                DateCreation : String,
                FormeJuridique :String,
                Siret :String
            }
        });

        let verifNoSociete = Entreprise.find ({ userId: societe.UserId });
        //isValid = Match.test(compte, ProfileSocieteSchema);
        var now            = new Date ().getTime ();
        var userId         = Meteor.userId ();

        if ( verifNoSociete.count () > 0 && userId.toString ().length > 0 ) {
            let updateSociete = Entreprise.update ({ userId: userId }, {
                $set: {
                    siret:          societe.Siret ? societe.Siret.trim () : '',
                    capital:        societe.Capital ? societe.Capital : '',
                    formeJuridique: societe.FormeJuridique ? societe.FormeJuridique.trim () : '',
                    effectif:       societe.Effectif ? societe.Effectif : '',
                    dateCreation:   societe.DateCreation ? societe.DateCreation : '',
                    valid:          true,
                    userId:         userId,
                    time:           now
                }
            });


            return updateSociete;
        }
        else {
            Meteor.call ("insert.Societe.InfoComplementaire.methods", infoSociete);
        }
    },
    "update.Societe.Facturation.methods":        function (infoSocite) {
        let societe            = infoSocite.ObjetSociete;
        let verifNoFacturation = Entreprise.find ({ userId: societe.UserId }, { Banque: { $elemMatch: { Nom: societe.Name } } });
        //isValid = Match.test(compte, ProfileSocieteSchema);
        var now                = new Date ().getTime ();
        var userId             = Meteor.userId ();

        if ( verifNoFacturation.count () === 0 && userId.toString ().length > 0 ) {
            let updateSociete = Entreprise.update ({ userId: userId }, {
                $set: {
                    Facturation: {
                        AdresseFacturation: [{
                            Ville:   '',
                            Voie:    '',
                            ZipCode: ''
                        }],
                        Banque:             [{
                            Nom:     '',
                            Adresse: {
                                Ville:   '',
                                Voie:    '',
                                ZipCode: ''
                            },
                            Bic:     '',
                            IBAN:    ''
                        }],
                        NumeroFacture:      0,
                        time:               now,

                    }
                }
            });


            return updateSociete;
        }
        else {
            Meteor.call ("insert.Societe.methods", infoSocite);
        }
    }
});


