/**
 * Created by root on 20/07/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import '/imports/stylesheet/front/fiche-pro.css'

import SearchDom from '/imports/Component/global/search.jsx';
import InfoPro from '/imports/Component/resultPro/infoPro.jsx';

export default class FicheProDom extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            activiteId: Session.get('activiteId') || -1,
            inputTerm: Session.get('inputTerm') || '',
            regionId:  Session.get('regionId') || 0
        }
        this.newSearchPro = this.newSearchPro.bind(this);
    }
    onChangeActivite(activiteId)
    {
        check(activiteId, String);
        Session.set('activiteId', activiteId);
    }
    onChangeInput(inputTerm)
    {
        check(inputTerm, String);
        Session.set('inputTerm', inputTerm);
    }
    onChangeRegion(regionId)
    {
        check(parseInt(regionId), Match.Integer);
        Session.set('regionId', parseInt(regionId));
    }
    newSearchPro(){
        FlowRouter.go('/annuaire/' + this.state.regionId);
    }
    render() {
        return (
            <div>
                <SearchDom activiteId={this.state.activiteId} inputTerm={this.state.inputTerm} regionId={this.state.regionId} changeActivite={this.onChangeActivite}
                           changeInput={this.onChangeInput} changeRegion={this.onChangeRegion} rechercher={this.newSearchPro} />
                {this.props.children}
            </div>
        )
    }
};