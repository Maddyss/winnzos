import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import SelectActivite from './../select/selectActivite.jsx';
import SelectRegion from './../select/selectRegion.jsx';

export default class SearchDom extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.inputTerm.length > 0) {
            check(this.props.inputTerm, String);
            $('#searchPro').val(this.props.inputTerm);
        }
    }

    recherche(e) {
        e && e.preventDefault();

        check($('#searchPro').val(), String);
        check(parseInt($('.region').val()), Match.Integer);
        check($('.activite').val(), String);
        if ($('#searchPro').val().length < 50) {
            this.props.rechercher($('#searchPro').val(), $('.activite').val(), $('.region').val());

        }
    }
    inputSearch(e) {
        e && e.preventDefault();
        check($('#searchPro').val(), String);

        if ($('#searchPro').val() !== '' && $('#searchPro').val().length > 2 && $('#searchPro').val().length < 50) {
            this.props.changeInput($('#searchPro').val());

        }
        else if ($('#searchPro').val().length === 0) {
            this.props.changeInput('');
        }
        Session.set('inputTerm', $('#searchPro').val());

    }
    localisation(e) {
        e.preventDefault();
        var _this = this;
        var pos = {};
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     pos = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //     };
        //     Session.set('pos', pos);
        // });
        pos = {
            lat: 43.258996,
            lng: 5.565438
        };

        Session.set('pos', pos);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                Session.set('pos', pos);
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(pos.lat, pos.lng);
                geocoder.geocode({
                    'latLng': latlng
                }, (results, status)=> {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            $(document).trigger('placechanged', results[0]);

                            $("#pac-input").val(results[1].formatted_address)
                            //this.props.changeInput(results[1].formatted_address);
                            //this.recherche();
                        } else {
                            alert('Désolé, nous n\'avons pas pu vous localiser.');
                        }
                    }
                });
            });
        }

    }
    render() {
        const {activiteId, regionId, changeActivite, changeRegion,  ...rest} = this.props;
        return (
            <section id="search">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <form className="my-form" >
                                <fieldset id="std-search">
                                    <div className="row">
                                        <div className="col-md-6 form-group" style={{ paddingRight: '10px' }}>
                                            <div className="input-icon right " >
                                                <i className="fa fa-search font-red" style={{ cursor: 'pointer' }} onClick={this.inputSearch.bind(this)} ></i>
                                                <input className="form-control input-lg input-circle" id="searchPro" type="text" placeholder="Mot clé de recherche " />
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group" >
                                            <SelectActivite key={activiteId.id} activiteId={activiteId} changeActivite={changeActivite} retour={true} {...rest} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group" style={{ paddingRight: '10px', display: 'none' }}>
                                            <SelectRegion key={regionId.id} regionId={regionId} changeRegion={changeRegion} retour={true} {...rest} />
                                        </div>
                                        <div className="col-md-6 form-group" style={{ paddingRight: '10px' }}>
                                            <div className="input-icon right " >
                                                <i className="fa fa-dot-circle-o font-red" style={{ cursor: 'pointer' }}  ></i>
                                                <input id="pac-input" className="form-control input-lg input-circle" type="text" placeholder="Localiser le lieux de recherche" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group" style={{ 'textAlign': 'center' }}>
                                            <a className="btn btn-lg white btn-circle" onClick={(e)=>this.localisation(e)} ><i className="fa fa-map-marker"></i> Autour de moi</a>
                                            <button type="submit" name="submit-search" id="submit-search" className="btn btn-lg white btn-circle" onClick={this.recherche.bind(this)} ><i className="fa fa-search"></i> Rechercher</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};