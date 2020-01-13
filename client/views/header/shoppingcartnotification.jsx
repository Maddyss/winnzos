import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import lodash from 'lodash';

import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';

export default class ShoppingCartNotification extends Tracker.Component {
    constructor(props){
        super(props);

        this.state={
            products : [],
        }

        this.autorun(()=>{
            var products = ShoppingCartService.getItems();
            this.setState({products});
        });

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        FlowRouter.go('/home_pro/shoppingcart');
    }

    render() {
        if(this.state.products && this.state.products.length){
            return <li className="dropdown dropdown-extended dropdown-notification">
                <a onClick={this.handleClick} className="dropdown-toggle">
                    <i className="fa fa-shopping-cart"></i>
                    <span
                        className="badge badge-default"> {this.state.products.length} </span>
                </a>
            </li>
        }
        else{
            return <li></li>
        }
    }
}