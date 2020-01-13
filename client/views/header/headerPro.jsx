import React, { Component } from 'react';
import { mount }  from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import classNames from 'classnames';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

import '/imports/stylesheet/front/global.css';

import LoginButton from '/imports/Component/global/loginFront.jsx';


import '/imports/scripts/twakto';

export default class HeaderPro extends Component {
    constructor(props){
        super(props);
        Meteor.users.deny({
            update() { return true; }
        });
    }
    render() {
        const hasIdee = FlowRouter.current().path === '/idee' ? true : false;
        const hasVisi = FlowRouter.current().path === '/visibilite' ? true : false;
        const hasClient = FlowRouter.current().path === '/client' ? true : false;
        const hasAccom = FlowRouter.current().path === '/accompagnement' ? true : false;
        const hasRdv = FlowRouter.current().path === '/rendezvous' ? true : false;
        const hasStats = FlowRouter.current().path === '/statistiques' ? true : false;
        const hasOther = FlowRouter.current().path === '/autres' ? true : false;
        const hasTarif = FlowRouter.current().path === '/winnzos-pro' ? true : false;
        const hasChatbot = FlowRouter.current().path === '/iwinn' ? true : false;
        return (
            <div>
                <header>
                    <div className="row">
                        <nav className="nav--main" role="navigation">
                            <div className="navbar-header">
                                <a href="/" title="Accueil" id="logo"><img src="/front/logo-winnzos.png" alt="WINNZOS" className="img-fluid pull-xs-left" /></a>
                            </div>
                            <ul className="menu-droite nav navbar-nav">
                                <li className="tel-market"><a href="tel:+33972589029" ><i className="fa fa-phone"></i> 09 72 58 90 29</a></li>
                                <li className="nav-register"><a href="/register" className="header-buttons" id="pro-button">Essayez gratuitement</a></li>
                            </ul>

                            <ul className="menu-interaction nav-menu-gauche nav navbar-nav collapse navbar-collapse" id="main-navbar-collapse">
                                <li><a href="/idee" className={(classNames('', hasIdee ? 'current' : ''))} >Idée</a></li>




                                <li className="dropdown">
                                    <a href="javascript:void(0)" data-toggle="dropdown" className="dropdown-toggle " >Fonctionnalités</a>
                                    <div className="dropdown-menu" aria-labelledby="fonctionnalites">
                                        <ul className="container-dropdown">

                                            <li><a className={(classNames('', hasVisi ? 'current' : ''))} href="/visibilite" >Visibilité</a></li>
                                            {/*<li><a className={(classNames('', hasClient ? 'current' : ''))} href="/client" >Client</a></li>*/}
                                            <li><a className={(classNames('', hasAccom ? 'current' : ''))} href="/accompagnement" >Accompagnement</a></li>
                                            <li><a className={(classNames('', hasRdv ? 'current' : ''))} href="/rendezvous" >E-Agenda</a></li>
                                            <li><a className={(classNames('', hasStats ? 'current' : ''))} href="/statistiques" >Statistiques</a></li>
                                            <li><a className={(classNames('', hasChatbot ? 'current' : ''))} href="/iwinn" >iWinn</a></li>
                                            <li><a className={(classNames('', hasOther ? 'current' : ''))} href="/autres" >Encore plus</a></li>

                                        </ul>
                                    </div>
                                </li>
                                <li><a href="/winnzos-pro" className={(classNames('', hasTarif ? 'current' : ''))}>Tarif</a></li>
                            </ul>
                        </nav>
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
                                            <li><a href="/annuaire/44">&gt; Alsace</a></li>
                                            <li><a href="/annuaire/75">&gt; Aquitaine</a></li>
                                            <li><a href="/annuaire/84">&gt; Auvergne</a></li>
                                            <li><a href="/annuaire/28">&gt; Basse-Normandie</a></li>
                                            <li><a href="/annuaire/27">&gt; Bourgogne</a></li>
                                            <li><a href="/annuaire/53">&gt; Bretagne</a></li>
                                            <li><a href="/annuaire/24">&gt; Centre</a></li>
                                            <li><a href="/annuaire/44">&gt; Champagne-Ardenne</a></li>
                                            <li><a href="/annuaire/94">&gt; Corse</a></li>
                                            <li><a href="/annuaire/27">&gt; Franche-Comt&eacute;</a></li>
                                            <li><a href="/annuaire/28">&gt; Haute-Normandie</a></li>
                                            <li><a href="/annuaire/11">&gt; Ile-de-France</a></li>
                                            <li><a href="/annuaire/76">&gt; Languedoc-Roussillon</a></li>
                                        </ul>
                                        <ul className="col-xs-6 tight">
                                            <li><a href="/annuaire/75">&gt; Limousin</a></li>
                                            <li><a href="/annuaire/44">&gt; Lorraine</a></li>
                                            <li><a href="/annuaire/76">&gt; Midi-Pyr&eacute;n&eacute;es</a></li>
                                            <li><a href="/annuaire/32">&gt; Nord-Pas-de-Calais</a></li>
                                            <li><a href="/annuaire/52">&gt; Pays de la Loire</a></li>
                                            <li><a href="/annuaire/32">&gt; Picardie</a></li>
                                            <li><a href="/annuaire/75">&gt; Poitou-Charentes</a></li>
                                            <li><a href="/annuaire/93">&gt; Provence-Alpes-C&ocirc;te d'Azur</a></li>
                                            <li><a href="/annuaire/84">&gt; Rh&ocirc;ne-Alpes</a></li>
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




