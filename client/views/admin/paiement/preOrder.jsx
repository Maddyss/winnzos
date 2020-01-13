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
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import {Bert} from 'meteor/themeteorchef:bert';

import '/imports/stylesheet/front/articles.css';
import {FichePro, Entreprise} from "/imports/api/collection/collection.js";

import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';

import ShoppingCartProducts from "/client/views/admin/shoppingcart/components/shoppingcartproducts.jsx";
import pricingManager from '/imports/api/utils/pricingManager.js';

import lodash from 'lodash';

export default class PreOrder extends Tracker.Component {
    constructor(props) {
        super(props);

        let shoppingCartItems = ShoppingCartService.getItems();
        let promotionCode = ShoppingCartService.getPromotionCode();

        this.state = {
            duree: null,
            products: shoppingCartItems,
            fichePro: undefined,
            enterprise: undefined,
            loading: true,
            mercanetForm: null,
            promotionCode,
        }

        var sub = this.subscribe('User.with.fichePro.and.enterprise');

        var {totalTtc} = this.getTotals();

        if (totalTtc === 0) {
            this.state.freeOrder = true;
        } else {
            this.state.freeOrder = false;
            Meteor.call('payment.generateOrderAndGetMercanetData', {shoppingCartItems,promotionCode}, (err, orderData) => {
                if (err) {
                    console.log(err.reason);
                } else {
                    this.setState({
                        mercanetForm: orderData,
                    });
                }
            });
        }


        this.autorun(() => {
            var fichePro = FichePro.findOne({userId: Meteor.userId()});
            var enterprise = Entreprise.findOne({userId: Meteor.userId()});
            this.setState({
                fichePro,
                enterprise,
                loading: !sub.ready()
            });
        });
        this.purchaseFreeOrder = this.purchaseFreeOrder.bind(this);
    }

    print() {
        window.print();
    }

    purchaseFreeOrder(e) {
        e.preventDefault();
        this.setState({
            isSubmittingPayment: true,
        })
        Meteor.call('payment.payFreeOrder', {
            shoppingCartItems: this.state.products,
            promotionCode : this.state.promotionCode
        }, (err, result) => {
            this.setState({isSubmittingPayment: false})
            if (err) {
                console.log(err.reason);
                swal({
                    title: "Une erreur est survenur lors de l'envoi de votre commande",
                    type: 'error',
                    confirmButtonText: 'Ok',
                })
            } else {

                ShoppingCartService.clear();
                FlowRouter.go('/home_pro/order_confirmation?orderId=' + result._id+"&clearCart=true");

                swal({
                    title: "Votre commande a bien été reçue",
                    type: 'success',
                    confirmButtonText: 'Ok',
                }).then(function () {
                }, function () {

                });
            }
        })
    }

    getTotals() {
        return pricingManager.computeOrderOrShoppingCartPrices(this.state.products,this.state.promotionCode);
    }

    render() {

        if (this.state.loading) {
            return <div>Chargement...</div>
        }

        const {profile} = Meteor.user();
        var fichePro = this.state.fichePro || {};
        var enterprise = this.state.enterprise || {};

        var {totalHt, totalTtc,totalDiscount} = this.getTotals();

        return (
            <div>
                <div className="section-heading">
                    <h2 className="heading-1 with-lines">Paiement</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="invoice">
                            <div className="row invoice-logo">
                                <div className="col-xs-6 invoice-logo-space">
                                    <img src="/front/logo-winnzos.png" className="img-responsive" alt=""/></div>
                                <div className="col-xs-6">
                                    <p><span
                                        className="muted"> Réglement achat le </span>{ moment(new Date()).format('DD/MM/YYYY') }
                                    </p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-xs-4">
                                    <h3>Client:</h3>
                                    <ul className="list-unstyled">
                                        <li> { 'Entreprise : ' + fichePro.nomCommercial } </li>
                                        <li><i className="fa fa-address-card"></i>{ enterprise.titreContact } </li>
                                        <li><i className="fa fa-phone"></i> { enterprise.telContact } </li>
                                        <li><i
                                            className="fa fa-map-marker"></i> { enterprise.AdresseSiege ? `${enterprise.AdresseSiege.Voie} ${enterprise.AdresseSiege.ZipCode} + ${enterprise.AdresseSiege.Ville}` : ''}
                                        </li>
                                        <li> { 'Siret : ' + fichePro.siret } </li>
                                    </ul>
                                </div>
                                <div className="col-xs-4">
                                </div>
                                {/*<div className="col-xs-4 invoice-payment">
                                    <h3>Details paiement:</h3>
                                    <ul className="list-unstyled">
                                        <li>
                                            <strong>N° TVA </strong> <input type="text" className="form-control"
                                                                            placeholder="Numéro TVA à renseigner"></input>
                                        </li>
                                    </ul>
                                </div>*/}
                            </div>
                            <ShoppingCartProducts products={this.state.products}/>
                            <div className="row">
                                <div className="col-xs-4">
                                    <div className="well">
                                        <address>
                                            <strong>SASU Winnzos</strong>
                                            <br/> 3 allée Yacine Kateb
                                            <br/> 79000, Niort
                                            <br/>
                                            <abbr title="Phone">Tel:</abbr> 09 72 58 90 29
                                        </address>
                                        <address>
                                            <strong>Contact E-mail</strong>
                                            <br/>
                                            <a href="mailto:contact@winnzos.fr"> contact@winnzos.fr </a>
                                        </address>
                                    </div>
                                </div>
                                <div className="col-xs-8 invoice-block">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-8">
                                        <div className="well">
                                            {
                                                totalDiscount ? <div className="row static-info align-reverse">
                                                    <div className="col-md-4 name"> Promotion :</div>
                                                    <div className="col-md-4 value"> {totalDiscount.toFixed(2)} €</div>
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
                                        <a className="btn btn-lg blue hidden-print margin-bottom-5 pull-right"
                                           onClick={this.print}>
                                            Imprimer
                                            <i className="fa fa-print"></i>
                                        </a>
                                        {
                                            !this.state.freeOrder ? (this.state.mercanetForm ?
                                                <form action={this.state.mercanetForm.paymentUrl} method="POST">
                                                    <input type="hidden" name="Data"
                                                           value={this.state.mercanetForm.data}/>
                                                    <input type="hidden" name="InterfaceVersion"
                                                           value={this.state.mercanetForm.interfaceVersion}/>
                                                    <input type="hidden" name="Seal"
                                                           value={this.state.mercanetForm.seal}/>
                                                    <button type="submit"
                                                            className="btn btn-lg green hidden-print margin-bottom-5 pull-right"
                                                    >
                                                        Paiement
                                                        <i className="fa fa-check"></i>
                                                    </button>
                                                </form> : <Spinner />)
                                        :
                                            (!this.state.isSubmittingPayment ? <a href="#" onClick={this.purchaseFreeOrder}
                                                                      className="btn btn-lg green hidden-print margin-bottom-5 pull-right"
                                            >
                                                Valider
                                                <i className="fa fa-check"></i>
                                            </a> : <Spinner />)

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
