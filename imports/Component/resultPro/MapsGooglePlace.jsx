import React, { Component ,  PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import { GoogleMaps } from 'meteor/dburles:google-maps';

export default class MapsGooglePlace extends Tracker.Component {
    constructor(props){
        super(props);
        this.state = {
            pos:
            {
                position: this.props.pos
            }
        }
        this.autorun(() => {
            this.setState({
                loaded: GoogleMaps.loaded(),
                mapOptions: GoogleMaps.loaded() && this._mapOptions()
            })
        });
    }
    componentDidMount(){
        GoogleMaps.load({ v: '3', key: '***'});
    }
    _mapOptions() {
        var pos = this.state.pos.position;
        return {
            center: pos,
            zoom: 13
        };
    }
    render() {
        if (this.state.loaded)
            return <GoogleMap name="mappro" options={this.state.mapOptions} pos={this.state.pos.position}/>;

        return <Spinner />;
    }
};

class GoogleMap extends Component {
    static propTypes = {
        pos: PropTypes.object
    }
    static defaultProps = {
        pos: {}
    }
    constructor(props)
    {
        super(props);
        this.state = {
            pos: this.props.pos
        }

    }
    componentDidMount(){
        var _this = this;
        var input = document.getElementById('pac-input');
        var pos = {
            lat: 48.862725,
            lng: 2.287592000000018
        };

        GoogleMaps.create({
            name: this.props.name,
            element: this.refs.map,
            options: this.props.options
        });

        GoogleMaps.ready(this.props.name, function(map) {
            let marker = new google.maps.Marker({
                position: _this.props.pos,
                map: map.instance,
                title: 'Entreprise'
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<span style="padding:10px">Entreprise</span>',
                maxWidth: 200
            });
            marker.addListener('click', function() {
                infowindow.close();
                infowindow.open(map.instance, marker);
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
            <section id="content">
                <div className="map-container" ref="map" style={{'height': '450px'}}></div>
            </section>

        )
    }
};