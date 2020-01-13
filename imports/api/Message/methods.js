import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {checkLoggedInError} from '/imports/api/utils/validatedMethodsConstants';
import Model from './model.js';
import Messages from './index.js'


export const sendMessage = new ValidatedMethod({
    name: 'Messages.send',
    validate: new SimpleSchema({
        to : {
            type : String,
        },
        message:{
            type : String,
        }
    }).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(data) {
        var augmentedData ={
            to : data.to,
            message : data.message,
            from : Meteor.userId(),
            date : new Date(),
            isReadBySender : true,
            isReadByReceiver : false,
            isReminderSent: false,
        };

        Messages.insert(augmentedData);
    },
});



export const setMessagesRead = new ValidatedMethod({
    name: 'Messages.setMessagesRead',
    validate: new SimpleSchema({
        messageIds : {
            type : [String],
        }
    }).validator(),
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError,
    run(data) {

        data.messageIds.forEach((messageId)=>{
            var message = Messages.findOne(messageId);

            if(message.to === Meteor.userId()){
                Messages.update(messageId,{$set:{isReadByReceiver:true}});
            }
        });

    },
});