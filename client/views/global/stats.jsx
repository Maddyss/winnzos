import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import '/client/views/admin/Applications/components/style/presentationProduit.css';

class Stats extends Component {
    render() {
        return (
            <div className="portfolio-content">
                <div className="fondBleu">
                    <div className="cbp-l-project-title"><h1>Statistiques</h1></div>
                    <div className="cbp-l-project-subtitle">
                        <h2 style={{'color':'black'}}>10 jours Gratuit pour découvrir tous Winnzos</h2></div>
                    <div style={{'textAlign':'center'}}>
                        <a href="/register" className="btn red uppercase">Démarrez gratuitement <i className="fa fa-chevron-right"></i> </a>
                    </div>
                </div>
                <div className="cbp-l-project-container container">
                    <div className="row" style={{'paddingBottom':'50px'}}>

                        <div className="center-block">
                            <div className="col-md-4">

                                <h2 style={{'color':'blue'}}>Visibilité en chiffre </h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Retrouvez les demandes liées à votre fiche entreprise dans l'annuaire.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Visualisez le nombre de clique  sur votre fiche.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Le tout en temps réel.</p>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <a href="/register"><img src="/front/StatsAff.png" alt="Amélioration visibilité" style={{'display':'block', 'width':'100%'}} /></a>
                            </div>

                        </div>



                    </div>
                    <div className="row" style={{'paddingBottom':'50px'}}>

                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <img src="/front/Stats2.png" alt="Support unique" style={{'display':'block', 'width':'100%', 'height': ''}} />
                            </div>

                        </div>

                        <div className="col-md-4 center-block">
                            <h2 style={{'color':'blue'}}>Prise de rendez-vous</h2>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}> Retrouvez les informations importantes de vos prise de rendez-vous en ligne. </p>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}> </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;
