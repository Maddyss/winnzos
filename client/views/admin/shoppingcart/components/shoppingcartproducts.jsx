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

export default class ShoppingCartProducts extends Tracker.Component {
    constructor(props) {
        super(props);


        this.state = {
            products: [],
        }

        this.autorun(() => {
            var products = ShoppingCartService.getItems();
            this.setState({products});
        });
    }

    deleteElement(e,item){
        e.preventDefault();
        ShoppingCartService.removeItem(item.id);
    }

    render() {
        return <div className="row">
            <div className="col-xs-12">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th> Produit</th>
                        <th className="hidden-xs"> Prix HT</th>
                        <th> TVA</th>
                        <th> Total TTC</th>
                        {this.props.editable ? <th>Action</th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    { (this.props.products || this.state.products).map((produit, index) => <tr key={index}>
                        <td> { produit.name }</td>
                        <td className="hidden-xs"> { produit.priceHt + ' €' } </td>
                        <td> { '20 %' }</td>
                        <td> { produit.priceTtc + ' €' }</td>
                        {this.props.editable ? <td><a href="#" onClick={(e)=>this.deleteElement(e,produit)}>Supprimer</a></td> : null}
                    </tr>) }
                    </tbody>
                </table>
            </div>
        </div>;
    }
}