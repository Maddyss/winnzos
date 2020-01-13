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
    handleClickVitrine = (e) => {
        e.preventDefault();
        let {ht,ttc} = pricingManager.getApplicationPrice('siteVitrine');

        ShoppingCartService.addItem({
            id : 'prestation-siteVitrine',
            name :'Réalisation d\'un site Vitrine',
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
    handleClickEcommerce = (e) => {
        e.preventDefault();
        let {ht,ttc} = pricingManager.getApplicationPrice('siteEcommerce');

        ShoppingCartService.addItem({
            id : 'prestation-siteEcommerce',
            name :'Réalisation d\'un site E-commerce',
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
                            <h2 className="heading-1 with-lines">Site Vitrine</h2>
                        </div>
                        <div className="col-md-6">
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 site web vitrine (3 pages)</h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Edition du contenu à votre guise</h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 nom de domaine en .fr (limité au disponibilité) </h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 hébergement OVH (1 an)</h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Compatible PC, Tablette, SmartPhone </h4>
                            <h4><i className="fa fa-eur fa-lg" style={{'color':'red'}}></i> 210 € TTC </h4>
                            <button onClick={this.handleClickVitrine} className="align-left btn red uppercase">Ajouter au panier</button>
                        </div>
                        <div className="col-md-6">
                            <Carousel>
                                <Carousel.Item>
                                    <img src="/front/MecineWebsite.png" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src="/front/WebSiteBeauty.png" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src="/front/WebSiteCoiffeur2.png"  />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="row"><i className="fa fa-info-circle fa-lg" style={{'color':'blue', 'padding':'20px'}}></i> Renouvellement de l'hebergement de 50€/an.</div>
                    </div>
                    <div className="row">
                        <div className="section-heading">
                            <h2 className="heading-1 with-lines">Site E-Commerce</h2>
                        </div>
                        <div className="col-md-6">
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 site web e-commerce</h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Gestion du contenu avec PrestaShop</h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 nom de domaine en .fr (limité au disponibilité) </h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> 1 hébergement OVH (1 an)</h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Compatible PC, Tablette, SmartPhone </h4>
                            <h4><i className="fa fa-check-circle fa-lg" style={{'color':'green'}}></i> Etude d'une campagne marketing adaptée</h4>
                            <h4><i className="fa fa-eur fa-lg" style={{'color':'red'}}></i> 2 700 € TTC </h4>
                            <button onClick={this.handleClickEcommerce} className="align-left btn red uppercase">Ajouter au panier</button>
                        </div>
                        <div className="row"><i className="fa fa-info-circle fa-lg" style={{'color':'blue', 'padding':'20px'}}></i> Renouvellement de l'hebergement de 250€/an.</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graphisme;
