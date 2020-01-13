import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import '/imports/stylesheet/front/home.css';

import ActuwinDOM from '/imports/Component/home/actuwin.jsx';
import CarteFranceDOM from '/imports/Component/home/carteFrance.jsx';
import TemoignagesDOM from '/imports/Component/home/temoignages.jsx';
import Parrainage from '/imports/Component/home/Parrainage';
import '/imports/Component/Facebook/audience';

export default class HomeDOM extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        if(x < 1000){
            $('#cookieConsent').hide();
        }
    }
    handleClick(e){
        e.preventDefault();
        Session.set('cookies', true);
        $('#cookieConsent').hide();
    }
    componentWillUnmount () {
        Session.set('cookies', true);
        $('#cookieConsent').hide();
    }

    render() {
        let cookies =  <div id="cookieConsent">
            <a className="fermer" onClick={this.handleClick} >×</a>
            <h3>Utilisation des cookies</h3>
            <p>En poursuivant votre navigation sans modifier vos paramètres, vous acceptez l'utilisation des cookies.&nbsp;&nbsp;
                <a href="/cookies" onClick={this.handleClick} >En savoir plus !</a> . </p>
        </div>

        return (
            <div>

                <noscript><img height="1" width="1" style={{'display':'none'}}
                               src="https://www.facebook.com/tr?id=423284114669206&ev=PageView&noscript=1"
                /></noscript>
                { Session.get('cookies') ? null : cookies }
                <CarteFranceDOM />
                <section>
                    <div className="container" id="home-text">
                        <div className="row">
                            <video poster="/front/chezTeo.png" width="100%" height="auto" className="center-block" controls>
                                <source src="/WINNZOS_ANIMOTION_V04.mp4" type="video/mp4" />
                                <source src="/WINNZOS_ANIMOTION_V04_WEBM.webm" type="video/webm" />
                                <p>Votre navigateur n'est pas compatible avec le HTML 5, la vidéo est disponible sur youtube : https://www.youtube.com/watch?v=ykoPGbxBcEo&t=8s.</p>
                            </video>
                        </div>
                        <div className="row">
                            <div className="col-xs-12" style={{'textAlign':'center', 'padding': '15px'}}>
                                <div className="col-md-4" style={{'textAlign':'center', 'padding': '15px'}}>
                                    <i className="fa fa-search fa-4x"></i>
                                </div>
                                <div className="col-md-8">
                                    Avec Winnzos, trouver un coiffeur, une pizzeria, ou une pharmacie à côté de chez vous devient un jeu d’enfants !
                                    Quelle que soit la région dans laquelle vous résidez : Rhône-Alpes, Midi-Pyrénées, Corse.., nous vous facilitons la vie.
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12" style={{'textAlign':'center', 'padding': '15px'}}>
                                <div className="col-md-8">
                                    Ne perdez plus de temps à écumer les annuaires ou les moteurs de recherche pour trouver ce que vous cherchez.
                                </div>
                                <div className="col-md-4" style={{'textAlign':'center', 'padding': '15px'}}>
                                    <i className="fa fa-user-plus fa-4x"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12" style={{'textAlign':'center', 'padding': '15px'}}>
                                <div className="col-md-4" style={{'textAlign':'center', 'padding': '15px'}}>
                                    <i className="fa fa-calendar fa-4x"></i>
                                </div>
                                <div className="col-md-8">
                                    Winnzos facilite vos échanges avec le commerçant. Vous pourrez le contacter, lui poser des questions,
                                    mais aussi prendre rendez-vous.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Parrainage />
                <ActuwinDOM />
                 {/*<TemoignagesDOM />*/}
            </div>
        )
    }
};