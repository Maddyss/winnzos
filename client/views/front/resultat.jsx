import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import '/imports/stylesheet/front/resultats.css';

import SearchDom from '/imports/Component/global/search.jsx';
import ResultSearchPro from '/imports/Component/resultPro/resultSearchPro.jsx';

import { concordanceLocalisationRegion } from '/imports/Component/resultPro/function/utils';

export default class ResultatDom extends Component {
    constructor(props){
        super(props);
        this.state = {
            activiteId: this.props.activite  || Session.get('activiteId') || -1,
            inputTerm: Session.get('inputTerm') || '',
            regionId: parseInt(FlowRouter.getParam("regionId")) || Session.get('regionId'),
            typeLieu: concordanceTypeActivites(this.props.activite  || Session.get('activiteId') || -1)
        }
        this.onChangeActivite = this.onChangeActivite.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.searchButton = this.searchButton.bind(this);
    }
    componentWillReceiveProps  (nextProps,  nextContext) {
        this.setState({
            regionId:nextProps.regionId ? parseInt(nextProps.regionId) : parseInt(FlowRouter.getParam("regionId")) || Session.get('regionId'),
            activiteId:nextProps.activiteId ? nextProps.activiteId : Session.get('activiteId') || -1,
            term:nextProps.inputTerm ? nextProps.inputTerm  : Session.get('inputTerm') || ''
        });
    }
    onChangeActivite(activiteId)
    {
        this.setState({
            activiteId: activiteId,
            typeLieu: concordanceTypeActivites(activiteId)
        });
    }
    onChangeRegion(regionId)
    {
        this.setState({
            regionId: parseInt(regionId)
        });
    }
    searchButton(inputTerm, activiteId, regionId){
        if(this.state.inputTerm !== inputTerm){
            this.setState({
                inputTerm: inputTerm
            });
        }
        if(this.state.activiteId !== activiteId){
            this.setState({
                activiteId: activiteId,
                typeLieu: concordanceTypeActivites(activiteId)
            });
        }
        if(this.state.regionId !== parseInt(regionId)){
            this.setState({
                regionId: parseInt(regionId)
            });
        }
    }
    render() {
        return (
            <div>
                <SearchDom activiteId={this.state.activiteId} inputTerm={this.state.inputTerm} regionId={this.state.regionId} changeActivite={this.onChangeActivite}
                           changeRegion={this.onChangeRegion} rechercher={this.searchButton} />
                <ResultSearchPro activiteId={this.state.activiteId.toString()} inputTerm={this.state.inputTerm} regionId={this.state.regionId} listLieu={this.state.typeLieu} nomVille={this.props.nomVille}/>
            </div>
        )
    }
};

