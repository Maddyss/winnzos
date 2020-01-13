import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Row, Button, Panel } from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import moment from 'moment';

import '../style/presentationProduit.css';
import { setEmployeeManagement } from '/imports/api/Users';
import ShoppingCartService from '/imports/shoppingcart/shoppingcartservice.js';
import swal from 'sweetalert2';

import pricingManager from '/imports/api/utils/pricingManager.js';

class InfoEmployee extends UserReactiveComponent {
    static propTypes = {
        info: PropTypes.bool,
    }
    static defaultProps = {
        info: false
    }
    handleClick = (e) => {
        e.preventDefault();


        let {ht,ttc} = pricingManager.getApplicationPrice('employeemanagement');

        ShoppingCartService.addItem({
            id : 'application-employeemanagement',
            name :'Gestion des employés',
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
                <div className="cbp-l-project-title">Gestion employé</div>
                <div className="cbp-l-project-subtitle">le { moment().format('DD/MM/YYYY')  }</div>
                <div className="cbp-slider">
                    <ul className="cbp-slider-wrap">
                        <li className="cbp-slider-item">
                            <img src="/front/Employee.png" alt="Gestion employé"/>
                        </li>
                    </ul>
                </div>
                <div className="cbp-l-project-container">
                    <div className="cbp-l-project-desc">
                        <div className="cbp-l-project-desc-title">
                            <span>Produit Description</span>
                        </div>
                        <p>Une application complémentaire de la prise de rendez-vous. Vous permet de gérer un nombre illimité de calendrier. </p>
                        <p> Afficher les compétences de vos employés publiquement. L'employé dispose de son propre compte avec la visibilité de son planing à tous moment.</p>
                    </div>
                    <div className="cbp-l-project-details">
                        <div className="cbp-l-project-details-title">
                            <span>Produit Details</span>
                        </div>
                        <ul className="cbp-l-project-details-list">
                            <li>
                                <strong>Prduit</strong>Gestion employé</li>
                            <li>
                                <strong>Durée</strong>Valable à vie</li>
                            <li>
                                <strong>Compatible</strong><i className="fa fa-desktop"></i><i className="fa fa-tablet"></i><i className="fa fa-mobile"></i></li>
                            <li>
                                <strong>Tarif</strong>10 €</li>
                            <li>
                                <strong>Tarif Premium</strong>Sans frais durant la période d'abonnement</li>
                        </ul>
                        { this.props.info ? null : <button onClick={this.handleClick} className="cbp-l-project-details-visit btn red uppercase">Ajouter au panier</button> }
                    </div>
                </div>
                {/* <div className="cbp-l-project-container">
                    <div className="cbp-l-project-related">
                        <div className="cbp-l-project-desc-title">
                            <span>Vidéo Présentation</span>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default InfoEmployee;
