/**
 * Created by root on 27/08/16.
 */
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';
import { DocHead } from 'meteor/kadira:dochead';
import moment from 'moment';

function configSEO(url, title, description, image ){
    "use strict";
    check(url, String);
    check(title, String);
    check(description, String);
    check(image, String);


    DocHead.setTitle(title);
    const metaUrl = { name: 'url', content: 'https://www.winnzos.fr' + url};
    const metaInfo = { name: 'description', content: description };
    const expires = { 'http-equiv': "EXPIRES", content: moment().add(30, 'days').format('llll')};
    DocHead.addMeta(metaInfo);
    DocHead.addMeta(metaUrl);
    DocHead.addMeta(expires);
    DocHead.addMeta({
        property: "og:title",
        content: title
    });
    DocHead.addMeta({
        property: "og:type",
        content: "website"
    });
    DocHead.addMeta({
        property: "og:image",
        content: "https://www.winnzos.fr/front/logo-winnzos.png"
    });
    DocHead.addMeta({
        property: "og:url",
        content: "https://www.winnzos.fr" + url
    });
    DocHead.addMeta({
        property: "og:site_name",
        content: "Winnzos"
    });
    DocHead.addMeta({
        property: "og:locale",
        content: "fr_FR"
    });
    DocHead.addMeta({
        property: "og:description",
        content: description
    });
}

function concordanceRegion(regionId){
    "use strict";
    check(regionId, Number);
    let NameRegion = 'France';

    if(regionId === 75){
        NameRegion = "Aquitaine Limousins Poitou-Charentes";
    }
    else if(regionId === 44){
        NameRegion = "Alsace Champagne-Ardenne Lorraine";
    }
    else if(regionId === 84){
        NameRegion = "Auvergne-Rhone-Alpes";
    }
    else if(regionId === 94){
        NameRegion = "Corse";
    }
    else if(regionId === 28){
        NameRegion = "Normandie";
    }
    else if(regionId === 27){
        NameRegion = "Bourgogne Franche-Comté";
    }
    else if(regionId === 53){
        NameRegion = "Bretagne";
    }
    else if(regionId === 24){
        NameRegion = "Centre Val de Loire";
    }
    else if(regionId === 11){
        NameRegion = "Ile-de-France";
    }
    else if(regionId === 76){
        NameRegion = "Languedoc-Roussillon Midi-Pyrénées";
    }
    else if(regionId === 32){
        NameRegion = "Nord-Pas-de-Calais Picardie";
    }
    else if(regionId === 52){
        NameRegion = "Pays de la Loire";
    }
    else if(regionId === 93){
        NameRegion = "Provence-Alpes-Cote d'Azur";
    }
    else if(regionId === 100){
        NameRegion = "Toute la France";
    }
    else if(regionId === 1){
        NameRegion = "Etrangers";
    }
    else if(regionId === 99){
        NameRegion = "DOM TOM";
    }

   return NameRegion;
}

