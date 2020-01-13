import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';

import {CommuneParRegion} from '/imports/api/collection/collection';
import { concordanceRegion } from '/imports/router/utils/seo';


export default class ListeCommune extends Tracker.Component {
    constructor(props) {
        super(props);
        this.state = {
            commune:{}
        }
        this.subscribe('get.communes.by.region', this.props.regionId);
        this.autorun(() => {
            this.setState({
                commune: CommuneParRegion.find({'fields.reg_code': this.props.regionId }).fetch()
            });
        });
    }
    componentDidMount(){
        window.prerenderReady = true;
    }
    render() {
        let NameRegion = concordanceRegion(parseInt(this.props.regionId));
        let lettreAlphabet = '';
        let listeLinkCommune = '';
        let lettreCommune = '';
        let indiceDepCode = 0;
        let htmlCodeDep = '';
        return (
            <section id="content">
                <div className="container">
                    <h1>Trouvez un professionnel dans la région de {NameRegion}</h1>
                    <div className="row">
                        {
                            this.state.commune.map((com, index) => {
                                lettreCommune = com.fields.com_nom_maj.replace('LE ', '').replace('LES ', '').replace('LA ', '').replace("L' ", '');
                                listeLinkCommune = lettreAlphabet === lettreCommune.substring(0, 1) ?
                                    (
                                        <div key={index}>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <a href={'/annuaire/' + this.props.regionId + '/' + com.fields.com_nom_maj + '/activite'}
                                                       title={com.fields.com_nom}> Commune de {com.fields.com_nom} ( {com.fields.com_code} )</a>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                :
                                    (
                                        <div key={index}>
                                            <div className="row">
                                                <h4>
                                                    {
                                                        lettreCommune.substring(0, 1)
                                                    }
                                                </h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <a href={'/annuaire/' + this.props.regionId + '/' + com.fields.com_nom_maj + '/activite' }
                                                       title={com.fields.com_nom}> Commune de {com.fields.com_nom} ( {com.fields.com_code} )</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                lettreAlphabet = lettreCommune.substring(0, 1);
                                return [listeLinkCommune];
                            })
                        }
                    </div>
                </div>
            </section>

        )
    }
};




