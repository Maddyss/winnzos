import React, { Component } from 'react';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import { Meteor } from 'meteor/meteor';

import MapsGooglePlace from './MapsGooglePlace';

class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        let placeId = this.props.placeId;
        this.state = {
            placeId: placeId,
            res: null
        }
    }
    componentDidMount(){
        const _this = this;
        let placeId = this.state.placeId;
        if(placeId){
            Meteor.call("Methods.Get.Place.Details", placeId, function (err, res) {
                if (err)
                    console.log(err.reason);

                _this.setState({ res: res });
            });
        }
        window.prerenderReady = true;
    }
    ouverture(listOuvert){
        let listHorraire = listOuvert.weekday_text.map(function(horr, index){
            return(
                <p key={index}>
                    { horr }
                </p>
            );
        });
        return listHorraire;
    }
    placeDetails(){
        const place = this.state.res.data.result;
        let UrlPhoto = "";
        if(place && place.photos){
            UrlPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxheight=500&maxwidth=500&photoreference=" + place.photos[0].photo_reference + "&key=AIzaSyDQEjcdo7bgnMXWE95auAMW8Y10B2yuBSw";
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div id="contact-buttons">
                            <a href='/register' title="Contacter"
                               className="button-1 color-2"><i
                                className="fa fa-pencil"></i>&nbsp;&nbsp;&nbsp;<span>Vous êtes &nbsp;{place.name}</span></a>
                            {/* <a href='#' title="Ajouter &agrave; mes amis" className="button-1 color-3"><i
                             className="fa fa-user-plus"></i>&nbsp;&nbsp;&nbsp;<span>Ajouter &agrave; mes amis</span></a>*/}
                        </div>
                        <h1 className="heading-1 text-center">{place.name}</h1>
                        <h2 className="sub-heading-1 text-center"></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="user-pic pro">
                            {place.photos ? <img src={UrlPhoto} alt={place.name}/>
                                : <img src="/front/user-pic-default.png" alt={place.name}/>  }
                            </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="section-heading"><h2 className="heading-1 with-lines text-center">Information entreprise</h2></div>
                        <div className="row">{ place.opening_hours ?
                                    <div className="text-center border-info">
                                        <p style={{'color':'#ea212e'}}>
                                            <i className="fa fa-calendar fa-4x"></i>
                                        </p>
                                         <p style={{'marginTop':'10px'}}>{this.ouverture(place.opening_hours)}</p>
                                    </div>
                            : null }
                        </div>
                        <div className="row">
                            { place.formatted_address ?
                                <div className="col-md-4">
                                    <div className="text-center border-info">
                                        <p style={{'color':'#ea212e'}}>
                                            <i className="fa fa-map-marker fa-4x"></i>
                                        </p>
                                        <p>{ place.formatted_address}</p>
                                    </div>
                                </div>
                            : null }
                            { place.formatted_phone_number  ?
                                <div className="col-md-4">
                                    <div className="text-center border-info">
                                        <p style={{'color':'#ea212e'}}>
                                            <i className="fa fa-phone fa-4x"></i>
                                        </p>
                                        <p>{ place.formatted_phone_number}</p>
                                    </div>
                                </div>
                                :
                                null }
                            {  place.website  ?
                                <div className="col-md-4">
                                    <div className="text-center border-info">
                                        <p style={{'color':'#ea212e'}}>
                                            <i className="fa fa-globe fa-4x"></i>
                                        </p>
                                        <p> <a href={ place.website } target="_blank" >{place.website}</a></p>
                                    </div>
                                </div>
                                :
                                null }
                        </div>
                    </div>
                </div>
                <div className="row">
                    {place.geometry.location ? <div><div className="section-heading"><h2 className="heading-1 with-lines text-center">Localisation</h2></div><MapsGooglePlace pos={place.geometry.location} /></div> : null }
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                { this.state.res ? this.placeDetails() : <Spinner /> }
            </div>
        )
    }
}
export default PlaceDetail;
