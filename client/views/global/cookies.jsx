/**
 * Created by root on 29/08/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import '/imports/stylesheet/front/articles.css';

export default class Cookies extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className="content cookies">
                <div className="section-heading">
                    <h2 className="heading-1 with-lines">Les Cookies</h2>
                </div>
                <div className="container">
                    <h3>Informations sur les cookies</h3>
                    <h4>L´utilisation des cookies lors de votre visite sur Winnzos</h4>
                    <p className="article_paragraphe">Pour permettre aux utilisateurs de Winnzos de bénéficier des services proposés par le site tels que la consultation d'horaires,
                        l'inscription à certains services, de l’optimisation de son utilisation et de sa personnalisation en fonction de l’utilisateur,
                        le site utilise des Cookies.</p><p>Sauf si vous décidez de désactiver les cookies, vous acceptez que le site puisse les utiliser.
                    Vous pouvez à tout moment désactiver ces cookies et ce gratuitement à partir des possibilités de désactivation qui vous sont offertes et
                    rappelées ci-après, sachant que cela peut réduire ou empêcher l’accessibilité à tout ou partie des Services proposés par le site.</p>
                    <h4>Qu’est-ce qu’un cookie et son utilité ?</h4><p>Lors de la consultation du site, des informations relatives à la navigation de votre terminal
                    (ordinateur, tablette, smartphone, etc.) sur le site peuvent être enregistrées dans des fichiers texte appelés "Cookies",
                    installés sur votre navigateur. Les cookies vont être utilisés pour reconnaître votre navigateur pendant la durée de validité du cookie concerné.</p>
                    <p className="article_paragraphe">Seul l'émetteur du cookie concerné est susceptible de lire ou de modifier les informations qui y sont contenues.</p>
                    <p className="article_paragraphe">Certains cookies sont indispensables à l´utilisation du site, d´autres permettent d´optimiser l’utilisation du site et
                        de personnaliser les contenus affichés, ainsi les cookies permettent :</p>
                    <ul>
                        <li>De mesurer et d’analyser la fréquentation et d'utilisation du site, de ses rubriques et services proposés, nous permettant de
                            réaliser des études et d'améliorer l'intérêt et l'ergonomie du site et de nos services,</li>
                        <li>De mémoriser les préférences d'affichage de votre navigateur (langue utilisée, paramètres d'affichage,
                            système d’exploitation utilisé, etc) et d’adapter la présentation du site lors de vos visites, selon les matériels et
                            logiciels de visualisation ou de lecture que comporte votre terminal et qui sont utilisés pour la navigation sur notre site.</li>
                        <li>De mémoriser les informations relatives, par exemple, à un formulaire que vous avez rempli ou à un service (inscription, accès à votre compte)
                            ou une information que vous avez choisie (services souscrits, contenu de votre panier).</li>
                        <li>De vous permettre d'accéder à des espaces réservés et personnels du site ou de nos Services, tels
                            que votre compte personnel, grâce à des identifiants ou des données personnelles vous concernant antérieurement communiquées,
                            vous permettant le cas échéant d’accéder à des contenus personnalisés,</li><li>De mettre en œuvre des mesures de sécurité.</li>
                    </ul>
                    <h4>Les cookies déposés par un tiers sur des espaces de notre site</h4>
                    <p className="article_paragraphe">Notre site est susceptible de contenir des Cookies émis par des tiers (outil de mesure des performances, société de mesure d'audience, etc.)
                        permettant à ces derniers, pendant la durée de validité de leurs Cookies de recueillir des informations de navigation relatives aux navigateurs
                        consultant notre site.</p><p>À tout moment vous pourrez empêcher la collecte d’information vous concernant via ces cookies tiers, en cliquant sur
                    les liens correspondant (voir le chapitre "Votre gestion et utilisation des cookies").</p>
                    <p className="article_paragraphe">L'émission et l'utilisation de Cookies par ces entreprises sont soumises à leurs propres conditions d’utilisation.</p>
                    <h4>Partage de l'utilisation de votre terminal avec d'autres personnes</h4>
                    <p className="article_paragraphe">Si votre terminal est utilisé par plusieurs personnes et lorsqu'un même terminal dispose de plusieurs logiciels de navigation, nous ne pouvons
                        pas nous assurer de manière certaine que les services destinés à votre terminal correspondent bien à votre propre utilisation de ce terminal et
                        non à celle d'un autre utilisateur de ce terminal.</p><p>Le partage avec d'autres personnes de l'utilisation de votre terminal et la
                    configuration des paramètres de votre navigateur à l'égard des Cookies, relèvent de votre libre choix et de votre responsabilité.</p>
                    <h4>Votre gestion et utilisation des cookies</h4><p>Vous pouvez gérer et modifier à tout moment l’utilisation des cookies suivant
                    les possibilités rappelées ci-après.</p><p>Les paramétrages que vous effectuerez sont susceptibles de modifier votre navigation sur
                    internet et vos conditions d’accès et d’utilisation de certains services de notre site qui nécessitent l’utilisation de cookies.</p>
                    <h5>Gestion de vos cookies à partir de votre logiciel de navigation</h5>
                    <p className="article_paragraphe">Vous pouvez configurer votre logiciel de navigation de manière à ce que des Cookies soient enregistrés dans votre terminal ou
                        qu'ils soient rejetés, soit systématiquement, soit selon leur émetteur.</p>
                    <p className="article_paragraphe">Pour connaître les modalités applicables à la gestion des cookies stockés dans votre navigateur, nous vous invitons
                        à consulter le menu d'aide de votre navigateur ainsi que la rubrique « Vos traces » du site de la CNIL
                        (Commission Nationale de l’Informatique & des Libertés) (<a href="http://www.cnil.fr/vos-libertes/vos-traces/les-cookies/">http://www.cnil.fr/vos-libertes/vos-traces/les-cookies/</a>).
                    </p>
                </div>
            </div>
        )
    }

}