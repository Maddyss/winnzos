/**
 * Created by root on 20/07/16.
 */

import React, {Component} from 'react';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';

import {FichePro} from '/imports/api/collection/collection';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';
import Professionnel from '/imports/Component/resultPro/infoProAuthentifie.jsx';
import PlaceDetail from '/imports/Component/resultPro/GooglePlaceDetail.jsx';

import MapsProFiche from './MapsProFiche';

export default class InfoPro extends Tracker.Component {
    constructor(props) {
        super(props);
        let ficheProId = FlowRouter.current().queryParams.pro;
        let proId = FlowRouter.current().queryParams.utile;
        this.state = {
            nomCommercial: FlowRouter.getParam('proName'),
            proId: proId,
            fichePro: null,
            ficheProId: ficheProId
        }
        this.subscribe('fichePro.id', ficheProId);
        this.autorun(() => {
            this.setState({
                fichePro: FichePro.findOne(ficheProId)
            });
        });
        if (proId) {
            Meteor.call('Methods.Insert.Notification.NewVisit', proId, function (err, res) {
                if (err)
                    console.log(err.reason);
            });
        }
        this.getInfoSociete.bind(this);
    }

    componentDidUpdate() {
        window.prerenderReady = true;
    }

    componentWillUnmount() {
        const comp = this.autorun(c => {
            c.stop();
        });
    }

    getInfoSociete() {
        let certification;
        const {fichePro} = this.state;
        certification = <div className="user-pic pro"><ImagesPro proId={this.state.proId.toString() }/></div>;
        var pos = {
            lat: 48.862725,
            lng: 2.287592000000018
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div id="contact-buttons">
                            <a href='/register' title="Contacter"
                               className="button-1 color-2"><i className="fa fa-pencil"></i>&nbsp; &nbsp; &nbsp; <span>Vous êtes &nbsp; {this.state.nomCommercial}</span></a>
                            {/* <a href='#' title="Ajouter &agrave; mes amis" className="button-1 color-3"><i
                             className="fa fa-user-plus"></i>&nbsp;&nbsp;&nbsp;<span>Ajouter &agrave; mes amis</span></a>*/}
                        </div>
                        <h1 className="heading-1 text-center">{(fichePro ? fichePro.nomCommercial : this.state.nomCommercial) }</h1>
                        <h2 className="sub-heading-1 text-center">{fichePro.activiteName }</h2>
                    </div>
                </div>
                <div className="section-heading"><h2 className="heading-1 with-lines text-center">Information entreprise</h2></div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-md-4">
                            <div className="text-center border-info">
                                <p style={{'color':'#ea212e'}}>
                                    <i className="fa fa-map-marker fa-4x"></i>
                                </p>
                                <p>{ fichePro.Adresse.Voie + ' ' + fichePro.Adresse.ZipCode + ' ' + fichePro.Adresse.Ville }</p>
                            </div>
                        </div>
                        { fichePro.telContact && fichePro.telContact !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{'color':'#ea212e'}}>
                                        <i className="fa fa-phone fa-4x"></i>
                                    </p>
                                    <p>{ fichePro.telContact }</p>
                                </div>
                            </div>
                            :
                            null }
                        { fichePro.mailContact && fichePro.mailContact !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{'color':'#ea212e'}}>
                                        <i className="fa fa-envelope-o fa-4x"></i>
                                    </p>
                                    <p><a href={"mailto:" + fichePro.mailContact } >{ fichePro.mailContact } </a></p>
                                </div>
                            </div>
                            :
                            null }
                    </div>
                    <div className="col-md-6">
                        <MapsProFiche pos={pos} />
                    </div>
                </div>
            </div>
        )

    }

    render() {
        const {fichePro, ficheProId} = this.state;
        let proId = FlowRouter.current().queryParams.utile;
        let infoPro = <Spinner />;
        if (fichePro) {
            if (fichePro) {
                if (!fichePro.prorenseigne) {
                    infoPro = this.getInfoSociete();
                }
                else {
                    infoPro = <Professionnel proId={proId}/>;
                }
            }
        }
        return (
            <div>
                <section id="content">
                    {  proId ? infoPro : <PlaceDetail placeId={ficheProId}/> }
                </section>
            </div>
        )
    }
}
