import React, { Component } from 'react';

import '/imports/scripts/carteFrance/jquery.jqvmap.js';
import '/imports/scripts/carteFrance/jquery.jqvmap.france.js';
import '/imports/stylesheet/front/jqvmap.style.css';

export default class CarteFranceDOM extends Component {
    constructor(props)
    {
        super(props);
    }
    componentDidMount()
    {
        $('#francemap').css('width', '100%').css('max-width', '500px').css('min-width', '100px');
        $('#francemap').css('height', '500px');
        $('#francemap svg').css('width', '100%');
        $('#francemap svg').css('height', 'auto');
        $('#francemap').vectorMap({
            map: 'france_fr',
            hoverOpacity: 0.5,
            hoverColor: "#BB1A25",
            color: "#FFFFFF",
            borderColor: "#000000",
            selectedColor: "#EC0000",
            enableZoom: true,
            showTooltip: true,
            onRegionClick: function(element, code, region)
            {
                FlowRouter.go('/annuaire/' + code);
            }
        });
        $('#francemap').css('background', 'inherit');
        $('#francemap').css('text-align', 'center');
        window.prerenderReady = true;
    }
    componentWillUnmount () {
        $('.jqvmap-label').hide();
    }

    render() {
        return (
            <section id="home-banner">
                <div className="container">
                    <div className="row">
                        <div id="banner-heading" className="col-xs-12">
                            <h1 className="heading-1">Consultez les offres des commer&ccedil;ants <span>proches de chez vous</span> et prenez rendez-vous en ligne.</h1>
                            <p className="sub-heading-1">C'est rapide, simple et gratuit.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div id="banner-left" className="col-sm-4 hidden-xs">
                            {/*<a href="#" title="Autour de moi"><i className="fa fa-map-marker"></i> Autour de moi</a>*/}
                            <ul className="regions-list">
                                <li><a href="/annuaire/44">Alsace</a></li>
                                <li><a href="/annuaire/75">Aquitaine</a></li>
                                <li><a href="/annuaire/84">Auvergne</a></li>
                                <li><a href="/annuaire/28">Basse-Normandie</a></li>
                                <li><a href="/annuaire/27">Bourgogne</a></li>
                                <li><a href="/annuaire/53">Bretagne</a></li>
                                <li><a href="/annuaire/24">Centre</a></li>
                                <li><a href="/annuaire/44">Champagne-Ardenne</a></li>
                                <li><a href="/annuaire/94">Corse</a></li>
                                <li><a href="/annuaire/27">Franche-Comt&eacute;</a></li>
                                <li><a href="/annuaire/28">Haute-Normandie</a></li>
                                <li><a href="/annuaire/11">Ile-de-France</a></li>
                                <li><a href="/annuaire/76">Languedoc-Roussillon</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <div id="francemap" ></div>
                        </div>
                        <div id="banner-right" className="col-sm-4 hidden-xs">
                            <ul className="regions-list">
                                <li><a href="/annuaire/75">Limousin</a></li>
                                <li><a href="/annuaire/44">Lorraine</a></li>
                                <li><a href="/annuaire/76">Midi-Pyr&eacute;n&eacute;es</a></li>
                                <li><a href="/annuaire/32">Nord-Pas-de-Calais</a></li>
                                <li><a href="/annuaire/52">Pays de la Loire</a></li>
                                <li><a href="/annuaire/32">Picardie</a></li>
                                <li><a href="/annuaire/75">Poitou-Charentes</a></li>
                                <li><a href="/annuaire/93">Provence-Alpes-C&ocirc;te d'Azur</a></li>
                                <li><a href="/annuaire/84">Rh&ocirc;ne-Alpes</a></li>
                                <li><a href="/annuaire/99">Guadeloupe</a></li>
                                <li><a href="/annuaire/99">Martinique</a></li>
                                <li><a href="/annuaire/99">Guyane</a></li>
                                <li><a href="/annuaire/99">R&eacute;union</a></li>
                                <li><a href="/annuaire/1">Autres</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};