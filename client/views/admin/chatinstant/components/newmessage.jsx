import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import lodash from 'lodash';

export default class NewMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
        }

        this.onSend = this.onSend.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
    }

    onSend(e) {
        if (this.props.currentConversation) {
            if(!Meteor.user()){
                swal('Vous devez être identifié .', 'L\'envoi de message nécessite la connection à votre compte .', 'error');
                return;
            }
            Meteor.call('Messages.send', {
                to: this.props.currentConversation,
                message: this.state.message,
            },(err)=>{
                if(!err){
                    this.setState({message : ''})
                    alertSuccess({
                        title: 'Message envoyé',
                    });
                }
                else{
                    console.log(err.reason);
                    alertDanger({
                        title: 'Une erreur est survenue et le message n\'a pas pu être envoyé.',
                    });
                }
            });
        }
    }

    onMessageChange(e) {
        this.setState({message: e.target.value});
    }

    render() {
        return <div className="newmessage">
                <textarea className="form-control" onChange={this.onMessageChange} value={this.state.message} rows={3}
                          placeholder="Ecrire un message"/>
            {
                this.props.currentConversation ?
                    <div className="text-right">
                        <a className="btn btn-info send-button" onClick={this.onSend}>
                            <i className="fa fa-send"></i> Envoyer</a>
                    </div>
                    : null
            }

        </div>
    }

}