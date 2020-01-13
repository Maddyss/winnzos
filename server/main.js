/**
 * Created by root on 14/08/16.
 */


import '/imports/api/server/methods/email';
import '/imports/api/Users';
import '/imports/api/Meetups';
import '/imports/api/server/methods/FichePro';
import '/imports/api/server/methods/Notification';
import '/imports/api/server/methods/Societe';
import '/imports/api/server/methods/captchaValidation';
import {Accounts} from 'meteor/accounts-base';
import 'meteor/service-configuration';
import {Meteor} from 'meteor/meteor';
import '/imports/api/server/methods/concordanceRegion';
import '/imports/api/server/methods/images';
import '/imports/api/server/methods/suiviPrixPro';

// Publications
import '/imports/api/Meetups/server/publications';
import '/imports/api/Message/server/publications';
import '/imports/api/userview/server/publications';
import '/imports/api/orders/server/publications';
import '/imports/api/Message/methods';
import '/imports/api/userview/methods';
import '/imports/api/promotioncodes/methods';
import '/imports/api/Message/methods';
import '/imports/api/orders/methods';
import '/imports/api/Users/server/publications';
import '/imports/api/WinnBot/WinnBotDevis';
import '/imports/api/WinnBot/WinnBotMicrosoft';

import startAutoSendReminderTask from './recurringtasks/message-reminders'
import startAutoCancelExpiredSubscriptions from './recurringtasks/auto-cancel-subscriptions'
import setupMercanetApis from './apis/mercanet.js';

Meteor.startup(() => {

    startAutoSendReminderTask();
    startAutoCancelExpiredSubscriptions();
    setupMercanetApis();

    BrowserPolicy
        .content
        .allowFontDataUrl();
    BrowserPolicy.content.allowOriginForAll('blob:');
    BrowserPolicy
        .content
        .allowOriginForAll("www.google-analytics.com");
    BrowserPolicy
        .content
        .allowOriginForAll("cdn.mxpnl.com");
    BrowserPolicy
        .content
        .allowOriginForAll("google.com");
    BrowserPolicy
        .content
        .allowOriginForAll("https://www.google.com");
    BrowserPolicy
        .content
        .allowOriginForAll('*.googleapis.com');
    BrowserPolicy
        .content
        .allowOriginForAll('*.googleusercontent.com');
    BrowserPolicy
        .content
        .allowOriginForAll('*.gstatic.com');
    BrowserPolicy
        .content
        .allowOriginForAll('*.tawk.to');
    BrowserPolicy
        .content
        .allowOriginForAll('stats.g.doubleclick.net');
    BrowserPolicy
        .content
        .allowOriginForAll('google.fr');
    BrowserPolicy
        .content
        .allowOriginForAll('*.facebook.com');
    BrowserPolicy
        .content
        .allowOriginForAll('*.facebook.net');
    BrowserPolicy
        .content
        .allowOriginForAll('tawk.link');
    BrowserPolicy
        .content
        .allowOriginForAll('wwww.google.fr');
    BrowserPolicy
        .content
        .allowEval('https://ajax.googleapis.com');
    BrowserPolicy
        .content
        .allowEval('https://www.google.com/recaptcha/api.js');
    BrowserPolicy
        .content
        .allowOriginForAll('https://www.google.fr/ads*');
    BrowserPolicy
        .content
        .allowOriginForAll('https://webchat.botframework.com');

    smtp = {
        username: '***',
        password: '**',
        Server: '***',
        Port: '**'
    };
    process.env.MAIL_URL = 'smtp://' + smtp.username + ':' + smtp.password + '@' + smtp.Server + ':' + smtp.Port;
    Accounts.emailTemplates.siteName = "Winnzos";
    Accounts.emailTemplates.from = "Winnzos <***>";

    Accounts.emailTemplates.verifyEmail = {
        subject() {
            return "[Winnzos] Verification Email";
        },
        text(user, url) {
            let emailAddress = user.emails[0].address,
                urlWithoutHash = url.replace('#/', ''),
                supportEmail = "***",
                emailBody = `Verification de votre adresse mail (${emailAddress}) cliquer sur le lien suivant:\n\n${urlWithoutHash}\n\n Si vous rencontrez un problème contacter nous à cette adresse : ${supportEmail}.`;

            return emailBody;
        }
    };

    Accounts.onCreateUser((options, user) => {
        console.log("Account created: " + user.username+" UserId="+user._id);
        if (options.role) {
            user.role = options.role;
        }
        if (options.companyId) {
            user.companyId = options.companyId;
            //user.username = options.organizationId + '/' + options.username
        }
        if(options.color){
            user.color = options.color;
        }
        // We still want the default hook's 'profile' behavior.
        if (options.profile) {
            user.profile = options.profile;
        }
        return user;
    })

    ServiceConfiguration
        .configurations
        .upsert({
            service: "google"
        }, {
            $set: {
                clientId: "843913616047-te5guj1hh5vhgkchfutdmr2eau88r2uf.apps.googleusercontent.com",
                loginStyle: "popup",
                secret: "_LzaLlE3k9-G1xy74yKJGscm"
            }
        });

    ServiceConfiguration
        .configurations
        .upsert({
            service: "facebook"
        }, {
            $set: {
                appId: "1712553385635075",
                loginStyle: "popup",
                secret: "789eb63b4ae37409e3fa4e7b7e87277b"
            }
        });

});
