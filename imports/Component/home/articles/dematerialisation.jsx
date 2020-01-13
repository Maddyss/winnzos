/**
 * Created by root on 02/09/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import SearchDom from '/imports/Component/global/search.jsx';

import '/imports/stylesheet/front/articles.css';

export default class Dematerialisation extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>
                <article className="article">
                    <div className="article__header">
                        <div className="container">
                            <div className="row">
                                <div className="breadcrumbs__outer">
                                    <div className="breadcrumbs__inner">
                                        <ul>
                                            <li className="breadcrumbs__breadcrumb-container">
                                                <a className="breadcrumbs__breadcrumb" href="/articles">Business</a>
                                            </li>
                                            <li className="breadcrumbs__breadcrumb-container">
                                                <a className="breadcrumbs__breadcrumb breadcrumbs__breadcrumb--active" href="/articles/dematerialisation">Articles</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="article__header-inner">
                                    <div className="article__header-primary">
                                        <h1 className="article__title">Dématérialiser ses documents est-il réellement source d'économies ?</h1>
                                        <span className="article__header-meta">
                                            02 Septembre 2016
                                        </span>
                                    </div>
                                    <div className="article__header-secondary">
                                        {/*  <div className="author author--design-strategy">
                                         <div className="author__avatar article__author-avatar ">
                                         <img src="" className="author-avatar " alt="">
                                         </div>
                                         <div className="author__primary">
                                         <div className="author__written-by-label">Ecrit par</div>
                                         <a href="/author/jenniferwinter">
                                         <div className="author__name"></div>
                                         <div className="author-level-badge">
                                         Author
                                         </div>
                                         </a>

                                         </div>
                                         </div>*/}

                                        <div className="mobile-publish-date">
                                            <div className="mobile-publish-date__label">Publié le </div>
                                            <div className="mobile-publish-date__date">
                                                02 Septembre 2016
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="article__layout">
                                <div className="article__primary">
                                    <p className="introduction"><span className="article_surbrillance">86 %.</span>
                                        &nbsp;C’est le pourcentage de Français favorables à la dématérialisation des documents, selon une étude publiée par le Figaro du 12 avril 2016. Quels sont les avantages de la dématérialisation ? Est-elle vraiment synonyme d’économie ?</p>
                                    <h2>Dématérialiser pour moins de paperasserie</h2>
                                    <p className="article_paragraphe">C’est un fait qu’avec la gestion des données administratives, on peut très vite crouler sous la paperasserie : factures d’électricité, contrats divers, abonnements internet, bulletins de salaire.., ce sont des tonnes de papier qui sont distribuées chaque année dans les boîtes à lettres. Aussi, selon un sondage Ipsos, plus de 9 Français sur 10 approuvent l’adoption de la dématérialisation des documents. Parmi les motifs justifiant ce choix, on trouve l’aspect pratique, le gain de place, et les enjeux écologiques.
                                        Mais si la dématérialisation suscite aujourd’hui un regain d’intérêt, c’est à cause d’une question particulière : les économies.</p>
                                    <h2>La Matérialisation des documents coûte cher</h2>
                                    <p className="article_paragraphe">Selon Economie Matin, en 2014 l’État a payé 202 millions d’euros en timbres uniquement pour acheminer les avis d’imposition par la Poste. Ce coût représente la deuxième dépense de l’administration fiscale, juste après la location de ses bureaux. On comprend dès lors que Bercy envisage sérieusement l’élargissement de la déclaration d’impôts en ligne afin de limiter les frais. Selon ses estimations, la dématérialisation de l’imposition générerait une économie de 100 millions d’euros, soit la moitié du coût actuel ! Cette économie, rappelons-le, ne concerne que le tarif des timbres. À cela s’ajouteront les frais relatifs au papier, à l’encre, et au temps de travail des fonctionnaires.
                                        Mais d’autres services de l’État valorisent de plus en plus le tout numérique pour des motifs financiers. Bernard T, conseiller en marchés publics dématérialisés, soutient que la dématérialisation est bénéfique aux collectivités territoriales, notamment sur la question des appels d’offre : « Contrairement aux candidatures papiers qui nécessitent de récupérer le dossier et de l’envoyer dans les délais par la poste, la dématérialisation permet, non seulement de gagner du temps, mais aussi de réaliser des économies. »
                                        Le passage du papier au numérique apparaît donc au plus haut sommet de l’État comme un outil de gestion des données économique et pratique. Mais, qu’en est-il dans le domaine de l’entreprise ?</p>
                                    <div className="image-container">
                                        <img src="/front/demat_techno.jpg" width={'80%'} height={'80%'}/>
                                    </div>
                                    <h2>Dématérilisation et économies en entreprise</h2>
                                    <p className="article_paragraphe">L’adoption de la dématérialisation des données au sein de l’entreprise ne s’effectue pas sans quelque turbulence. En effet, il faut s’adapter à de nouvelles pratiques et abandonner les anciennes habitudes. Elle nécessite d’acquérir de nouvelles compétences en bureautique, ce qui peut supposer la mise en place d’une formation spécifique pour les employés chargés de la gestion des données : réaliser un document PDF, savoir intégrer des liens URL, maîtriser les signatures électroniques, les certificats, etc. Aussi, certains entrepreneurs éprouvent encore quelques réticences à abandonner le bon vieux papier. Il n’empêche que, passé ce stade, les économies pour l’entreprise sont bien réelles. Certaines l’ont bien compris. Numéricable, Free, et Orange, par exemple, envoient par défaut les factures et autres informations par mails. Selon Le Parisien, c’est pour elles un moyen de faire d’importantes économies, par la suppression des coûts d’envoi et des frais d’impression. Mais le journal précise également que les consommateurs ont tendance à être moins vigilants sur leurs dépenses lorsque les factures leurs parviennent en ligne.</p>
                                    <h2>Peut-on estimer le coût d'un envoi papier</h2>
                                    <p className="article_paragraphe">Oui, on sait que l’acheminement d’un seul courrier par la Poste coûte à l’entreprise de 1 euro à 4 euros. Cela englobe la préparation, la saisie, l’envoi, et des considérations additionnelles, telles que la gestion ou l’archivage. Le coût est le même pour un courrier réceptionné, si l’on prend en compte le traitement, le suivi et l’archivage. Compte tenu du fait qu’une entreprise de grande envergure peut gérer des milliers de courriers chaque mois, le budget alloué à ce secteur peut être colossal. Dans ces conditions, la dématérialisation peut représenter pour les entreprises une aubaine en termes d’économies. Ce peut être un choix stratégique. En réalisant des économies grâce à la dématérialisation, l’entreprise pourra réinjecter les sommes épargnées à d’autres secteurs de son activité, tels que l’investissement, le développement, l’acquisition client, etc.
                                        Toutefois, selon Eric Wanscoor, l’intérêt de la dématérialisation va au-delà des économies : « Les gains les plus importants se rapportent à la productivité et au confort client », affirme-t-il. En effet, la dématérialisation est en cohérence avec l’intérêt hégémonique des consommateurs d’aujourd’hui pour le numérique.</p>
                                    <h2>Dématérialisation : un réal bénéfice pour le consommateur</h2>
                                    <p className="article_paragraphe">Si quelques hésitations demeurent relativement à la question de la sécurisation des données, les consommateurs valorisent la dématérialisation à cause de l’aspect pratique. La dématérialisation semble leur fournir un confort et une simplification gestionnelle, lesquels ont un impact sur la décision d’achat. Un client qui sait qu’il aura rapidement, par voie numérique, accès à des documents le concernant, tels que des factures ou la copie d’un contrat, sans avoir à solliciter un envoi postal, aura tendance à privilégier cette option. L’entreprise qui met le principe de dématérialisation au cœur de sa relation client non seulement fait des économies, mais améliore aussi son taux de fidélisation client.</p>
                                    <div className="image-container">
                                        <img src="/front/cloud.jpg" width={'80%'} height={'80%'}/>
                                    </div>
                                    <p className="article_paragraphe">Globalement, ceux qui ont adopté la dématérialisation au sein de l’entreprise ont pu observer les quelques avantages suivants :</p>
                                    <ul>
                                        <li> économies sur les coûts papier, impression, et envoi </li>
                                        <li> simplification de l’accès à la recherche et à la documentation  </li>
                                        <li> meilleur confort de travail  </li>
                                        <li> gain de temps  </li>
                                        <li> optimisation de la relation client et fidélisation  </li>
                                        <li> amélioration de l’image de l’entreprise : modernité, crédibilité, respect de l’environnement… </li>
                                    </ul>
                                    <p className="article_paragraphe">Alors, la dématérialisation est-elle synonyme d’économies ? Oui, indéniablement, ce qui pousse un nombre toujours plus croissant d’entreprises à adopter le tout numérique. Certaines, en revanche, optent pour une dématérialisation partielle, en confiant à des plateformes telles que Winnzos, la gestion de leur agenda. Le logiciel de prise de rendez-vous de Winnzos est un outil dématérialisé permettant aux internautes de prendre directement rendez-vous avec l’entreprise. Ils peuvent le faire selon des tranches d’horaires prédéfinies par l’entreprise, et ainsi choisir les heures de leur convenance. Ils peuvent ainsi s’inscrire en dehors des heures d’ouverture, ce qui a pour effet d’accroître le nombre de clients potentiels.</p>
                                    <h3><h2 className="conclusion">Conclusion : </h2>En définitive, tous les spécialistes du numérique gagent que pour des raisons de coûts et de commodité, d’ici 10 ans toutes les entreprises auront opté pour la dématérialisation.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        )
    }

}