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

import OrderStatusLabel from "./components/orderstatuslabel";

import Orders from "/imports/api/orders/index.js";

export default class OrdersListPage extends Tracker.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
        }

        this.subscribe('Orders.from.user');

        this.autorun(() => {
            this.setState({orders: Orders.find({status: {$in: ['paid', 'rejected', 'pending']}}, {sort: {purchaseDate: -1}}).fetch()});
        });

        this.viewOrder = this.viewOrder.bind(this);
    }

    viewOrder(e, order) {
        FlowRouter.go('/home_pro/order_confirmation/?orderId=' + order._id);
    }


    render() {
        return (
            <div>
                <div className="container">
                    <h2>Mes commandes</h2>
                    <div className="row">
                        <div className="invoice">
                            <div className="row">
                                <div className="col-xs-12">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th> Date</th>
                                            <th className="hidden-xs"> Montant HT</th>
                                            <th> Montant TTC</th>
                                            <th> Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { this.state.orders.length ? this.state.orders.map((order, index) => <tr
                                            key={index}>
                                            <td> { moment(order.purchaseDate).format("DD/MM/YYYY") }</td>
                                            <td className="hidden-xs"> { order.totalHt + ' €' } </td>
                                            <td> { order.totalTtc + ' €' }</td>
                                            <td> <OrderStatusLabel order={order} /></td>
                                            <td><a href="#" onClick={(e) => this.viewOrder(e, order)}>Voir</a></td>
                                        </tr>) :
                                            <tr>
                                                <td colSpan="4">Vous n'avez aucune commande à ce jour</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
