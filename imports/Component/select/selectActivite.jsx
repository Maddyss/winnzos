import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Select2 } from 'meteor/natestrauser:select2';

import '/imports/stylesheet/global/customSelect2.css';

export default class SelectActivite extends Component {
    constructor(props)
    {
        super(props);

    }
    componentDidMount(){
        let activiteId = this.props.activiteId;
        $('.activite').select2({
            placeholder: "Choisissez une activité ...",
            allowClear: true
        });

        if(this.props.retour)
            $('.activite').on("change", this.setActivite.bind(this));
        if(activiteId !== -1 && activiteId !== undefined && activiteId.length > 0)
        {
                check(activiteId, String);
                $('.activite').val(activiteId).trigger("change");
        }
    }
    setActivite(e){
        e.preventDefault();
        if($('.activite').val() !== null && $('.activite').val() !== '')
        {
            check($('.activite').val(), String);
            this.props.changeActivite($('.activite').val());
            Session.set('activiteId', $('.activite').val());
        }
    }
    render() {
        return (
                <div>
                    <select className="form-control select2 activite" ref="activite" >
                        <option></option>
                        <optgroup label="Bien-être">
                            <option value="SE3">Coiffeur</option>
                            <option value="SE4">Coiffeur à domicile</option>
                            <option value="BE1">Epilation</option>
                            <option value="BE2">Massage</option>
                            <option value="BE3">Manucure</option>
                            <option value="BE4">Soins visages</option>
                            <option value="SE8">Institut de beauté-esthéticienne</option>
                        </optgroup>
                        <optgroup label="Evênement">
                            <option value="E1">Animateur de soirée</option>
                            <option value="E2">Photographe</option>
                            <option value="E3">Magicien</option>
                        </optgroup>
                        <optgroup label="Services">
                            <option value="SE18">Vétérinaire</option>
                            <option value="SE12">Paysagiste</option>
                            <option value="SE15">Services à la personne</option>
                            <option value="SE6">Funéraires</option>
                            <option value="SE1">Réparations</option>
                            <option value="SE2">Blanchisserie</option>
                            <option value="SE14">Décontamination</option>
                        </optgroup>
                        <optgroup label="Santé">
                            <option value="S1">Médecin Traitant</option>
                            <option value="S3">Dentiste</option>
                            <option value="S4">Diététicien</option>
                            <option value="S5">Gynécologue</option>
                            <option value="S6">Ophtalmologiste</option>
                            <option value="S7">Orthophoniste</option>
                            <option value="S8">Osthéopathe</option>
                        </optgroup>
                        <optgroup label="Tourisme, Loisirs, Culture">
                            <option value="TLC2">Hôtel</option>
                            <option value="TLC3">Campings</option>
                            <option value="TLC4">Chambres d'hôtes</option>
                        </optgroup>
                        <optgroup label="Enseignement">
                            <option value="E1">Auto-école</option>
                            <option value="E2">Educateur sportif</option>
                        </optgroup>
                        <optgroup label="Batiment, Immobilier">
                            <option value="BI1">Agent immobilier</option>
                            <option value="BI2">Architecte</option>
                            <option value="BI3">Artisan du bâtiment</option>
                            <option value="BI4">Carreleur</option>
                            <option value="BI5">Electricien</option>
                            <option value="BI6">Maçon</option>
                            <option value="BI7">Marchand de biens</option>
                            <option value="BI8">Menuisier</option>
                            <option value="BI9">Peintre en batiment</option>
                            <option value="BI10">Plâtrier</option>
                            <option value="BI12">Serrurier</option>
                            <option value="BI13">Terrassement</option>
                            <option value="BI15">Isolation</option>
                            <option value="BI16">Finition</option>
                        </optgroup>
                        <optgroup label="Alimentation">
                            <option value="A1">Boulanger</option>
                            <option value="A3">Traiteur</option>
                            <option value="A4">Commerce de détail alimentaire</option>
                            <option value="A5">Confiseur-Glacier</option>
                            <option value="A6">Patissier</option>
                            <option value="A8">Restaurant traditionnel</option>
                            <option value="A9">Restauration rapide/Vente à emporter</option>
                        </optgroup>
                        <optgroup label="Secteur financier et juridique">
                            <option value="SFJ1">Avocat</option>
                            <option value="SFJ2">Expert-comptable</option>
                        </optgroup>
                        <optgroup label="Pas trouvé">
                            <option value="0">Autre</option>
                        </optgroup>
                    </select>
                </div>
        )
    }
};