import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Messages from '../index.js';

Meteor.publishComposite('Messages.from.and.to.current.user', function () {
    return {
        find() {
            return Meteor.users.find(this.userId);
        },
        children: [
            {
                find(user) {
                    return Messages.find({from : user._id});
                },
                children:[
                    {
                        find(message){
                            return Meteor.users.find(message.to);
                        }
                    }
                ]
            },
            {
                find(user) {
                    return Messages.find({to : user._id});
                },
                children:[
                    {
                        find(message){
                            return Meteor.users.find(message.from);
                        }
                    }
                ]
            },
        ]
    }
});

Meteor.publishComposite('Messages.with.company', function (companyId) {
    check(companyId, String);
    return {
        find() {
            console.log("Current user : "+this.userId);
            return Meteor.users.find({
                _id : this.userId
            });
        },
        children: [
            {
                find(user) {
                    return Messages.find({from : user._id,to : companyId});
                },
                children:[
                    {
                        find(message){
                            return Meteor.users.find(message.to);
                        }
                    }
                ]
            },
            {
                find(user) {
                    return Messages.find({to : user._id, from :companyId });
                },
                children:[
                    {
                        find(message){
                            return Meteor.users.find(message.from);
                        }
                    }
                ]
            },
        ]
    }
});