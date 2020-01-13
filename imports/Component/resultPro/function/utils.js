import { Meteor } from 'meteor/meteor';
import lodash from "lodash";

function concordanceNomRegion(nomRegion) {
    "use strict";
    check(nomRegion[0].long_name, String);
    let NameRegion = 'France';
    nomRegion = lodash.deburr(nomRegion[0].long_name);

    if (nomRegion === lodash.deburr("Aquitaine-Limousin-Poitou-Charentes") ||
        nomRegion === lodash.deburr("Nouvelle-Aquitaine") ||
        nomRegion === lodash.deburr("New Aquitaine")) {
        NameRegion = 75;
    }
    else if (nomRegion === lodash.deburr("Alsace-Champagne-Ardenne-Lorraine") ||
        nomRegion === lodash.deburr("Grand Est")) {
        NameRegion = 44;
    }
    else if (nomRegion === lodash.deburr("Auvergne-Rhône-Alpes")) {
        NameRegion = 84;
    }
    else if (nomRegion === lodash.deburr("Corse") ||
        nomRegion === lodash.deburr("Corsica")) {
        NameRegion = 94;
    }
    else if (nomRegion === lodash.deburr("Normandie") ||
        nomRegion === lodash.deburr("Normandy")) {
        NameRegion = 28;
    }
    else if (nomRegion === lodash.deburr("Bourgogne-Franche-Comte")) {
        NameRegion = 27;
    }
    else if (nomRegion === lodash.deburr("Bretagne") ||
        nomRegion === lodash.deburr("Brittany")) {
        NameRegion = 53;
    }
    else if (nomRegion === lodash.deburr("Centre-Val de Loire")) {
        NameRegion = 24;
    }
    else if (nomRegion === lodash.deburr("Ile-de-France")) {
        NameRegion = 11;
    }
    else if (nomRegion === lodash.deburr("Languedoc-Roussillon Midi-Pyrénées") ||
        nomRegion === lodash.deburr("Occitanie")) {
        NameRegion = 76;
    }
    else if (nomRegion === lodash.deburr("Nord-Pas-de-Calais Picardie") ||
        nomRegion === lodash.deburr("Hauts-de-France")) {
        NameRegion = 32;
    }
    else if (nomRegion === lodash.deburr("Pays de la Loire")) {
        NameRegion = 52;
    }
    else if (nomRegion === lodash.deburr("Provence-Alpes-Côte d'Azur")) {
        NameRegion = 93;
    }
    else {
        NameRegion = 100;
    }

    return NameRegion;
}


function concordanceLocalisationRegion(idRegion) {
    "use strict";
    check(idRegion, Number);
    let coord = {};

    if (idRegion === 75) {
        coord = {
            lat: 44.837789, lng: -0.579180
        }
    }
    else if (idRegion === 44) {
        coord = {
            lat: 48.699803, lng: 6.187807
        }
    }
    else if (idRegion === 84) {
        coord = {
            lat: 45.764043, lng: 4.835659
        }
    }
    else if (idRegion === 94) {
        coord = {
            lat: 42.697283, lng: 9.450881
        }
    }
    else if (idRegion === 28) {
        coord = {
            lat: 49.443232, lng: 1.099971
        }
    }
    else if (idRegion === 27) {
        coord = {
            lat: 47.322047, lng: 5.041480
        }
    }
    else if (idRegion === 53) {
        coord = {
            lat: 48.117266, lng: -1.677793
        }
    }
    else if (idRegion === 24) {
        coord = {
            lat: 47.902964, lng: 1.909251
        }
    }
    else if (idRegion === 11) {
        coord = {
            lat: 48.856614, lng: 2.352222
        }
    }
    else if (idRegion === 76) {
        coord = {
            lat: 43.604652, lng: 1.444209
        }
    }
    else if (idRegion === 32) {
        coord = {
            lat: 50.629250, lng: 3.057256
        }
    }
    else if (idRegion === 52) {
        coord = {
            lat: 47.218371, lng: -1.553621
        }
    }
    else if (idRegion === 93) {
        coord = {
            lat: 43.296482, lng: 5.369780
        }
    }
    else {
        coord = {
            lat: 48.862725, lng: 2.287592000000018
        }
    }

    return coord;
}


function parseDurationInMinutes(duration) {
    if (duration.endsWith("h")) {
        return duration.substring(0, duration.length - 1) * 60;
    } else if (duration.endsWith("m")) {
        return duration.substring(0, duration.length - 1) * 1;
    }

    if (!isNaN(duration)) {
        return duration * 1;
    }
}

function roundDateToNextXMinutes(date, XMinutes) {
    var date = date.clone();
    var intervals = Math.floor(date.minutes() / XMinutes);
    if (date.minutes() % XMinutes != 0)
        intervals++;
    if (intervals == 4) {
        date.add('hours', 1);
        intervals = 0;
    }
    date.minutes(intervals * XMinutes);
    date.seconds(0);
    return date;
}



function convertMinutesToReadableSentence(minutes) {
    var hours = Math.floor(minutes / 60);
    var minutesLeft = minutes - hours * 60;

    var sentence = "";
    if (hours > 0) {
        sentence += hours + " heure" + (hours > 1 ? "s" : "");
    }

    if (minutesLeft > 0) {
        sentence += " " + minutesLeft + " minute" + (minutesLeft > 1 ? "s" : "");
    }

    if (sentence === "") {
        sentence = "0 minutes";
    }

    return sentence;
}

export { concordanceNomRegion, concordanceLocalisationRegion, parseDurationInMinutes, roundDateToNextXMinutes, convertMinutesToReadableSentence };