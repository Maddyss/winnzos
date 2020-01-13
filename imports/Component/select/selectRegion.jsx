import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Select2 } from 'meteor/natestrauser:select2';

export default class SelectRegion extends Component {
    constructor(props)
    {
        super(props);
    }
    componentDidMount(){
        let regionId = this.props.regionId;
        $('.region').select2({
            placeholder: "Choisissez une région ...",
            allowClear: true
        });
        if(this.props.retour)
            $('.region').on("change", this.setRegion.bind(this));
        if(regionId !== undefined && regionId !== 0)
        {
            check(regionId, Match.Integer);
            $('.region').val(regionId).trigger("change");
        }
    }
    setRegion(e){
        e.preventDefault();
        check(parseInt($('.region').val()), Match.Integer);
        if($('.region').val() !== '')
        {
            this.props.changeRegion(parseInt($('.region').val()));
            Session.set('regionId', parseInt($('.region').val()));
        }
    }
    render() {
        return (
            <div>
                <select className="form-control select2 region">
                    <option></option>
                    <optgroup label="Région">
                        <option value="44">Alsace Champagne-Ardenne Lorraine</option>
                        <option value="75">Aquitaine Limousin Poitou-Charentes</option>
                        <option value="84">Auvergne-Rh&ocirc;ne-Alpes</option>
                        <option value="28">Normandie</option>
                        <option value="27">Bourgogne Franche-Comt&eacute;</option>
                        <option value="53">Bretagne</option>
                        <option value="24">Centre Val de Loire</option>
                        <option value="94">Corse</option>
                        <option value="11">Ile-de-France</option>
                        <option value="76">Languedoc-Roussillon Midi-Pyr&eacute;n&eacute;es</option>
                        <option value="32">Nord-Pas-de-Calais Picardie</option>
                        <option value="52">Pays de la Loire</option>
                        <option value="93">Provence-Alpes-C&ocirc;te d'Azur</option>
                    </optgroup>
                    <optgroup label="Autre">
                        <option value="100">Toute la France</option>
                        <option value="1">Etrangers</option>
                        <option value="99">DOM-TOM</option>
                    </optgroup>
                </select>
            </div>
        )
    }
};