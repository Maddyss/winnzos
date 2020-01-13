/**
 * Created by root on 06/09/16.
 */

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

import {Bert} from 'meteor/themeteorchef:bert';

import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';
import pricingManager from '/imports/api/utils/pricingManager.js';

import ShoppingCartProducts from "./components/shoppingcartproducts.jsx";


export default class ShoppingCartPage extends Tracker.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            currentPromotionCode : ''
        }

        this.autorun(() => {
            var products = ShoppingCartService.getItems();
            this.setState({
                products,
                totals : ShoppingCartService.getTotals(),
            });
        });

        this.handleContinue = this.handleContinue.bind(this);
        this.onSubmitPromotionCode = this.onSubmitPromotionCode.bind(this);
        this.handlePromotionCodeChange = this.handlePromotionCodeChange.bind(this);
        this.deletePromotionCode = this.deletePromotionCode.bind(this);
    }

    deletePromotionCode(e){
        e.preventDefault();
        ShoppingCartService.removePromotionCode();
    }

    onSubmitPromotionCode(e){
        e.preventDefault();

        Meteor.call('promotioncodes.get',{code : this.state.currentPromotionCode},(err,result)=>{
            if(err){
                console.log(err.reason);
            }else{
                if(result){
                    ShoppingCartService.addPromotionCode(result);
                    swal({
                        title: 'Code promotionel ajouté',
                        text:   'Ce code promotionel a bien été ajouté à votre panier',
                        type: 'success',
                    });
                }else{
                    swal({
                        title: 'Code promotionel innexistant',
                        text:   'Désolé, ce code promotionnel n\'existe pas ou n\'est plus valide',
                        type: 'error',
                    });
                }
            }
        })
    }

    handleContinue() {
        FlowRouter.go('/home_pro/paiement');
    }

    handlePromotionCodeChange(e){
        this.setState({
            currentPromotionCode : e.target.value,
        });
    }

    render() {
        var {totalHt,totalTtc,totalDiscount} = this.state.totals;

        return (
            <div>
                <div className="container">
                    <h2>Votre panier</h2>
                    <div className="row">
                        <div className="invoice">
                            <ShoppingCartProducts editable={true} />
                            <div className="row">
                                <div className="col-md-4">
                                    Si vous disposez d'un code promotionel, entrez le ici.
                                    <input type="text" onChange={this.handlePromotionCodeChange} value={this.state.currentPromotionCode}/> <a href="#" onClick={this.onSubmitPromotionCode} className="btn btn-lg">Valider</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="well">
                                        {
                                            totalDiscount>0 ? <div className="row static-info align-reverse">
                                                <div className="col-md-4 name"> Réduction :</div>
                                                <div className="col-md-4 value"> {totalDiscount.toFixed(2)} € <a href="#" onClick={this.deletePromotionCode}>Supprimer</a></div>
                                            </div> : null
                                        }
                                        <div className="row static-info align-reverse">
                                            <div className="col-md-4 name"> Total HT:</div>
                                            <div className="col-md-4 value"> {totalHt.toFixed(2)} €</div>
                                        </div>
                                        <div className="row static-info align-reverse">
                                            <div className="col-md-4 name"> TVA:</div>
                                            <div className="col-md-4 value"> {pricingManager.getVatPercent() * 100}
                                                %
                                            </div>
                                        </div>
                                        <div className="row static-info align-reverse">
                                            <div className="col-md-4 name"> Total TTC:</div>
                                            <div className="col-md-4 value"> {totalTtc.toFixed(2)} €</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    {this.state.products.length ?
                                        <a className="btn btn-lg green hidden-print margin-bottom-5 pull-right"
                                           onClick={this.handleContinue}>
                                            Continuer
                                            <i className="fa fa-check"></i>
                                        </a> : <span>Votre panier est vide</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
