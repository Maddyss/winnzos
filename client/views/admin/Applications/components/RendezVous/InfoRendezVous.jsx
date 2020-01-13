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



class InfoRendezVous extends UserReactiveComponent {
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
            <div className="fondBleu">
                <div className="cbp-l-project-title"><h1>E-Agenda</h1></div>
                <div className="cbp-l-project-subtitle">
                    <h2 style={{'color':'black'}}>10 jours Gratuit pour découvrir tous Winnzos</h2></div>
                <div style={{'textAlign':'center'}}>
                    <a href="/register" className="btn red uppercase">Démarrez gratuitement <i className="fa fa-chevron-right"></i> </a>
                </div>
            </div>
            <div className="cbp-l-project-container container">
                <div className="row" style={{'paddingBottom':'50px'}}>

                    <div className="center-block">
                        <div className="col-md-4">

                            <h2 style={{'color':'blue'}}>Agenda complet et efficace</h2>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}> Une application agenda de gestion des rendez-vous qui vous simplifie la vie !</p>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}> Vos clients accèdent à vos disponibilités, prennent rendez-vous en ligne 24h/24, 7j/7, et vous sollicitent moins par téléphone : votre ligne est donc disponible pour les appels vraiment importants !</p>
                            <p><a href="/pro/Winnzos?pro=qofvbCLNeAgBzWiiA&utile=whdNPpGWTTPYRc7AS" className="btn red uppercase">Prenez rendez-vous avec Winnzos </a></p>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                        <div className="thumbnail">

                            <img src="/front/Sans titre-6.png" alt="Agenda co" style={{'display':'block', 'width':'100%'}} />
                        </div>

                    </div>



                </div>
                <div className="row" style={{'paddingBottom':'50px'}}>

                    <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                        <div className="thumbnail">

                            <img src="/front/winnzos-eagenda.jpg" alt="Agenda complet" style={{'display':'block', 'width':'50%', 'height': ''}} />
                        </div>

                    </div>

                    <div className="col-md-4 center-block">

                        <h2 style={{'color':'blue'}}>Un seul agenda pour toutes votre entreprise</h2>
                        <p style={{'textAlign':'left', 'fontSize':'16px'}}>Disposez d'un calendrier pour tous vos collégues, sans frais supplémentaire. </p>
                        <p style={{'textAlign':'left', 'fontSize':'16px'}}>Accès individuelle pour chaque agenda avec une description pour le client de chaque agenda. </p>
                        <p style={{'textAlign':'left', 'fontSize':'16px'}}>Pour vous gérez l'affichage de votre agenda en mode groupé ou individuelle.</p>

                    </div>

                </div>
                <div className="row">

                    <div className="center-block">
                        <div className="col-md-4">

                            <h2 style={{'color':'blue'}}>Intégration sur votre site web</h2>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}> Intégrez la prise de rendez-vous sur votre site web.</p>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}> Intégration simple, sur tous type de site web aucune compétences particulières nécessaires.</p>

                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                        <div className="thumbnail">

                            <img src="/front/Winnzos_AgendaIntegration.jpg" alt="Package visibilité" style={{'display':'block', 'width':'100%'}} />
                        </div>

                    </div>



                </div>
            </div>
            <div className="cbp-l-project-container container">
                <div className="cbp-l-project-related">
                    <div className="cbp-l-project-desc-title">
                        <span>Vidéo de Présentation</span>
                    </div>
                    <div className="row">
                        <video poster="/front/FondTravaiRDV1.jpg" width="100%" height="auto" className="center-block" controls>
                            <source src="/PriseRDV.mp4" type="video/mp4" />
                            <p>Votre navigateur n'est pas compatible avec le HTML 5, la vidéo est disponible sur youtube : <a href="https://www.youtube.com/watch?v=rCxKDxPU4Yw" >Logiciel de gestion des rendez-vous</a>.</p>
                        </video>
                    </div>
                </div>
            </div>
        </div>

        );
    }
}

export default InfoRendezVous;
