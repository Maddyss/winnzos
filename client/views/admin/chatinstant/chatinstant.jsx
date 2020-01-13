import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './chatinstant.scss';

import TimeLine from "./components/timeline.jsx";
import UserList from "./components/userlist.jsx";
import NewMessage from "./components/newmessage.jsx";

import lodash from 'lodash';

import Messages from '/imports/api/Message/index.js';

export default class ChatInstant extends Tracker.Component {
    constructor(props) {
        super(props);

        this.subscribe('Messages.from.and.to.current.user');

        this.state = {
            messages: [],
        };

        this.autorun(() => {
            var userId = Meteor.userId();
            var messages = Messages.find({
                $or: [
                    {to: userId},
                    {from: userId},
                ]
            }, {sort: {date: -1}}).fetch();

            let stateModifier = {
                messages: messages,
            };

            if (!this.state.currentConversation && messages.length) {
                if (messages[0].from === Meteor.userId()) {
                    stateModifier.currentConversation = messages[0].to;
                } else {
                    stateModifier.currentConversation = messages[0].from;
                }

                this.setMessagesFromUserRead(stateModifier.currentConversation, messages);
            }

            this.setState(stateModifier);
        });

        this.onSelectUser = this.onSelectUser.bind(this);
    }

    onSelectUser(user) {
        this.setState({currentConversation: user._id});

        //Let's find the messages that are not read yet
        this.setMessagesFromUserRead( user._id);

    }

    setMessagesFromUserRead(userId, messages = this.state.messages) {
        var messagesUnRead = lodash.filter(messages, i => !i.isReadByReceiver && i.from === userId);

        if (messagesUnRead.length) {
            Meteor.call('Messages.setMessagesRead', {messageIds: messagesUnRead.map(i => i._id)});
        }
    }

    render() {
        var messagesToDisplay = lodash.filter(this.state.messages, i => i.from === this.state.currentConversation || i.to === this.state.currentConversation);

        var currentSelectedUser = Meteor.users.findOne(this.state.currentConversation);


        return <div className="chatinstant">
            <h1 className="page-title"> Conversation Instantanée
            </h1>
            <div className="row clearfix">
                <div className="col-md-6">
                    <h4 className="block">
                        Conversation { currentSelectedUser ? 'avec ' + currentSelectedUser.username : ''}</h4>
                    <NewMessage currentConversation={this.state.currentConversation}/>
                    <TimeLine messages={messagesToDisplay}/>
                </div>
                <div className="col-md-6">
                    <h4 className="block">Utilisateurs</h4>
                    <UserList {...this.state} onSelectUser={this.onSelectUser}/>
                </div>
            </div>
        </div>;
    }
}