/**
 * Created by root on 19/08/16.
 */

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods ({
    validationCAPTCHA: function (response) {
        check(response, { response: String });
        let clientIP = this.connection.clientAddress;
        let retour = response.response;

        HTTP.call('POST', 'https://www.google.com/recaptcha/api/siteverify?secret=6Ld6ACgTAAAAAMC_8DNGFzIx09n3WwxG84eIBHnl&response=' + retour + '&remoteip='+ clientIP,
            function( error, response ) {
                if ( error ) {
                    console.log (error);
                }
                else {
                    //console.log (response);
                }
        });
    },
    'Methods.Get.Place.Details': function (placeId) {
        check(placeId, String);
        var res = HTTP.get("https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDQ94-VQXQghUx5gLOu-N3_u57LQtP3C7E&language=fr&placeid=" + placeId);
        console.log(res);
        return res;
    },
    'Methods.Get.Adresse': function (localisation) {
        check(localisation, Object);
        var res = HTTP.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAhbI9m9Df4FnEUrrzW7lkS6mYYiYNGD88&latlng=" + localisation.lat + ',' + localisation.lng);
        return res;
    },
    'Methods.Get.Adresse.String': function (adresse) {
        check(adresse, String);
        adresse = adresse.replace(/[^\x20-\x7E]+/g, '');
        var res = HTTP.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAhbI9m9Df4FnEUrrzW7lkS6mYYiYNGD88&address=" + adresse );
        return res;

    }
});