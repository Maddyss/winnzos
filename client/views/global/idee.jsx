import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import '/client/views/admin/Applications/components/style/presentationProduit.css';

class Idee extends Component {
    render() {
        return (
            <div className="portfolio-content">
                <div className="fondBleu">
                    <div className="cbp-l-project-title"><h1>Améliorez la visibilité de votre entreprise</h1></div>
                    <div className="cbp-l-project-subtitle">
                        <h2 style={{'color':'black'}}>Création de site web </h2>
                        <h2 style={{'color':'black'}}>Référencement localisé</h2>
                        <h2 style={{'color':'black'}}>Création d'une identité unique </h2>
                        <h2 style={{'color':'black'}}>Diminution des rendez-vous perdus </h2>
                    </div>
                    <div style={{'textAlign':'center'}}>
                        <a href="/register" className="btn red uppercase">Inscription gratuite <i className="fa fa-chevron-right"></i> </a>
                    </div>
                </div>
                <div className="cbp-l-project-container container">
                    <div className="row justify-content-md-center">

                            <div className="col-md-6">

                                <div className="appli module-visi">
                                    <h2><img src="/front/eye.png" alt="Module Visibilité" />&nbsp;&nbsp;Visibilité</h2>

                                    <p>Votre présence sur le web et la prise de rendez-vous en ligne 100% maitrisée</p>

                                    <a href="/visibilite" className="btn red uppercase">En savoir plus</a>
                                </div>

                            </div>

                        {/*<div className="col-md-6">

                                <div className="appli module-client">
                                        <h2><img src="/front/blogger.png" />&nbsp;&nbsp;Client</h2>

                                        <p>Gérez et améliorez votre base client</p>

                                        <a href="/client" className="btn red uppercase" >En savoir plus</a>

                                </div>

                            </div>*/}

                            <div className="col-md-6">
                                <div className="appli module-suivi">
                                    <h2><img src="/front/customer-service.png" />&nbsp;&nbsp;Accompagement</h2>

                                        <p>Un suivi personnlisé dans votre développement</p>

                                        <a href="/accompagnement" className="btn red uppercase" >En savoir plus</a>
                                </div>
                            </div>



                            <div className="col-md-6">

                                <div className="appli module-agenda">
                                    <h2><img src="/front/schedule.png" />&nbsp;&nbsp;E-agenda</h2>


                                        <p>L'agenda connecté le plus complet du marché</p>

                                        <a href="/rendezvous" className="btn red uppercase" >En savoir plus</a>
                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="appli module-stats">
                                    <h2><img src="/front/analytics.png" />&nbsp;&nbsp;Statistiques</h2>

                                        <p>Visualisez les résultats de votre visibilités</p>

                                        <a href="/statistiques" className="btn red uppercase" >En savoir plus</a>
                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="appli module-stats">
                                    <h2><img src="/front/analytics.png" />&nbsp;&nbsp;ChatBot</h2>

                                    <p>Ne manquez plus un client, réponse instantannée garantie</p>

                                    <a href="/iwinn" className="btn red uppercase" >En savoir plus</a>
                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="appli module-plus">
                                    <h2><img src="/front/plus.png" />&nbsp;&nbsp;Winnzos évolue</h2>

                                        <p>Et bien d'autres options à venir ...</p>

                                        <a href="/autres" className="btn red uppercase" >En savoir plus</a>

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
                            <video poster="/front/chezTeo.png" width="100%" height="auto" className="center-block" controls>
                                <source src="/WINNZOS_ANIMOTION_V04.mp4" type="video/mp4" />
                                <source src="/WINNZOS_ANIMOTION_V04_WEBM.webm" type="video/webm" />
                                <p>Votre navigateur n'est pas compatible avec le HTML 5, la vidéo est disponible sur youtube : https://www.youtube.com/watch?v=ykoPGbxBcEo&t=8s.</p>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Idee;
