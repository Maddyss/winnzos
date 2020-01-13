import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Row, Button, Panel } from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import moment from 'moment';

import '../style/presentationProduit.css';
import { setEmployeeManagement } from '/imports/api/Users';
import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';
import swal from 'sweetalert2';


class InfoSurMesure extends UserReactiveComponent {
    envoi()
    {
        let email = this.refs.email.value;
        let tel = this.refs.tel.value;
        let message = this.refs.message.value;

        check([email,tel,message], [String]);

        if(email.length > 0 && message.length >0){
            Meteor.call('sendEmail',
                'contact@winnzos.fr',
                'contact@winnzos.fr',
                'Contact d\'un utilisateur sur Winnzos',
                message + '\n Téléphone : ' + tel + '\n email : ' + email);
        }
        else{
            Bert.alert({title: 'Information incomplète',message :'', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }

    }
    render() {
        return (
            <div className="portfolio-content">
                <div className="cbp-l-project-title">Parler nous de votre projet !</div>


                <Row>
                    <h2 className="center-block">Vous désirez une application sur mesure ou personnaliser une application. Contacter nous au <strong>09.72.58.90.29</strong> Gratuit ou donner nous les détails de votre besoin ci-dessous.</h2>
                </Row>
                <Row>
                    <form onSubmit={this.envoi.bind(this)}>
                        <div className="form-group">
                            <input type="text" placeholder="Email *" className="form-control input-md" ref="email" /> </div>
                        <div className="form-group">
                            <input type="text" placeholder="Téléphone" className="form-control input-md" ref="tel" /> </div>
                        <div className="form-group">
                            <textarea rows="8" name="message" placeholder="Donner le plus de détails possible sur votre besoin. Nous vous recontacterons le plus rapidement possible." className="form-control input-md" ref="message" ></textarea>
                        </div>
                        <button type="submit" className="btn grey">Envoyer</button>
                    </form>
                </Row>

            </div>
        );
    }
}

export default InfoSurMesure;
