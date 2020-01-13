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

class RendezVous extends UserReactiveComponent {
  handleClick = (e) => {
    e.preventDefault();

      let {ht,ttc} = pricingManager.getApplicationPrice('rendezvous');

      ShoppingCartService.addItem({
          id : 'application-rendezvous',
          name :'Agenda',
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
    const hasRendezVous = this.user() ? this.user().hasRendezVous() : false;
    return (
      <Panel style={{ padding: '1em 0' }}>
        <Row>
          <img
            className="img-thumbnail img-circle img-responsive center-block" alt=""
            src="/pro/Rendez-vous.png" width="40%" height="45%"
          />
        </Row>
        <Row bsClass="text-center">
          <h1>
            <span
              className={(classNames('label', hasRendezVous ? 'label-primary' : 'label-default'))}
              style={{ fontSize: '.5em' }}
            >
              Rendez-vous
            </span>
          </h1>
          {
            hasRendezVous ?
              <div>
                <Row>
                  <a href="/home_pro/rendezvous" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a>
                </Row>
                <Row>
                    <Button
                        type="button"
                        bsSize="sm" bsStyle="info"
                        bsClass="btn btn-circle green"
                        onClick={this.handleClick}
                    >Ajouter au panier</Button>
                </Row>
              </div>
                :
              <div>
                <Row>
                  <a href="/home_pro/rendezvous" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a></Row>
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

export default RendezVous;
