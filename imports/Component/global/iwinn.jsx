import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import '/client/views/admin/Applications/components/style/presentationProduit.css';

class Iwinn extends Component {
    render() {
        return (
            <div className="portfolio-content">
                <div className="fondBleu">
                    <div className="cbp-l-project-title"><h1>IWinn</h1></div>
                    <div className="cbp-l-project-subtitle">
                        <h2 style={{'color':'black'}}>Un chatbot qui s'intègre sur votre page Facebook pour répondre éfficacement à vos demandes client.</h2></div>

                    <div style={{'textAlign':'center'}}>
                        <a href="/register" className="btn red uppercase">Démarrez gratuitement <i className="fa fa-chevron-right"></i> </a>
                    </div>
                </div>
                <div className="cbp-l-project-container container">
                    <div className="row" style={{'paddingBottom':'50px'}}>

                        <div className="center-block">
                            <div className="col-md-4">

                                <h2 style={{'color':'blue'}}>Service client personnalisé </h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Répond immédiatement au question client sur vos tarifications, vos prestations ou encore votre localisation.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Vous permet de vous concentrez sur votre coeur de métier et iWinn s'occupe de la relation client d'amorcage.</p>

                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <img src="/front/winnzoz-petit.jpg" alt="iWinn" style={{'display':'block', 'width':'30%'}} />
                            </div>

                        </div>



                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <img src="/front/winnzos-message.jpg" alt="iWinn Message" style={{'display':'block', 'width':'50%'}} />
                            </div>

                        </div>

                        <div className="center-block">
                            <div className="col-md-4">

                                <h2 style={{'color':'blue'}}>Intégration Facebook</h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}>Nous réalisons l'intégration sur votre page Facebook et adaptons le chatbot à votre image. </p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}>Avec l'expérience il apprend de ses erreurs et s'améliorent continuellement.</p>

                                <h2 style={{'color':'blue'}}>Promotion</h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Diffusez une promotion sur Facebook Messenger à tous vos client.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Vous permet d'alerter rapidement vos client, sans frais supplémentaire. </p>

                                <h2 style={{'color':'blue'}}>iWinn</h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> iWinn est la mascotte des chatbots Winnzos.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Il vous permettra de gagner un temps considérable. </p>
                                <div style={{'textAlign':'center'}}>
                                    <a href="http://m.me/winnzos" className="btn red uppercase">Tester iWinn<i className="fa fa-chevron-right"></i></a></div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Iwinn;
