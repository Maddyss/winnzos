import React, {PropTypes} from 'react';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import {DocHead} from 'meteor/kadira:dochead';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import { Carousel } from 'react-bootstrap';

import Tracker from 'tracker-component';
import pricingManager from '/imports/api/utils/pricingManager.js';
import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';

import swal from 'sweetalert2';


class Graphisme extends Tracker.Component {

    constructor(props) {
        super(props);
    }
    handleClickLogo = (e) => {
        e.preventDefault();
        let {ht,ttc} = pricingManager.getApplicationPrice('logo');

        ShoppingCartService.addItem({
            id : 'prestation-logo',
            name :'Création logo',
            description : '',
            priceTtc : ttc,
            priceHt : ht,
        });

        swal({
            title: "Produit ajouté au panier.",
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Finaliser ma commande',
            cancelButtonText: 'Continuer',
        }).then(function () {
            FlowRouter.go('/home_pro/shoppingcart');
        },function(){
        });
    }
    handleClickVideo = (e) => {
        e.preventDefault();
        let {ht,ttc} = pricingManager.getApplicationPrice('video');

        ShoppingCartService.addItem({
            id : 'prestation-video',
            name :'Réalisation d\'une video',
            description : '',
            priceTtc : ttc,
            priceHt : ht,
        });

        swal({
            title: "Produit ajouté au panier.",
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Finaliser ma commande',
            cancelButtonText: 'Continuer',
        }).then(function () {
            FlowRouter.go('/home_pro/shoppingcart');
        },function(){
        });
    }
    handleClickCarteVisite = (e) => {
        e.preventDefault();
        let {ht,ttc} = pricingManager.getApplicationPrice('carteVisite');

        ShoppingCartService.addItem({
            id : 'prestation-carteVisite',
            name :'Création d\'une carte de visite',
            description : '',
            priceTtc : ttc,
            priceHt : ht,
        });

        swal({
            title: "Produit ajouté au panier.",
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Finaliser ma commande',
            cancelButtonText: 'Continuer',
        }).then(function () {
            FlowRouter.go('/home_pro/shoppingcart');
        },function(){
        });
    }
    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="section-heading">
                            <h2 className="heading-1 with-lines">Identité visuelle</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 3 propositions</h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Logo personnalisé </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Cession des droits d'auteurs </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Livré sous 5 jours </h4>
                                <h4><i className="fa fa-eur fa-lg" style={{'color':'red'}}></i> 90 € TTC </h4>
                                <button onClick={this.handleClickLogo} className="align-left btn red uppercase">Ajouter au panier</button>
                            </div>
                            <div className="col-md-6">
                                <Carousel>
                                    <Carousel.Item>
                                        <img src="/front/LogoCoiffeur.png" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/LogoHealth.png" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/LogoFloral.png"  />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/LogoFloral2.png"  />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/LogoImmo1.png"  />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/LogoImmo2.png"  />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/LogoClinicVet.png"  />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                        <div className="row"><i className="fa fa-info-circle fa-lg" style={{'color':'blue', 'padding':'20px'}}></i> Nous vous contacterons par téléphone pour obtenir vos préférences de styles.</div>
                    </div>
                    <div className="row">
                        <div className="section-heading">
                            <h2 className="heading-1 with-lines">Carte de visite</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 carte de visite Recto - Verso</h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Choix du modèle et on adapte selon votre envie </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Cession des droits d'auteurs </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Livré sous 5 jours </h4>
                                <h4><i className="fa fa-eur fa-lg" style={{'color':'red'}}></i> 60 € TTC </h4>
                                <button onClick={this.handleClickCarteVisite} className="align-left btn red uppercase">Ajouter au panier</button>
                            </div>
                            <div className="col-md-6">
                                <Carousel>
                                    <Carousel.Item>
                                        <img src="/front/CarteVisite3.png" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/CarteVisite1.png" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/CarteVisite1Verso.png"  />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/CarteVisite4.png"  />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src="/front/CarteVisite4Verso.png"  />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                        <div className="row"><i className="fa fa-info-circle fa-lg" style={{'color':'blue', 'padding':'20px'}}></i> Nous vous contacterons par téléphone pour obtenir vos préférences de styles.</div>
                    </div>
                    <div className="row">
                        <div className="section-heading">
                            <h2 className="heading-1 with-lines">Vidéo</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Présentation de votre entreprise</h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Réalisation d'une vidéo d'1 minutes en motion design</h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Accompagnement musique Libre de droit </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Choix du type de Voix-off </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Cession des droits d'auteurs </h4>
                                <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Livré sous 15 jours </h4>
                                <h4><i className="fa fa-eur fa-lg" style={{'color':'red'}}></i> 2 400 € TTC </h4>
                                <button onClick={this.handleClickVideo} className="align-left btn red uppercase">Ajouter au panier</button>
                            </div>
                            <div className="col-md-6">

                            </div>
                        </div>
                        <div className="row"><i className="fa fa-info-circle fa-lg" style={{'color':'blue', 'padding':'20px'}}></i> Nous vous contacterons par téléphone pour obtenir vos préférences de styles.</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graphisme;