function concordanceTypeActivites(activiteId){
    "use strict";
    let typeLieux = '';
    if(activiteId === "SE3"){
        typeLieux = 'hair_care';
    }
    else if(activiteId === "SE4"){
        typeLieux = 'hair_care';
    }
    else if(activiteId === "SE8"){
        typeLieux = 'beauty_salon';
    }
    else if(activiteId === "SE18"){
        typeLieux = 'veterinary_care';
    }
    else if(activiteId === "SE12"){
        typeLieux = '';
    }
    else if(activiteId === "SE15"){
        typeLieux = 'car_rental';
    }
    else if(activiteId === "SE6"){
        typeLieux = 'funeral_home';
    }
    else if(activiteId === "SE1"){
        typeLieux = 'car_repair';
    }
    else if(activiteId === "SE2"){
        typeLieux = 'laundry';
    }
    else if(activiteId === "SE14"){
        typeLieux = '';
    }
    else if(activiteId === "BE1"){
        typeLieux = '';
    }
    else if(activiteId === "BE2"){
        typeLieux = '';
    }
    else if(activiteId === "BE3"){
        typeLieux = '';
    }
    else if(activiteId === "BE4"){
        typeLieux = '';
    }
    else if(activiteId === "E1"){
        typeLieux = '';
    }
    else if(activiteId === "E2"){
        typeLieux = '';
    }
    else if(activiteId === "E3"){
        typeLieux = '';
    }
    else if(activiteId === "E4"){
        typeLieux = '';
    }
    else if(activiteId === "S1"){
        typeLieux = 'doctor';
    }
    else if(activiteId === "S3"){
        typeLieux = 'dentist';
    }
    else if(activiteId === "S4"){
        typeLieux = 'health';
    }
    else if(activiteId === "S5"){
        typeLieux = '';
    }
    else if(activiteId === "S6"){
        typeLieux = '';
    }
    else if(activiteId === "S7"){
        typeLieux = '';
    }
    else if(activiteId === "S8"){
        typeLieux = '';
    }
    else if(activiteId === "TLC1"){
        typeLieux = 'stadium';
    }
    else if(activiteId === "TLC2"){
        typeLieux = 'lodging';
    }
    else if(activiteId === "TLC3"){
        typeLieux = 'campground';
    }
    else if(activiteId === "TLC4"){
        typeLieux = 'lodging';
    }
    else if(activiteId === "TLC5"){
        typeLieux = 'stadium';
    }
    else if(activiteId === "TLC6"){
        typeLieux = 'amusement_park|aquarium|art_gallery|park|zoo';
    }
    else if(activiteId === "TLC9"){
        typeLieux = 'bowling_alley';
    }
    else if(activiteId === "E1"){
        typeLieux = '';
    }
    else if(activiteId === "E2"){
        typeLieux = '';
    }
    else if(activiteId === "BI1"){
        typeLieux = 'real_estate_agency';
    }
    else if(activiteId === "BI2"){
        typeLieux = '';
    }
    else if(activiteId === "BI3"){
        typeLieux = '';
    }
    else if(activiteId === "BI4"){
        typeLieux = '';
    }
    else if(activiteId === "BI5"){
        typeLieux = 'electrician';
    }
    else if(activiteId === "BI6"){
        typeLieux = '';
    }
    else if(activiteId === "BI7"){
        typeLieux = '';
    }
    else if(activiteId === "BI8"){
        typeLieux = '';
    }
    else if(activiteId === "BI9"){
        typeLieux = 'painter';
    }
    else if(activiteId === "BI10"){
        typeLieux = '';
    }
    else if(activiteId === "BI12"){
        typeLieux = 'locksmith';
    }
    else if(activiteId === "BI13"){
        typeLieux = '';
    }
    else if(activiteId === "BI15"){
        typeLieux = 'roofing_contractor';
    }
    else if(activiteId === "BI16"){
        typeLieux = 'plumber';
    }
    else if(activiteId === "A1"){
        typeLieux = 'bakery';
    }
    else if(activiteId === "A3"){
        typeLieux = '';
    }
    else if(activiteId === "A4"){
        typeLieux = 'grocery_or_supermarket';
    }
    else if(activiteId === "A5"){
        typeLieux = '';
    }
    else if(activiteId === "A6"){
        typeLieux = '';
    }
    else if(activiteId === "A8"){
        typeLieux = '';
    }
    else if(activiteId === "A9"){
        typeLieux = 'meal_takeaway';
    }
    else if(activiteId === "C1"){
        typeLieux = 'electronics_store';
    }
    else if(activiteId === "C2"){
        typeLieux = '';
    }
    else if(activiteId === "C3"){
        typeLieux = '';
    }
    else if(activiteId === "C4"){
        typeLieux = 'furniture_store';
    }
    else if(activiteId === "C5"){
        typeLieux = 'bicycle_store';
    }
    else if(activiteId === "C6"){
        typeLieux = 'jewelry_store';
    }
    else if(activiteId === "C7"){
        typeLieux = 'florist';
    }
    else if(activiteId === "SFJ1"){
        typeLieux = 'lawyer';
    }
    else if(activiteId === "SFJ2"){
        typeLieux = 'accounting';
    }
    else{
        typeLieux = 'hair_care|beauty_salon|veterinary_care';
        typeLieux += 'doctor|dentist|health|spa|stadium|sport|lodging|campground|amusement_park|aquarium|art_gallery|park|zoo|';
        typeLieux += 'bowling_alley|real_estate_agency|electrician|painter|locksmith|bakery|meal_delivery|food|grocery_or_supermarket|food|cafe' +
            '|restaurant|meal_takeaway|electronics_store|hardware_store|home_goods_store|liquor_store|store|clothing_store|department_store|shoe_store|shopping_mall|store|' +
            'furniture_store|bicycle_store|jewelry_store|florist|lawyer|accounting|finance';
    }
    return typeLieux;
}