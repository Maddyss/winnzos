import React, { PropTypes, Component } from 'react';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import Tracker from 'tracker-component';
import { Counts } from 'meteor/tmeasday:publish-counts';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';

import { FichePro } from '/imports/api/collection/collection';

import lodash from 'lodash';

class ListPro extends Tracker.Component {
    static propTypes = {
        regionId: PropTypes.number,
        activiteId: PropTypes.string,
        term: PropTypes.string
    }
    static defaultProps = {
        regionId: 0,
        activiteId: "-1",
        term: ""
    }
    constructor(props) {
        super(props);
        this.sentStats = []; //Will keep track of what kind of statistics have been sent.
       // this.ficheProSubscription = this.subscribe('fichePros', this.props.regionId, this.props.activiteId.toString(), this.props.term);

        this.state = {
            fichePro : [],
            countFichePro : 0,
            regionId: this.props.regionId,
            activiteId: this.props.activiteId.toString(),
            term: this.props.term
        }

        this.autorun(() => {
            this.subscribe('fichePros', this.state.regionId, this.state.activiteId.toString(), this.state.term);
        });
        this.autorun(() => {
            let fichePro = FichePro.find().fetch();

            this.setState({
                fichePro: fichePro,
                countFichePro: Counts.get('FichePro.Count')
            });

            this.trackStats(fichePro);

        });
        this.getListPro.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.regionId != this.props.regionId) {
            this.setState({
                regionId: nextProps.regionId
            });
        }
        else if (nextProps.activiteId != this.props.activiteId){
            this.setState({
                activiteId: nextProps.activiteId.toString()
            });
        }
        else if ( nextProps.term != this.props.term){
            this.setState({
                term: nextProps.term
            });
        }
    }

    trackStats(pros) {
        var userIds = pros.map(i => i.userId);

        var userIdsToTrack = lodash.difference(userIds, this.sentStats);

        this.sentStats = this.sentStats.concat(userIdsToTrack)

        if (userIdsToTrack.length) {
            var userViews = userIdsToTrack.map(i => ({
                userVisitedId: i,
                location: 'list'
            }));

            Meteor.call('stats.record.userviews', userViews, (err) => {
                if (err) {
                    console.log(err.reason);
                }
            });
        }

    }

    conponentDidMount() {
        window.prerenderReady = true;
    }
    fichePros() {

        const { nbres } = this.props;
        if(this.state.activiteId === '-1')
            return FichePro.find({'regionId' : this.state.regionId}, { limit: nbres }).fetch();
        else
            return FichePro.find({'regionId' : this.state.regionId, 'activiteId': this.state.activiteId}, { limit: nbres }).fetch();

    }
    getListPro() {
        return (
            this.fichePros().map((pro, index) => {
                let ficheProId = pro._id;
                return (
                    <div className="col-xs-12 col-sm-4" key={index}>
                        {/*<a href={'/pro/' + pro.nomCommercial + '?pro=' + pro.userId} >*/}
                        <div className="result">
                            <a href={'/pro/' + pro.nomCommercial + '?pro=' + ficheProId + '&utile=' + pro.userId}
                                title={pro.nomCommercial}> <ImagesPro proId={pro.userId.toString()} /> </a>
                            {/*<div className="score"><i className="fa fa-star full"></i> <i className="fa fa-star full"></i> <i className="fa fa-star full"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i></div>*/}
                            <h3 className="heading"><a
                                href={'/pro/' + pro.nomCommercial + '?pro=' + ficheProId + '&utile=' + pro.userId}
                                title={pro.nomCommercial}>{pro.nomCommercial}</a></h3>
                            <p className="spec">{pro.activiteName}</p>
                            <p className="description">{pro.description}</p>
                            <p className="address">{pro.Adresse.Ville !== "" ? pro.Adresse.Voie + ' ' + pro.Adresse.ZipCode + ' ' + pro.Adresse.Ville : ''}</p>
                            <div className="buttons">
                                <a href={'/pro/' + pro.nomCommercial + '?pro=' + ficheProId + '&utile=' + pro.userId}
                                    title="Contacter" className="button-1 color-2"><i
                                        className="fa fa-phone"></i>&nbsp;&nbsp;&nbsp;<span>Contacter</span></a>
                                <a href={'/pro/' + pro.nomCommercial + '?pro=' + ficheProId + '&utile=' + pro.userId}
                                    title="Fixer un rendez-vous" className="button-1 color-1"><i
                                        className="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;
                                    <span>Fixer un rendez-vous</span></a>
                                {/*<a href={'/pro/' + pro.nomCommercial + '/services'} title="Services" className="button-1 color-4"><i className="fa fa-info"></i>&nbsp;&nbsp;&nbsp;<span>Services</span></a>
                                 <a href='#' title="Ajouter &agrave; mes amis" className="button-1 color-3"><i className="fa fa-user-plus"></i>&nbsp;&nbsp;&nbsp;<span>Ajouter &agrave; mes amis</span></a>*/}
                            </div>
                        </div>
                        {/*</a>*/}
                    </div>
                )
            })
        )
    }
    render() {
        return (
            <div>{this.state.fichePro ? this.getListPro() : null}</div>
        )
    }
}
export default ListPro;