function concordanceActivites(activiteId){
    "use strict";
    let metier = '';
    let title = '';
    let title2 = '';
    let description = '';
    let description2 = '';
    if(activiteId === "SE3"){
        metier = "Coiffeur";
        title = 'Coiffeur Visagiste sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne';
        description = "Les meilleurs coiffeurs disponnible et prendre rendez-vous en ligne gratuitement avec un Coiffeur sur";
    }
    else if(activiteId === "SE4"){
        metier = "Coiffeur à domicile";
        title = 'Coiffeur à domicile sur ';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne';
        description = "Les meilleurs Coiffeur à domicile disponnible et prendre rendez-vous en ligne gratuitement avec un Coiffeur à domicile sur";
    }
    else if(activiteId === "SE8"){
        metier = "Estheticienne";
        title = 'Esthéticienne sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne';
        description = "Les meilleurs Esthéticiennes disponnible et prendre rendez-vous en ligne gratuitement avec une Esthéticienne sur";
    }
    else if(activiteId === "SE18"){
        metier = "Veterinaire";
        title = 'Clinique Véterinaire sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne';
        description = "Les meilleurs Véterinaires disponnible et prendre rendez-vous en ligne gratuitement avec un Véterinaire sur";
    }
    else if(activiteId === "SE12"){
        metier = "Paysagiste";
        title = 'Paysagiste sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Les meilleurs Architecte Jardinier Paysagiste disponnible et prendre rendez-vous en ligne gratuitement avec un Paysagiste sur";
    }
    else if(activiteId === "SE15"){
        metier = "Location voiture";
        title = 'Location de voiture sur ';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs entreprise de location de voiture sur ";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous en ligne avec l'entreprise de votre choix."
    }
    else if(activiteId === "SE6"){
        metier = "Pompe Funebre";
        title = 'Pompe Funebre sur';
        description = "Les meilleurs Pompe Funebre disponnible et prendre rendez-vous en ligne gratuitement avec un Pompe Funebre sur";
    }
    else if(activiteId === "BE1"){
        metier = "Epilation";
        title = 'Epilation sur';
        description = "Les meilleurs professionnels de l'épilation et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "BE2"){
        metier = "Massage";
        title = 'Massage sur';
        description = "Les meilleurs professionnels de Massage, soins, bien-être et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "BE3"){
        metier = "Manucure";
        title = 'Manucure sur';
        description = "Les meilleurs professionnels de la Manucure, pose d'ongles et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "BE4"){
        metier = "Soins visage";
        title = 'Soins visage sur';
        description = "Les meilleurs professionnels de Soins visage, corps et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "E1"){
        metier = "Animateur de soirée";
        title = 'Animateur de soirée sur';
        description = "Les meilleurs professionnels de Animateur de soirée et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "E2"){
        metier = "Photographe";
        title = 'Photographe sur';
        description = "Les meilleurs Photographe disponnible et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "E3"){
        metier = "Magicien";
        title = 'Magicien sur';
        description = "Les meilleurs Magicien disponnible et prendre rendez-vous en ligne gratuitement sur";
    }
    else if(activiteId === "SE1"){
        metier = "Garage";
        title = 'Garage automobile sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Garagiste sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "SE2"){
        metier = "Blanchisserie";
        title = 'Blanchisserie sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Blanchisseries sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "SE14"){
        metier = "Decontamination";
        title = 'Décontamination sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Les meilleurs entreprises de Décontamination disponnible et prendre rendez-vous en ligne gratuitement avec une entreprise de Décontamination sur";
    }
    else if(activiteId === "S1"){
        metier = "Docteur";
        title = 'Docteur sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Docteurs disponnible et prendre rendez-vous en ligne gratuitement avec un Docteur sur";
    }
    else if(activiteId === "S3"){
        metier = "Dentiste";
        title = 'Chirurgien Dentiste sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Dentistes disponnible et prendre rendez-vous en ligne gratuitement avec un Dentiste sur";
    }
    else if(activiteId === "S4"){
        metier = "Dieteticien";
        title = 'Dietéticien sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Dieteticiens disponnible et prendre rendez-vous en ligne gratuitement avec un Dieteticien sur";
    }
    else if(activiteId === "S5"){
        metier = "Gynecologue";
        title = 'Gynecologue Obstétricien sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Gynecologues obstétricien disponnible et prendre rendez-vous en ligne gratuitement avec un Gynecologues obstétricien sur";
    }
    else if(activiteId === "S6"){
        metier = "Ophtalmologiste";
        title = 'Ophtalmologiste sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Ophtalmologistes disponnible et prendre rendez-vous en ligne gratuitement avec un Ophtalmologiste sur";
    }
    else if(activiteId === "S7"){
        metier = "Orthophoniste";
        title = 'Orthophoniste sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Orthophonistes disponnible et prendre rendez-vous en ligne gratuitement avec un Orthophoniste sur";
    }
    else if(activiteId === "S8"){
        metier = "Ostheopathe";
        title = 'Ostheopathe sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Ostheopathes disponnible et prendre rendez-vous en ligne gratuitement avec un Ostheopathe sur";
    }
    else if(activiteId === "TLC1"){
        metier = "Club de Sport";
        title = 'Réservez un cours de fitness sur';
        description = "Les meilleurs cours de fitness disponnible et prendre rendez-vous en ligne gratuitement avec un cours de fitness sur";
    }
    else if(activiteId === "TLC2"){
        metier = "Hotel";
        title = 'Réservez un Hotel sur';
        description = "Posez votre question à un Hotel sur";
        description2 = "et Reservez une chambre pour votre séjour."
    }
    else if(activiteId === "TLC3"){
        metier = "Camping";
        title = 'Réservez un Camping sur';
        description = "Posez votre question à un Camping sur";
        description2 = "et Reservez un emplacement pour votre séjour."
    }
    else if(activiteId === "TLC4"){
        metier = "Chambre d'hote";
        title = "Réservez une Chambre d hote sur";
        description = "Posez votre question à un Responsable de Chambre d hote sur";
        description2 = "et Reservez votre chambre pour votre séjour."
    }
    else if(activiteId === "E1"){
        metier = "Auto ecole";
        title = 'Auto ecole sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Paysagistes disponnible et prendre rendez-vous en ligne gratuitement avec un Paysagiste sur";
    }
    else if(activiteId === "E2"){
        metier = "Coach Sportif";
        title = 'Coach Sportif sur';
        title2 = '- Prendre Rendez-vous en ligne gratuitement';
        description = "Les meilleurs Coachs Sportifs disponnible et prendre rendez-vous en ligne gratuitement avec un Coach Sportif sur";
    }
    else if(activiteId === "BI1"){
        metier = "Agent immobilier";
        title = 'Agence immobilière sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne';
        description = "Les meilleurs Agences immobilières disponnible et prendre rendez-vous en ligne gratuitement avec un Agent immobilier sur";
    }
    else if(activiteId === "BI2"){
        metier = "Architecte";
        title = 'Architecte sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne'
        description = "Les meilleurs Architectes disponnible et prendre rendez-vous en ligne gratuitement avec un Architecte sur";
    }
    else if(activiteId === "BI3"){
        metier = "Travaux maison";
        title = 'Travaux pour votre maison sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs artisans sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI4"){
        metier = "Carreleur";
        title = 'Carreleur sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Carreleurs sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI5"){
        metier = "Electricien";
        title = 'Electricien sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Electriciens sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI6"){
        metier = "Macon";
        title = 'Macon sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Macons sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI7"){
        metier = "Bricolage";
        title = 'Entrepot du Bricolage sur';
        description = "Retrouvez toutes les magasins de Bricolage sur";
    }
    else if(activiteId === "BI8"){
        metier = "Menuisier";
        title = 'Demandez un devis à un Menuisier sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Menuisiers sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI9"){
        metier = "Peintre en batiment";
        title = 'Peintre en batiment sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs Peintres en batiment sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI10"){
        metier = "Platrier";
        title = 'Plâtrier sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs entreprises de Plâtrierie sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI12"){
        metier = "Serrurier";
        title = 'Serrurier sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs entreprises de Serruriers sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI13"){
        metier = "Terrassement";
        title = 'Entreprise de Terrassement sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs entreprises de Terrassement sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI15"){
        metier = "Isolation";
        title = "Entreprise d'Isolation thermique / toiture sur";
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs entreprises d'Isolation thermique ou toiture sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "BI16"){
        metier = "Plombier";
        title = 'Plombier / Chauffagiste sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Retrouvez les meilleurs entreprises de Plombiers Chauffagiste sur";
        description2 = "et demandez un devis en ligne gratuitement ou prendre rendez-vous avec l'entreprise de votre choix."
    }
    else if(activiteId === "A1"){
        metier = "Boulanger";
        title = 'Boulanger patissier sur';
        title2 = '- Demandez un Devis en ligne gratuitement et prendre rendez-vous';
        description = "Les meilleurs Boulangers Patissiers disponnible et demandez un devis en ligne gratuitement à un Boulanger Patissier sur";
    }
    else if(activiteId === "A3"){
        metier = "Traiteur";
        title = 'Traiteur sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne';
        description = "Les meilleurs Traiteur disponnible et prendre rendez-vous en ligne gratuitement avec un Traiteur sur";
    }
    else if(activiteId === "A4"){
        metier = "Supermarche";
        title = 'Trouvez un Supermarche sur';
        description = "Retrouvez tous les Supermarche sur";
    }
    else if(activiteId === "A5"){
        metier = "Confiseur Glacier";
        title = 'Trouvez un Confiseur Glacier sur';
        description = "Retrouvez tous les Confiseurs Glaciers sur";
    }
    else if(activiteId === "A6"){
        metier = "Coiffeur à domicile";
        title = 'Patissier sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne'
        description = "Les meilleurs Patissiers disponnible et prendre rendez-vous en ligne gratuitement avec un Patissier sur";
    }
    else if(activiteId === "A8"){
        metier = "Restaurant traditionnel";
        title = 'Réservez une table dans un Restaurant traditionnel sur';
        description = "Les meilleurs Restaurants traditionnels disponnible proche de chez-vous et réservez en ligne gratuitement dans un restaurant sur";
    }
    else if(activiteId === "A9"){
        metier = "Restauration rapide";
        title = 'Réservez une table en Restauration rapide sur';
        description = "Les meilleurs fast-food disponnible sur";
    }
    else if(activiteId === "C1"){
        metier = "Magasin";
        title = 'Trouvez une boutique sur ';
        description = "Retrouvez toutes les boutiques sur";
    }
    else if(activiteId === "C2"){
        metier = "Magasin de vetement et chaussure";
        title = 'Trouvez une boutique de Chaussure et vetement sur';
        description = "Retrouvez toutes les boutique de Chaussure et vetement sur";
    }
    else if(activiteId === "C3"){
        metier = "Boutique de bricolage";
        title = 'Trouvez un Magasin de Bricolage sur';
        description = "Retrouvez tous les Magasins de Bricolage sur";
    }
    else if(activiteId === "C4"){
        metier = "Magasin de meuble";
        title = 'Trouvez une boutique de meuble sur';
        description = "Retrouvez tous les Magasins de meuble sur";
    }
    else if(activiteId === "C5"){
        metier = "Boutique de sport";
        title = 'Trouvez un Magasin de sport sur';
        description = "Retrouvez touste les Boutiques de sport sur";
    }
    else if(activiteId === "C6"){
        metier = "Magasin produit de beaute";
        title = 'Trouvez une Boutique de produit de beauté sur';
        description = "Retrouvez touste les Boutiques de produit de beauté sur";
    }
    else if(activiteId === "C7"){
        metier = "Fleuriste";
        title = 'Fleuriste sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne'
        description = "Prise de rendez-vous en ligne avec un Fleuriste sur";
    }
    else if(activiteId === "SFJ1"){
        metier = "Avocat";
        title = 'Avocat / Cabinet juridique sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne'
        description = "Les meilleurs Cabinets juridiques disponnible et prendre rendez-vous en ligne gratuitement avec un Avocat sur";
    }
    else if(activiteId === "SFJ2"){
        metier = "Expert comptable";
        title = 'Cabinet de Comptabilité sur';
        title2 = '- Prendre Rendez-vous en ligne, Devis en ligne'
        description = "Les meilleurs experts-comptables disponnible et prendre rendez-vous en ligne gratuitement avec un cabinet de Comptabilité sur";
    }
    else{
        metier = "Entreprise de service";
        title = 'Prendre RDV en ligne en ligne avec une Entreprise de service sur';
        description = "Prise de rendez-vous en ligne avec une Entreprise de service sur";
    }
    return {title, title2, description, metier, description2};
}

export { configSEO };
export { concordanceRegion, concordanceActivites };