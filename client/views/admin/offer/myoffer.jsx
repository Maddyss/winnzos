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
import Subscriptions from "/imports/Component/home/prixPro.jsx";

import {Bert} from 'meteor/themeteorchef:bert';


import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';


export default class MyOffer extends Tracker.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.autorun(() => {
        });

        this.handleContinue = this.handleContinue.bind(this);
    }

    handleContinue() {
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h2>Mon abonnement</h2>
                    <Subscriptions />
                </div>
            </div>
        )
    }

}
