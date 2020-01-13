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
import Orders from '/imports/api/orders/index.js';

import pricingManager from '/imports/api/utils/pricingManager.js';
import lodash from 'lodash';

import OrderStatusLabel from "../orders/components/orderstatuslabel";

export default class Confirmation extends Tracker.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: null,
            loading: true,
        }

        if(props.query.clearCart){
            ShoppingCartService.clear();
        }

        var sub1 = this.subscribe('User.with.fichePro.and.enterprise');
        var sub2 = this.subscribe('Orders.specific',props.query.orderId);

        this.autorun(() => {
            var fichePro = FichePro.findOne({userId: Meteor.userId()});
            var enterprise = Entreprise.findOne({userId: Meteor.userId()});
            var orders = Orders.find(props.query.orderId).fetch();

            if(props.query.orderId){
                orders = orders.filter(i=>i._id == props.query.orderId);
            }

            this.setState({
                order : orders.length ? orders[0] : null,
                fichePro,
                enterprise,
                loading: !sub1.ready() || !sub2.ready()
            });
        });
    }

    print() {
        window.print();
    }


    render() {

        if (this.state.loading) {
            return <div><Spinner /></div>
        }

        if(!this.state.order){
            return <div>Commande non trouvée.</div>
        }

        const {profile} = Meteor.user();
        var fichePro = this.state.fichePro || {};
        var enterprise = this.state.enterprise || {};

        var {totalHt,totalTtc,totalDiscount} = this.state.order.getTotals();

        return (
            <div>
                <div className="section-heading">
                    <h2 className="heading-1 with-lines">Confirmation de commande</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="invoice">
                            <div className="row invoice-logo">
                                <div className="col-xs-6 invoice-logo-space">
                                    <img src="/front/logo-winnzos.png" className="img-responsive" alt=""/></div>
                                <div className="col-xs-3">
                                    <p>
                                        <OrderStatusLabel order={this.state.order} />
                                    </p>
                                </div>
                                <div className="col-xs-3">
                                    <p><span
                                        className="muted"> Réglement achat le </span> { moment(this.state.order.purchaseDate).format('DD/MM/YYYY') }
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
                                            className="fa fa-map-marker"></i> { enterprise.AdresseSiege ? `${enterprise.AdresseSiege.Voie} ${enterprise.AdresseSiege.ZipCode}  ${enterprise.AdresseSiege.Ville}` : ''}
                                        </li>
                                        <li> { 'Siret : ' + fichePro.siret } </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th> Produit</th>
                                            <th className="hidden-xs"> Prix HT</th>
                                            <th> TVA</th>
                                            <th> Total TTC</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { this.state.order.items.map((produit, index) => <tr key={index}>
                                            <td> { produit.name }</td>
                                            <td className="hidden-xs"> { produit.priceHt.toFixed(2) + ' €' } </td>
                                            <td> { '20 %' }</td>
                                            <td> { produit.priceTtc.toFixed(2) + ' €' }</td>
                                        </tr>) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                                    <a className="btn btn-lg blue hidden-print margin-bottom-5" onClick={this.print}>
                                        Imprimer
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
