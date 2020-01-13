import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Row, Button, Panel } from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import moment from 'moment';

import '../style/presentationProduit.css';


class InfoPDF extends UserReactiveComponent {
    static propTypes = {
        info: PropTypes.bool,
    }
    static defaultProps = {
        info: false
    }
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
        return (
            <div className="portfolio-content">
                <div className="cbp-l-project-title">Devis Facture</div>
                <div className="cbp-l-project-subtitle">le { moment().format('DD/MM/YYYY')  }</div>
                <div className="cbp-slider">
                    <ul className="cbp-slider-wrap">
                        <li className="cbp-slider-item">
                        </li>
                    </ul>
                </div>
                <div className="cbp-l-project-container">
                    <div className="cbp-l-project-desc">
                        <div className="cbp-l-project-desc-title">
                            <span>Produit Description</span>
                        </div>
                        <p>En cours de développement !</p>
                    </div>
                    <div className="cbp-l-project-details">
                        <div className="cbp-l-project-details-title">
                            <span>Produit Details</span>
                        </div>
                        <ul className="cbp-l-project-details-list">
                            <li>
                                <strong>Prduit</strong>Devis Facture</li>
                            <li>
                                <strong>Durée</strong>Valable à vie</li>
                            <li>
                                <strong>Compatible</strong><i className="fa fa-desktop"></i><i className="fa fa-tablet"></i><i className="fa fa-mobile"></i></li>
                            <li>
                                <strong>Tarif</strong>En cours !</li>
                            <li>
                                <strong>Tarif Premium</strong>Sans frais durant la période d'abonnement</li>
                        </ul>
                        { this.props.info ? null : <button onClick={this.handleClick} className="cbp-l-project-details-visit btn red uppercase">Ajouter au panier</button> }
                    </div>
                </div>
                <div className="cbp-l-project-container">
                    <div className="cbp-l-project-related">
                        <div className="cbp-l-project-desc-title">
                            <span>Vidéo Présentation</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPDF;
