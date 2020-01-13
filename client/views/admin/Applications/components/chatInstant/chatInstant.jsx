import React from 'react';
import classNames from 'classnames';
import { Row, Button, Panel } from 'react-bootstrap';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import { payRendezVous } from '/imports/api/Users';

import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';
import swal from 'sweetalert2';

import pricingManager from '/imports/api/utils/pricingManager.js';

class ChatInstant extends UserReactiveComponent {
    handleClick = (e) => {
        e.preventDefault();
        let {ht,ttc} = pricingManager.getApplicationPrice('chatInstant');

        ShoppingCartService.addItem({
            id : 'application-chatInstant',
            name :'Conversation Instantané',
            description : '',
            priceTtc : ttc,
            priceHt : ht,
        });

        swal({
            title: "Ce module a été ajouté à votre panier.",
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
        const hasChat = this.user() ? this.user().hasChat() : false;
        return (
            <Panel style={{ padding: '1em 0' }}>
                <Row>
                    <img
                        className="img-thumbnail img-circle img-responsive center-block" alt=""
                        src="/front/ConversationBulle.png" width="40%" height="20%"
                    />
                </Row>
                <Row bsClass="text-center">
                    <h1>
            <span
                className={(classNames('label', hasChat ? 'label-primary' : 'label-default'))}
                style={{ fontSize: '.5em' }}
            >
              Conversation instantannée
            </span>
                    </h1>
                    {
                        hasChat ?
                            <div>
                                <Row>
                                    <Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red"><a href="/home_pro/chatInstant" style={{'color': 'white', 'margingBottom': '10px'}}>En Savoir Plus</a></Button>
                                </Row>
                            </div>
                            :
                            <div>
                                <Row>
                                    <Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red"><a href="/home_pro/chatInstant" style={{'color': 'white', 'margingBottom': '10px'}}>En Savoir Plus</a></Button></Row>
                                <Row>
                                    <Button
                                        type="button"
                                        bsSize="sm" bsStyle="info"
                                        bsClass="btn btn-circle green"
                                        onClick={this.handleClick}
                                    >Ajouter au panier</Button>
                                </Row>
                            </div>
                    }
                </Row>
            </Panel>
        );
    }
}

export default ChatInstant;
