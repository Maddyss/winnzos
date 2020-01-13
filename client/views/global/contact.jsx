/**
 * Created by root on 14/08/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import '/imports/stylesheet/global/contact.css';

export default class Contact extends TrackerReact(Component) {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ-YcGjJFNhvVUbO8mqjEHuUIE6XfhNcU', function( data, textStatus, jqxhr ) {
            let  map = new google.maps.Map($('.map-container')[0], {
                center: new google.maps.LatLng(46.3256734, -0.4302603999999519),
                zoom: 16
            });
            // Create a marker and set its position.
            let marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(46.3256734, -0.4302603999999519),
                title: 'SASU Winnzos'
            });
        });
    }
    envoi()
    {
        let nom = this.refs.name.value;
        let email = this.refs.email.value;
        let tel = this.refs.tel.value;
        let message = this.refs.message.value;

        check([nom,email,tel,message], [String]);

        if(nom.length > 0 && email.length > 0 && message.length >0){
            Meteor.call('sendEmail',
                'contact@winnzos.fr',
                'contact@winnzos.fr',
                'Contact d\'un utilisateur sur Winnzos',
                message + '\n Téléphone : ' + tel + '\n Nom, Prénom : ' + nom + '\n email : ' + email);
            /*Email.send({
                to: email,
                from: 'kevinlegeron@gmail.com',
                subject: 'Contact d\'un utilisateur sur Winnzos',
                text: message + '\n Téléphone : ' + tel + '\n Nom, Prénom : ' + nom
            });*/
        }
        else{
            Bert.alert({title: 'Information incomplète',message :'', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }

    }

    render () {
        return (
            <div className="page-content">
                <div className="c-content-contact-1 c-opt-1">
                    <div className="row" data-auto-height=".c-height">
                        <div className="col-lg-8 col-md-6 c-desktop"></div>
                        <div className="col-lg-4 col-md-6">
                            <div className="c-body">
                                <div className="c-section">
                                    <h3>SAS Winnzos</h3>
                                </div>
                                <div className="c-section">
                                    <div className="c-content-label uppercase bg-red">Adresse</div>
                                    <p>3 allée Yacine Kateb
                                        <br/>Deux-Sèvres
                                        <br/>79000 Niort</p>
                                </div>
                                <div className="c-section">
                                    <div className="c-content-label uppercase bg-red">Contacts</div>
                                    <p>
                                        <strong>Téléphone</strong> +33(0)9 72 58 90 29
                                        <br/>
                                        <strong>Mail</strong> contact@winnzos.fr</p>
                                </div>
                                <div className="c-section">
                                    <div className="c-content-label uppercase bg-red">Social</div>
                                    <br/>
                                    <ul className="c-content-iconlist-1 ">
                                        <li>
                                            <a href="https://twitter.com/Winnzos">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.facebook.com/winnzos/">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.youtube.com/channel/UCxQAMzyLRKFmzxotJgoeL2Q">
                                                <i className="fa fa-youtube-play"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map-container c-content-contact-1-gmap" ></div>
                </div>
                <div className="c-content-feedback-1 c-option-1 col-md-2 col-md-offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="c-contact">
                                <div className="c-content-title-1">
                                    <h3 className="uppercase">Contactez-nous</h3>
                                    <div className="c-line-left bg-dark"></div>
                                </div>
                                <form onSubmit={this.envoi.bind(this)}>
                                    <div className="form-group">
                                        <input type="text" placeholder="Nom, Prénom *" className="form-control input-md" ref="name" /> </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Email *" className="form-control input-md" ref="email" /> </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Téléphone" className="form-control input-md" ref="tel" /> </div>
                                    <div className="form-group">
                                        <textarea rows="8" name="message" placeholder="Votre message." className="form-control input-md" ref="message" ></textarea>
                                    </div>
                                    <button type="submit" className="btn grey">Envoyer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}