/**
 * Created by root on 27/08/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import PrixPro  from '/imports/Component/home/prixPro';
import Appli  from '/imports/Component/home/Appli';

import '/imports/stylesheet/front/articles.css';

export default class OffrePro extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>
                <div className="section-heading">
                    <h1 className="heading-1 with-lines">Les offres ProWinn'</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div>
                            <p>Saviez-vous que 92 % des internautes font des recherches en ligne avant de se déplacer en magasin ? Ils se renseignent sur les commerces vendant les produits ou services dont ils ont besoin. Ils regardent aussi la localisation, les tarifs.., bref, ils recherchent ce qui est le plus pratique pour eux. Voilà pourquoi ils doivent pouvoir vous trouver ! Être visible sur internet est la clé du succès.</p>

                            <p>Winnzos est spécialement conçu pour vous rendre visible sur internet. Vous tenez un salon de coiffure à Rennes ? Les Bretons à la recherche d’un coiffeur qui se connecteront sur notre site vous trouveront ! Vous dirigez un magasin de chaussures à Lille ? Les internautes du Nord-Pas-de-Calais-Picardie à la recherche d’une nouvelle chaussure sauront que vous êtes là !</p>

                            <p>Pour être visible sur internet, il vous suffit pour cela de vous inscrire gratuitement sur notre plateforme. Quelques clics et gagnez en visibilité ! Vous pourrez, en outre, bénéficier de tout un tas de services additionnels : devis, factures, contacts instantanés avec le client, prises de rendez-vous en ligne… Aucun de ces services n’est obligatoire, mais ils vont optimiser vos interactions avec les consommateurs. Plus de visibilité sur le web signifie plus de prospects et, donc, plus de clients. Avec Winnzos, soyez visible sur internet et boostez les ventes de votre entreprise !</p>
                        </div>
                    </div>
                    <div className="row">
                        <PrixPro />
                    </div>
                </div>
                {/*<div className="section-heading">
                    <h2 className="heading-1 with-lines">Les applications disponibles</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <Appli />
                    </div>
                </div>*/}
            </div>
        )
    }

}