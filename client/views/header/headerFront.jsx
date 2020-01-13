import React, { Component } from 'react';
import { mount }  from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import '/imports/stylesheet/front/global.css';

import LoginButton from '/imports/Component/global/loginFront.jsx';


import '/imports/scripts/twakto';

export default class HeaderFront extends Component {
    constructor(props){
        super(props);
        Meteor.users.deny({
            update() { return true; }
        });
    }
    render() {
        return (
            <div>
                <header>
                    <div className="row">
                        { FlowRouter.current().path === '/winnzos-pro' ?
                            <a href="/page_login" className="header-buttons" id="pro-button">Connection</a> :
                            <a href="/idee" className="header-buttons" id="pro-button">Professionnel ?</a> }
                        { FlowRouter.current().path === '/winnzos-pro' ? null : <LoginButton /> }
                        <a href="/" title="Accueil" id="logo"><img src="/front/logo-winnzos.png" alt="WINNZOS" className="img-fluid pull-xs-left" /></a>
                    </div>
                </header>
                <main>
                    {this.props.content}
                </main>
                <footer>
                    <section id="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <h3 className="heading-1">Les offres par r&eacute;gion</h3>
                                    <div className="row">
                                        <ul className="col-xs-6 tight">
                                            <li><a href="/annuaire/44/plan">&gt; Alsace</a></li>
                                            <li><a href="/annuaire/75/plan">&gt; Aquitaine</a></li>
                                            <li><a href="/annuaire/84/plan">&gt; Auvergne</a></li>
                                            <li><a href="/annuaire/28/plan">&gt; Basse-Normandie</a></li>
                                            <li><a href="/annuaire/27/plan">&gt; Bourgogne</a></li>
                                            <li><a href="/annuaire/53/plan">&gt; Bretagne</a></li>
                                            <li><a href="/annuaire/24/plan">&gt; Centre</a></li>
                                            <li><a href="/annuaire/44/plan">&gt; Champagne-Ardenne</a></li>
                                            <li><a href="/annuaire/94/plan">&gt; Corse</a></li>
                                            <li><a href="/annuaire/27/plan">&gt; Franche-Comt&eacute;</a></li>
                                            <li><a href="/annuaire/28/plan">&gt; Haute-Normandie</a></li>
                                            <li><a href="/annuaire/11/plan">&gt; Ile-de-France</a></li>
                                            <li><a href="/annuaire/76/plan">&gt; Languedoc-Roussillon</a></li>
                                        </ul>
                                        <ul className="col-xs-6 tight">
                                            <li><a href="/annuaire/75/plan">&gt; Limousin</a></li>
                                            <li><a href="/annuaire/44/plan">&gt; Lorraine</a></li>
                                            <li><a href="/annuaire/76/plan">&gt; Midi-Pyr&eacute;n&eacute;es</a></li>
                                            <li><a href="/annuaire/32/plan">&gt; Nord-Pas-de-Calais</a></li>
                                            <li><a href="/annuaire/52/plan">&gt; Pays de la Loire</a></li>
                                            <li><a href="/annuaire/32/plan">&gt; Picardie</a></li>
                                            <li><a href="/annuaire/75/plan">&gt; Poitou-Charentes</a></li>
                                            <li><a href="/annuaire/93/plan">&gt; Provence-Alpes-C&ocirc;te d'Azur</a></li>
                                            <li><a href="/annuaire/84/plan">&gt; Rh&ocirc;ne-Alpes</a></li>
                                            <li><a href="/annuaire/1">&gt; Etrangers</a></li>
                                            <li><a href="/annuaire/99">&gt; DOM-TOM</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-2">
                                    <h3 className="heading-1">Recherches fr&eacute;quentes</h3>
                                    <ul className="col-xs-12 tight">
                                        <li><a  href="/annuaire/11/Paris/SE3">&gt; Coiffeurs sur Paris</a></li>
                                        <li><a href="/annuaire/53/Rennes/SE3">&gt; Coiffeurs sur Rennes</a></li>
                                        <li><a href="/annuaire/84/Lyon/SE3">&gt; Coiffeurs sur Lyon</a></li>
                                        <li><a href="/annuaire/75/Bordeaux/SE3">&gt; Coiffeurs sur Bordeaux</a></li>
                                        <li><a href="/annuaire/75/Niort/SE3">&gt; Coiffeurs sur Niort</a></li>
                                        <li><a href="/annuaire/27/Dijon/A3">&gt; Traiteur sur Dijon</a></li>
                                        <li><a href="/annuaire/32/Lens/A3">&gt; Traiteur sur Lens</a></li>
                                        <li><a href="/annuaire/93/Marseille/A3">&gt; Traiteur sur Marseille</a></li>
                                        <li><a href="/annuaire/93/Nice/C7">&gt; Fleuriste sur Nice</a></li>
                                        <li><a href="/annuaire/93/Aix-en-Provence/C7">&gt; Fleuriste sur Aix-en-Provence</a></li>
                                        <li><a href="/annuaire/76/Montpellier/C7">&gt; Fleuriste sur Montpellier</a></li>
                                    </ul>
                                </div>
                                <div className="col-xs-12 col-sm-2">
                                    <h3 className="heading-1">&Agrave; propos</h3>
                                    <ul>
                                        <li><a href="/contact" title="Contactez-nous">&gt; Contactez-nous</a></li>
                                        <li><a href="/mentionL" title="Mentions l&eacute;gales">&gt; Mentions l&eacute;gales</a></li>
                                        <li><a href="/condG" title="Conditions g&eacute;n&eacute;rales d'utilisation">&gt; Conditions g&eacute;n&eacute;rales d'utilisation</a></li>
                                    </ul>
                                    <ul className="social-list">
                                        <li><a href="http://www.facebook.com/winnzos" title="Aimez-nous sur Facebook">Aimez-nous sur &nbsp;<img src="/front/icon-fb.png" alt="Facebook" /></a></li>
                                        <li><a href="http://www.twitter.com/@winnzos" title="Suivez-nous sur Twitter">Suivez-nous sur &nbsp;<img src="/front/icon-tw.png" alt="Twitter" /></a></li>
                                    </ul>
                                </div>
                                <div className="col-xs-12 col-sm-2">
                                    <h3 className="heading-1">Partenaires</h3>
                                    <ul>
                                        <li><a href="https://www.meteor.com/partners" title="Meteor Partner"><img src="/front/MeteorPartner.png" width="100" height="100"></img></a></li>
                                        <li><a href="http://www.spn.asso.fr/" title="SPN Partenaire"><img src="/front/spn_logo.jpg"></img></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div>
                                    <p className="text-center">&copy; 2016 WINNZOS. Tous droits r&eacute;serv&eacute;s</p>
                                    <p className="text-center"> Winnzos : <i className="fa fa-map-marker"></i> 3 allée Yacine Kateb, 79000 Niort </p>
                                    <p className="text-center"> <a href="mailto:contact@winnzos.fr">contact@winnzos.fr</a>&nbsp;/&nbsp;<i className="fa fa-phone"></i> : 09.72.58.90.29 </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </footer>
            </div>
        )
    }

};




