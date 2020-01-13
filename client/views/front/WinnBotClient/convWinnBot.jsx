import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';

import './stylesheet/convBot.scss';

export default class ConversationBot extends Component {
    constructor(props)
    {
        super(props);
    }
    callWinnBot(e){
        e.preventDefault();
        let message = this.refs.demande.value;
        this.refs.demande.value = '';
        $('.debut').remove();
        let htmlMessageClient = messageChannel(message, moment(), 'self');
        $('.chat').append(htmlMessageClient);
        Meteor.call('convWinnBot', { message }, function (error, result) {
            if (error) {
                console.log(error.reason);
                return;
            }

            console.log(result);
            let htmlMessageBot = messageChannel(result, moment(), 'other');
            $('.chat').append(htmlMessageBot);

        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="heading-1 text-center">Venez découvrir WinnBot et simplifiez vos recherche !</h1>
                        <h2 className="heading-1 text-center">En cours de développement</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="container bootstrap snippet">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet portlet-default">
                                    <div id="chat" className="panel-collapse collapse in">
                                        <div>
                                            <div className="content-chat">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="menu">
                                                            <div className="back"> <img src="front/WinnBot.jpg" /></div>
                                                            <div className="name">WinnBot</div>
                                                            <div className="last">{moment().format('HH:mm:ss')}</div>
                                                        </div>
                                                        <ol className="chat">
                                                            <div className="debut text-center" style={{'fontSize':'50'}}>
                                                                <p>J'ai besoin de votre Prénom pour commencer la conversation <i className="fa fa-smile-o"  style={{'color':'yellow'}} aria-hidden="true"></i></p>
                                                            </div>
                                                        </ol>
                                                        <form method="post" onSubmit={this.callWinnBot.bind(this)}>
                                                            <div className="input-group input-group-lg">
                                                                <input type="text" className="form-control" placeholder="Votre message ici !" ref="demande" />
                                                                <span className="input-group-btn">
                                                                    <button className="btn green" type="submit"><i className="fa fa-arrow-circle-right"></i>  Envoyer</button>
                                                                </span>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container bootstrap snippet">
                        <iframe src='https://webchat.botframework.com/embed/WinnBot?s=xHgwCERXB7A.cwA.gPY.cwbU-EALUADGr4Jd4UIPqyKQHENVCEY5SSwTtyn4G5E'></iframe>
                    </div>
                </div>
            </div>
        )
    }
};

function messageChannel(message, day, type){
    "use strict";
    console.log(message);
    return(
        $('<li class="' + type + '"> <div class="msg"> ' +
            '<div class="user"><div class="avatar"><img src="/header/img/profile/avatar3_small.jpg" draggable="false"/> Toto</div></div>' +
            '<p>' + message + '</p>' +
            '<time>' + moment().format('HH:mm:ss') + '</time>' +
            '</div></li>')

    );
}
