/**
 * Created by root on 20/01/17.
 */
import builder from 'botbuilder';
import moment from 'moment';
import Future from 'fibers/future';

// Create chat bot
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

Meteor.methods ({
    convWinnBot: function (demande) {
        "use strict";
        check(demande, { message : String});
        var future = new Future();
        var callback = future.resolver();


    }
});