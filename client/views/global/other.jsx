import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import '/client/views/admin/Applications/components/style/presentationProduit.css';

class Other extends Component {
    render() {
        return (
            <div className="portfolio-content">
                <div className="fondBleu">
                    <div className="cbp-l-project-title"><h1>Winnzos évolue</h1></div>
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

                                <h2 style={{'color':'blue'}}>Nouvelle application en préparation </h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Application Devis va vous permettre d'être plus proche de vos client.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Nous recueillons les demandes clients et réalisons instantannément des Devis adaptés des entreprises les plus proches du client. </p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Application Marketing pour trouver de nouveau client</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Une application qui va vous permettre de construire facilement vos campagne d'e-mail et suivre les résultats de cette campagne.</p>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <a href="/register"><img src="/front/StartUp.jpg" alt="Amélioration visibilité" style={{'display':'block', 'width':'100%'}} /></a>
                            </div>

                        </div>



                    </div>
                    <div className="row" style={{'paddingBottom':'50px'}}>

                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <img src="/front/Amelioration1.jpg" alt="Support unique" style={{'display':'block', 'width':'100%', 'height': ''}} />
                            </div>

                        </div>

                        <div className="col-md-4 center-block">
                            <h2 style={{'color':'blue'}}>Amélioration en continu </h2>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}>Partagez nous votre besoin et nous adaptons notre outil. </p>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}>Simplifions ensemble votre quotidien.</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Other;
