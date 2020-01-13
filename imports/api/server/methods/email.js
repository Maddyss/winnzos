/**
 * Created by root on 15/08/16.
 */
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email'
import { Accounts } from 'meteor/accounts-base'
import { SSR } from 'meteor/meteorhacks:ssr'


Meteor.methods ({
    sendEmail: function (to, from, subject, text) {
        check ([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock ();
        Email.send ({
            to:      to,
            from:    from,
            subject: subject,
            text:    text
        });
    },
    sendEmailEmploye: function (to, subject, pass) {
        check ([to,  subject, pass], [String]);

        SSR.compileTemplate('htmlEmailEmploye', Assets.getText('email-employe.html'));

        this.unblock ();
        let emailData = {
            emailAddress    :to,
            supportEmail    :"***",
            telSupportEmail    :"09.72.58.90.29",
            passWord: pass
        }
        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: subject,
            html:    SSR.render('htmlEmailEmploye', emailData)
        });
    },
    sendMessageReminder: function (to, from, message,date) {
        check ([to,  from, message], [String]);
        check (date, Date);

        SSR.compileTemplate('htmlReminderEmail', Assets.getText('email-reminder-message.html'));

        this.unblock ();
        let emailData = {
            emailAddress    :to,
            supportEmail    :"***",
            telSupportEmail    :"09.72.58.90.29",
            from : from,
            message : message,
            date : date,
        }
        let html = SSR.render('htmlReminderEmail', emailData);
        console.log("Sending email to "+to);
        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: '[Winnzos] Vous avez un message non lu',
            html:    html
        });
    },
    emailOrderConfirmation: function (order) {
        check (order, Object);
        check (order.userId, String);

        var user = Meteor.users.findOne(order.userId);
        var to = user.emails[0].address;
        SSR.compileTemplate('htmlorderconfirmationemail', Assets.getText('email-order-confirmation.html'));

        this.unblock ();
        let emailData = {
            user    :user,
            supportEmail    :"***",
            telSupportEmail    :"09.72.58.90.29",
            order,
        }
        let html = SSR.render('htmlorderconfirmationemail', emailData);
        console.log("Sending email to "+to+" with content : "+html);
        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: '[Winnzos] Confirmation de commande',
            html:    html
        });
    },
    emailOrderPaymentRejected: function (order) {
        check (order, Object);
        check (order.userId, String);

        var user = Meteor.users.findOne(order.userId);
        var to = user.emails[0].address;
        SSR.compileTemplate('htmlorderpaymentrejectedemail', Assets.getText('email-order-payment-rejected.html'));

        this.unblock ();
        let emailData = {
            user    :user,
            supportEmail    :"***",
            telSupportEmail    :"06.66.11.58.73",
            order,
        }
        let html = SSR.render('htmlorderpaymentrejectedemail', emailData);
        console.log("Sending email to "+to+" with content : "+html);
        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: '[Winnzos] Rejet de paiement',
            html:    html
        });
    },
    sendVerificationLink: function() {
        let userId = Meteor.userId();

        SSR.compileTemplate('htmlEmail', Assets.getText('email-confirmation.html'));

        this.unblock ();
        Accounts.emailTemplates.siteName = "Winnzos";
        Accounts.emailTemplates.from     = "Winnzos <***>";
        Accounts.emailTemplates.verifyEmail = {
            subject() {
                return "[Winnzos] Vérification de votre adresse email ";
            },
            html( user, url ) {
                let emailData = {
                    emailAddress    :user.emails[0].address,
                    urlWithoutHash  :url.replace( '#/', '' ),
                    supportEmail    :"***",
                },
                emailBody      = SSR.render('htmlEmail', emailData);

                return emailBody;
            }
        };

        if ( userId ) {
            return Accounts.sendVerificationEmail( userId );
        }
    },
    sendResetPassword: function(email) {
        check(email, { email : String });


        let user = Meteor.users.findOne({'emails.address':email.email});
        console.log(user);
        if(user){
            SSR.compileTemplate('htmlEmail', Assets.getText('email-resetmotpasse.html'));

            this.unblock ();
            Accounts.emailTemplates.siteName = "Winnzos";
            Accounts.emailTemplates.from     = "Winnzos <***>";
            Accounts.emailTemplates.resetPassword = {
                subject() {
                    return "[Winnzos] Modification de votre mot de passe ";
                },
                html( user, url ) {
                    let emailData = {
                            emailAddress    :user.emails[0].address,
                            urlWithoutHash  :url.replace( '#/', '' ),
                            supportEmail    :"***",
                        },
                        emailBody      = SSR.render('htmlEmail', emailData);

                    return emailBody;
                }
            };

            Accounts.sendResetPasswordEmail( user._id );
            return true;
        }
        else{
            return false;
        }
    },
    sendDemandeRDV: function (userId,proId, date) {
        check ([userId, proId], [String]);
        check (date, Date);

        SSR.compileTemplate('htmlConfRDV', Assets.getText('email-confirmation-rendezvous.html'));

        this.unblock ();
        let emailData = {
            emailAddress    :to,
            supportEmail    :"***",
            telSupportEmail    :"09.72.58.90.29",
            proName : proName,
            date : date,
        }
        let html = SSR.render('htmlConfRDV', emailData);
        console.log("Sending email to : "+to);
        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: '[Winnzos][' + proName + '] Rendez-vous le ' + date,
            html:    html
        });
    },
    sendConfRDV: function (userId,proId, date) {
        check ([userId, proId], [String]);
        check (date, Date);

        SSR.compileTemplate('htmlConfRDV', Assets.getText('email-confirmation-rendezvous.html'));

        this.unblock ();
        let emailData = {
            emailAddress    :to,
            supportEmail    :"***",
            telSupportEmail    :"09.72.58.90.29",
            proName : proName,
            date : date,
        }
        let html = SSR.render('htmlConfRDV', emailData);
        console.log("Sending email to : "+to);
        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: '[Winnzos][' + proName + '] Rendez-vous le ' + date,
            html:    html
        });
    },
    sendRefusRDV: function (userId,proId, date, reason) {
        check ([userId, proId, reason], [String]);
        check (date, Date);

        SSR.compileTemplate('htmlRefusRDV', Assets.getText('email-refus-rendezvous.html'));

        this.unblock ();
        let emailData = {
            emailAddress    :to,
            supportEmail    :"***",
            telSupportEmail    :"09.72.58.90.29",
            proName : proName,
            date : date,
            reason: reason
        }
        let html = SSR.render('htmlRefusRDV', emailData);
        console.log("Sending email to : "+to);

        Email.send ({
            to:      to,
            from:    "Winnzos <***>",
            subject: '[Winnzos][' + proName + '] Rendez-vous du ' + date + ' refuser',
            html:    html
        });
    },
    sendVerificationLinkPro: function() {
        let userId = Meteor.userId();

        SSR.compileTemplate('htmlEmail', Assets.getText('email-confirmation-pro.html'));

        this.unblock ();
        Accounts.emailTemplates.siteName = "Winnzos";
        Accounts.emailTemplates.from     = "Winnzos <***>";
        Accounts.emailTemplates.verifyEmail = {
            subject() {
                return "[Winnzos] Activez votre compte ";
            },
            html( user, url ) {
                let emailData = {
                        emailAddress    :user.emails[0].address,
                        urlWithoutHash  :url.replace( '#/', '' )
                },
                    emailBody      = SSR.render('htmlEmail', emailData);

                return emailBody;
            }
        };

        if ( userId ) {
            return Accounts.sendVerificationEmail( userId );
        }
    }
});
