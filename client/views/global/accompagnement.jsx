import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import '/client/views/admin/Applications/components/style/presentationProduit.css';

class Suivi extends Component {
    render() {
        return (
            <div className="portfolio-content">
                <div className="fondBleu">
                    <div className="cbp-l-project-title"><h1>Nous sommes là pour vous</h1></div>
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

                                <h2 style={{'color':'blue'}}>A vos côtés </h2>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Nous vous accompagnons dans le développement de votre entreprise.</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> Votre consultant dédié Winnzos s'occupe de tout et vous assure une mise en ligne rapide et surtout clé en main :</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> - Nous vous accompagnons dans le paramétrage de votre agenda en fonction de votre activité</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> - Nous assurons la formation à l'utilisation des outils Winnzos</p>
                                <p style={{'textAlign':'left', 'fontSize':'16px'}}> - Nos experts web vous accompagnent dans la création du contenu de votre site web </p>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <a href="/register"><img src="/front/upVisibility.jpg" alt="Amélioration visibilité" style={{'display':'block', 'width':'100%'}} /></a>
                            </div>

                        </div>



                    </div>
                    <div className="row" style={{'paddingBottom':'50px'}}>

                        <div className="col-sm-6 col-md-6 col-lg-6 center-block" >
                            <div className="thumbnail">

                                <img src="/front/Communication2.jpg" alt="Support unique" style={{'display':'block', 'width':'100%', 'height': ''}} />
                            </div>

                        </div>

                        <div className="col-md-4 center-block">
                            <h2 style={{'color':'blue'}}>Disponibilité</h2>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}>Nous sommes disponnible 6j/7 de 8h à 22h </p>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}>Par téléphone au 09 72 58 90 29</p>
                            <p style={{'textAlign':'left', 'fontSize':'16px'}}>Sur le chat en bas à droite de Winnzos.fr</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Suivi;
