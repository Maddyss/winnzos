import React, { Component ,  PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import { GoogleMaps } from 'meteor/dburles:google-maps';


export default class MapsAutocomplete extends Tracker.Component {
    constructor(props){
        super(props);
        this.autorun(() => {
            this.setState({
                loaded: GoogleMaps.loaded(),
                mapOptions: GoogleMaps.loaded() && this._mapOptions()
            })
        });

    }
    componentDidMount(){
        GoogleMaps.load({ v: '3', key: 'AIzaSyBZ-YcGjJFNhvVUbO8mqjEHuUIE6XfhNcU', libraries: 'places'});
    }

    _mapOptions() {
        return {
            center: new google.maps.LatLng(48.862725, 2.287592000000018),
            zoom: 13
        };
    }
    render() {
        if (this.state.loaded)
            return <GoogleMap name="mapAutocomplete" options={this.state.mapOptions} />;

        return <Spinner />;
    }
};

class GoogleMap extends Component {
    constructor(props)
    {
        super(props);
    }
    componentDidMount(){
        var input = document.getElementById('googleGeo');

        GoogleMaps.create({
            name: this.props.name,
            element: this.refs.autocomplete,
            options:this.props.options
        });

        GoogleMaps.ready(this.props.name, function(map) {
            var autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'],  componentRestrictions: { country: 'fr' }, language: 'fr' });
            autocomplete.addListener('place_changed', function(e) {
                console.log(e);
                var place = autocomplete.getPlace();
                Session('localisation').set(place.geometry.location.toJSON());
            });

        });
    }
    componentWillUnmount() {
        if (GoogleMaps.maps[this.props.name]) {
            google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
            delete GoogleMaps.maps[this.props.name];
        }
    }
    render() {
        return (
            <div className="map-autocomplete" ref="autocomplete" style={{'display': 'none'}}></div>
        )
    }
};