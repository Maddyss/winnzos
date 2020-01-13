/**
 * Created by root on 27/08/16.
 */

import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from "moment";
import Tracker from 'tracker-component';

import '/imports/stylesheet/front/pricing.css';
import shoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';
import pricingManager from '/imports/api/utils/pricingManager.js';

export default class PrixPro extends Tracker.Component {
    constructor(props) {
        super(props);
        Session.set('offre', 'visite');

        this.state = {
            currentPlan : 'plan-starter',
            currentDuration : 1,
        }

        this.autorun(() => {
            let currentUser = Meteor.user();
            if (currentUser) {
                this.setState({
                    currentPlan: currentUser.currentPlan()
                });
            }
        });

        this.changeDuration = this.changeDuration.bind(this);
        this.offreDemarrage = this.offreDemarrage.bind(this);
        this.offreConfort = this.offreConfort.bind(this);
        this.offrePremium = this.offrePremium.bind(this);
    }

    offreDemarrage(e) {
        e.preventDefault();
        this.subscribe('starter','démarrage');
    }

    offreConfort(e) {
        e.preventDefault();
        this.subscribe('comfort','confort');
    }

    offrePremium(e) {
        e.preventDefault();
        this.subscribe('premium','premium');
    }

    subscribe(planId,planName){
        let planPrice = pricingManager.getPlanPrice(planId,this.state.currentDuration);
        shoppingCartService.addItem({
            id : 'plan',
            option : planId,
            name : `Abonnement ${planName} ${this.state.currentDuration} mois`,
            priceTtc : planPrice,
            priceHt : (planPrice / (pricingManager.getVatPercent()+1)).toFixed(2),
            duration : this.state.currentDuration,
        });

        if(Meteor.userId()){
            FlowRouter.go('/home_pro/shoppingcart');
        }else{
            FlowRouter.go('/register');
        }
    }

    changeDuration(e) {
        this.setState({
            currentDuration : e.target.value*1,
        });
    }

