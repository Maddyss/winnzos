import { AdresseSchema } from "./SchemaModel";

export const ProfileUserSchema = new SimpleSchema({
    Nom:{
        type:String,
        max: 100,
        label: 'Nom'
    },
    Prenom:{
        type:String,
        max: 100,
        label: 'Prenom'
    },
    Adresse:{
        type:[AdresseSchema],
        minCount: 1
    },
    Telephone:{
        type:String,
        regEx:/(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/,
        label: 'Numéro de Téléphone',
        optional: true
    },
    Email:{
        type: String,
        regEx:SimpleSchema.RegEx.Email,
        label: 'E-mail',
        optional: true
    },
    siteWeb:{
        type: String,
        regEx:/^(http|https|ftp):\/\/([\w]*)\.([\w]*)\.(com|net|org|biz|info|mobi|us|cc|bz|tv|ws|name|co|me)(\.[a-z]{1,3})?\z/,
        label: 'Site Web',
        optional: true
    },
    Facebook: {
        type: String,
        label: 'Compte Facebook',
        optional: true
    },
    LienFacebook: {
        type: String,
        regEx:/^(http|https|ftp):\/\/([\w]*)\.([\w]*)\.(com|net|org|biz|info|mobi|us|cc|bz|tv|ws|name|co|me)(\.[a-z]{1,3})?\z/,
        label: 'Lien vers Facebook',
        optional: true
    },
    Twitter: {
        type: String,
        label: 'Compte Twitter',
        optional: true
    },
    LinkedIn: {
        type: String,
        label: 'Compte LinkedIn',
        optional: true
    },
    Descriptions: {
        type:String,
        max: 100000,
        label: "Déscriptions profil personnel",
        optional: true
    }
});

export const ProfileSocieteSchema = new SimpleSchema({
    SocieteName: {
        type: String,
        max: 200,
        label: 'Nom commercial de votre entreprise'
    },
    AdresseFacturation: {
        type:[AdresseSchema],
        minCount: 1
    },
    AdresseSiege: {
        type: [AdresseSchema],
        minCount: 1
    },
    Siren: {
        type: String,
        max: 16,
        label: 'Numéro Siren'
    },
    Capital: {
        type: Number,
        label: 'Capital Social'
    },
    NumeroTvaIntraComm: {
        type: String,
        label: 'Numéro de TVA intracommunautaire'
    },
    FormeJuridique: {
        type: String,
        label: 'La forme juridique de votre entreprise'
    },
    SiretSiege: {
        type: String,
        label: 'Le numéro de Siret du Siège Social'
    },
    Effectif: {
        type: Number,
        label: 'Nombre d\'employé'
    },
    DateCreation: {
        type: Date,
        label: 'La date de création'
    },
    CategorieEntreprise: {
        type: String,
        label: "Catégorie de l'entreprise"
    },
    TrancheEffectifIntitule: {
        type: String,
        label: 'Intitule Tranche Effectif de votre entreprise'
    },
    Exercices: {
        type: new SimpleSchema({
            ChiffreAffaire: {
                type: Number,
                label: "Chiffre d'Affaire"
            },
            DateDeb: {
                type: Date,
                label: "Date de début d'activité"
            },
            DateFin: {
                type: Date,
                label: "Date de fin de l'activité"
            }
        })
    },
    PersonnePhysique: {
        type:  new SimpleSchema({
            Nom: {
                type: String,
                label: "Nom de la personne physique"
            },
            prenom: {
                type: String,
                label: "Prénom de la personne physique"
            },
            fonction: {
                type: String,
                label: "Fonction dans l'entreprise"
            },
            dirigeant: {
                type: String
            },
            dateNaissance: {
                type: Date,
                label: "Date de naissance"
            }
        })
    },
    PersonneMorale: {
        type:  new SimpleSchema({
            fonction: {
                type: String,
                label: "Fonction de la personne morale"
            },
            dirigeant: {
                type: String
            },
            raison_sociale: {
                type: String,
                label: "Raison sociale"
            }
        })
    }
});