import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';

import {CommuneParRegion} from '/imports/api/collection/collection';


export default class ListeActivite extends Tracker.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        window.prerenderReady = true;
    }
    render() {
        return (
            <section id="content">
                <div className="container">
                    <h1>Trouvez une activité dans la commune de {this.props.nomVille}</h1>
                    <div className="row" style={{'fontSize':'20px'}}>
                        <div className="row" >
                            <div className="col-md-4">
                                <h2> Bien-être</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE3'} title="Coiffeur">Coiffeur (en salon)</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE4'} title="Coiffeur à domicile">Coiffeur à domicile</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BE1'} title="Epilation">Epilation</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BE2'} title="Massage">Massage</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BE3'} title="Manucure">Manucure</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BE4'} title="Soins visages">Soins visages</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE8'} title="Institut de beauté-esthéticienne">Institut de beauté-esthéticienne</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <h2> Evênement</h2>
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/E1'} title="Animateur de soirée">Animateur de soirée</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/E2'} title="Photographe">Photographe</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/E3'} title="Magicien">Magicien</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-md-4">
                                <h2> Entreprise de Services</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE18'} title="Vétérinaire">Vétérinaire</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE12'} title="Paysagiste">Paysagiste</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE15'} title="Services à la personne">Services à la personne</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE6'} title="Funéraires">Funéraires</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE1'} title="Réparations">Réparations</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE2'} title="Blanchisserie">Blanchisserie</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SE14'} title="Décontamination">Décontamination</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2>Entreprise de Santé</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S1'} title=">Médecin Traitant">Médecin Traitant</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S3'} title="Dentiste">Dentiste</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S4'} title="Diététicien">Diététicien</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S5'} title="Gynécologue">Gynécologue</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S6'} title="Ophtalmologiste">Ophtalmologiste</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S7'} title="Orthophoniste">Orthophoniste</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/S8'} title="Osthéopathe">Osthéopathe</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row" label="Services">
                            <div className="col-md-4">
                                <h2> Tourisme, Loisirs, Culture</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/TLC1'} title="Etablissement d'activités physiques et sportives (EAPS)">Etablissement d'activités physiques et sportives (EAPS)</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/TLC2'} title="Hôtel">Hôtel</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/TLC3'} title="Campings">Campings</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/TLC4'} title="Chambres d'hôtes">Chambres d'hôtes</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2>Enseignement</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/E1'} title="Auto-école">Auto-école</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/E2'} title="Coach Sportif">Coach Sportif</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row" label="Services">
                            <div className="col-md-4">
                                <h2> Batiment, Immobilier</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI1'} title="Agent immobilier">Agent immobilier</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI2'} title="Architecte">Architecte</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI3'} title="Artisan du bâtiment">Artisan du bâtiment</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI4'} title="Carreleur">Carreleur</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI12'} title="Serrurier">Serrurier</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI5'} title="Electricien">Electricien</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI6'} title="Maçon">Maçon</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI7'} title="Marchand de biens">Marchand de biens</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI8'} title="Menuisier">Menuisier</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI9'} title="Peintre en batiment">Peintre en batiment</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI10'} title="Plâtrier">Plâtrier</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI13'} title="Terrassement">Terrassement</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI15'} title="Isolation">Isolation</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/BI16'} title="Finition">Finition</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2>Alimentation</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A1'} title="Auto-école">Boulanger</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A3'} title="Traiteur">Traiteur</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A4'} title="Commerce de détail alimentaire">Commerce de détail alimentaire</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A5'} title="Confiseur-Glacier">Confiseur-Glacier</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A6'} title="Patissier">Patissier</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A8'} title="Restaurant traditionnel">Restaurant traditionnel</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/A9'} title="Restauration rapide/Vente à emporter">Restauration rapide/Vente à emporter</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row" label="Services">
                            <div className="col-md-4">
                                <h2> Commerce</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C1'} title="Commerce de détail">Commerce de détail</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C2'} title="Magasin de vêtement et chaussure">Magasin de vêtement et chaussure</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C3'} title="Magasin de peinture">Magasin de peinture</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C4'} title="Magasin de meuble">Magasin de meuble</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C5'} title="Magasin de sport">Magasin de sport</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C6'} title="Magasin de produit de beauté">Magasin de produit de beauté</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/C7'} title="Magasin de fleurs">Magasin de fleurs</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2>Secteur financier et juridique</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SFJ1'} title="Avocat">Avocat</a></li>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/SFJ2'} title="Expert-comptable">Expert-comptable</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2>Autre</h2>
                                <div className="row">
                                    <ul>
                                        <li><a href={'/annuaire/' + this.props.regionId + '/' + this.props.nomVille + '/0'} title="Autre">Autre</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
};