    render() {
        let starterPrice = pricingManager.getPlanPrice('starter',this.state.currentDuration);
        let starterMonthlyPrice = (starterPrice/this.state.currentDuration).toFixed(2);

        let comfortPrice = pricingManager.getPlanPrice('comfort',this.state.currentDuration);
        let comfortMonthlyPrice = (comfortPrice/this.state.currentDuration).toFixed(2);

        let premiumPrice = pricingManager.getPlanPrice('premium',this.state.currentDuration);
        let premiumMonthlyPrice = (premiumPrice/this.state.currentDuration).toFixed(2);
        let expirationDateFormatted = "";
        if(Meteor.user()){
            let expirationDate = Meteor.user().subscriptionExpirationDate;
             expirationDateFormatted = expirationDate ? "Jusqu'au "+moment(expirationDate).format("DD/MM/YYYY"):  "";
        }

        return (
            <div>
                <div className="container" style={{'textAlign':'center'}}>
                    <a href="/register"><img src="/front/Offre30Winnz.jpg" alt="-30% réductions Winnzos avec le code WINNZOSTART" /></a>
                </div>
                <div className="pricing-content-1">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="price-column-container border-active">
                                <div className="price-table-head bg-green">
                                    <h2 className="no-margin">D&eacute;marrage</h2>
                                </div>
                                <div className="arrow-down border-top-green"></div>
                                <div className="price-table-pricing">
                                    <h3>
                                        <span className="price-sign"></span>{starterPrice } €</h3>
                                    <p>Sans carte bleu</p>
                                </div>
                                <div className="price-table-content">
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; 1 utilisateurs</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-users"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; Nombre d'employé
                                            illimité
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-globe"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; Profil Web</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;<i className="fa fa-desktop"></i>&nbsp;<i className="fa fa-tablet"></i>&nbsp;<i className="fa fa-mobile"></i>
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; 10 jours premium</div>
                                    </div>
                                </div>
                                <div className="arrow-down arrow-grey"></div>
                                {
                                    this.state.currentPlan === 'starter' ?
                                        <div className="price-table-footer">
                                            <a href="javascript:;" onClick={e => e.preventDefault()}>
                                                <button type="button"
                                                        className="btn grey-salsa btn-outline sbold uppercase price-button">
                                                    Vous possedez déjà cette offre
                                                </button>
                                            </a>
                                        </div>
                                        :
                                        <div className="price-table-footer">
                                            <a href="javascript:;" onClick={this.offreDemarrage}>
                                                <button type="button"
                                                        className="btn grey-salsa btn-outline sbold uppercase price-button">
                                                    S'inscrire &agrave; l'offre D&eacute;marrage
                                                </button>
                                            </a>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="price-column-container border-active">
                                <div className="price-table-head bg-blue">
                                    <h2 className="no-margin">Confort</h2>
                                </div>
                                <div className="arrow-down border-top-blue"></div>
                                <div className="price-table-pricing">
                                    <h3>
                                        <span id="moisConf">
                        {comfortPrice }</span>&nbsp;€</h3>
                                    <h5>TVA comprise&nbsp;
                                        <p id="mensuelConf">Information : { comfortMonthlyPrice } €/mois</p>
                                    </h5>
                                    <select className="form-control" value={this.state.currentDuration}
                                            onChange={this.changeDuration}>
                                        <option value="1">Formule 1 mois</option>
                                        <option value="3">Formule 3 mois</option>
                                        <option value="6">Formule 6 mois</option>
                                        <option value="12">Formule annuelle</option>
                                    </select>
                                </div>
                                <div className="price-table-content">
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; 1 utilisateurs</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-users"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; Nombre d'employé
                                            illimité
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-globe"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; Profil Web</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-line-chart"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; Statistiques</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;iWinn sur votre page Facebook </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;Prise de rendez-vous sur votre site-internet</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-envelope-o"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;Assistance Complète
                                            *
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; <i className="fa fa-desktop"></i>&nbsp;<i className="fa fa-tablet"></i>&nbsp;<i className="fa fa-mobile"></i>
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; 10 jours premium</div>
                                    </div>
                                </div>
                                <div className="arrow-down arrow-grey"></div>
                                {
                                    this.state.currentPlan === 'comfort' ?
                                        <div className="price-table-footer">
                                            <a href="javascript:;" onClick={this.offreConfort}>
                                                <button type="button"
                                                        className="btn grey-salsa btn-outline sbold uppercase price-button">
                                                    Vous possedez cette offre jusqu'au {expirationDateFormatted}
                                                </button>
                                            </a>
                                        </div>
                                        :
                                        <div className="price-table-footer">
                                            <a href="javascript:;" onClick={this.offreConfort}>
                                                <button type="button"
                                                        className="btn grey-salsa btn-outline sbold uppercase price-button">
                                                    S'inscrire &agrave; l'offre Confort
                                                </button>
                                            </a>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="price-column-container border-active">
                                <div className="price-table-head bg-red">
                                    <h2 className="no-margin">Premium</h2>
                                </div>
                                <div className="arrow-down border-top-red"></div>
                                <div className="price-table-pricing">
                                    <div className="price-ribbon">Recommand&eacute;</div>
                                    <h3>
                                        <span id="moisPrem">{premiumPrice}</span>&nbsp;€</h3>
                                    <h5>TVA comprise&nbsp;<p id="mensuelPrem">Information : {premiumMonthlyPrice} €/mois</p></h5>
                                    <select className="form-control moisPrem" value={this.state.currentDuration}
                                            onChange={this.changeDuration}>
                                        <option value="1">Formule 1 mois</option>
                                        <option value="3">Formule 3 mois</option>
                                        <option value="6">Formule 6 mois</option>
                                        <option value="12">Formule annuelle</option>
                                    </select>
                                </div>
                                <div className="price-table-content">
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;Toute les fonctionnalitées Comfort
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-globe"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp; Création d'un site internet à votre identité</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-line-chart"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;Hébergement de votre site internet</div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;Cession des droits sur votre site-internet
                                        </div>
                                    </div>
                                    <div className="row mobile-padding">
                                        <div className="col-xs-3 text-right mobile-padding">
                                            <i className="fa fa-plus-circle"></i>
                                        </div>
                                        <div className="col-xs-9 text-left mobile-padding">&nbsp;Gestion du contenu à votre image
                                        </div>
                                    </div>
                                </div>
                                <div className="arrow-down arrow-grey"></div>
                                {
                                    this.state.currentPlan === 'premium' ?
                                        <div className="price-table-footer">
                                            <a href="javascript:;" onClick={this.offrePremium}>
                                                <button type="button"
                                                        className="btn green price-button sbold uppercase">
                                                    Vous possédez cette offre jusqu'au {expirationDateFormatted}
                                                </button>
                                            </a>
                                        </div>
                                        :
                                        <div className="price-table-footer">
                                            <a href="javascript:;" onClick={this.offrePremium}>
                                                <button type="button"
                                                        className="btn grey-salsa btn-outline sbold uppercase price-button">
                                                    S'inscrire &agrave; l'offre Premium
                                                </button>
                                            </a>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <p>* Assistance e-mail ou téléphonique du Lundi au Vendredi de 9h à 18h jours f&eacute;ri&eacute;s exclu.</p>
                    </div>
                </div>
            </div>
        )
    }

}