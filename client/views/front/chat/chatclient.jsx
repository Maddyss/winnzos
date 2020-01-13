/**
 * Created by root on 20/07/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import SearchDom from '/imports/Component/global/search.jsx';
import InfoPro from '/imports/Component/resultPro/infoPro.jsx';
import Tracker from 'tracker-component';

import {Entreprise} from '/imports/api/collection/collection';

import Messages from '/imports/api/Message/index.js';

import Timeline from '/client/views/admin/chatinstant/components/timeline';
import NewMessage from "/client/views/admin/chatinstant/components/newmessage.jsx";

import '/client/views/admin/chatinstant/chatinstant.scss';


export default class ChatInstant extends  Tracker.Component {
    constructor(props)
    {
        super(props);
        this.subscribe('Messages.with.company',this.props.proId);

        console.log(props);

        this.autorun(()=>{
            let messages = Messages.find({$or:[
                {
                    from : this.props.proId,
                },
                {
                    to : this.props.proId,
                }
            ]},{sort:{date:-1}}).fetch();
            console.log('found : ',messages);
            this.setState({
                messages : messages
            })
        });
    }
    render() {
        return (
            <div className="container chatinstant">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="heading-1 text-center">Communiquez en temps réel avec {this.props.proName}</h1>
                    </div>
                    <NewMessage currentConversation={this.props.proId}/>
                    <Timeline messages={this.state.messages} />
                </div>
            </div>
        )
    }
};