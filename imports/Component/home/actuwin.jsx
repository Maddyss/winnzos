import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class ActuwinDOM extends Component {
    render() {
        return (
            <section id="actuwin">
                <div className="section-heading">
                    <h2 className="heading-1 with-lines">Les actuwin'</h2>
                </div>
                <div className="container">
                    <div className="row article">
                        <div className="content col-xs-12 col-sm-6">
                            <a className="category-title" href="#" title="Cat&eacute;gorie">Chez Winnzos</a>
                            <h2 className="heading">DÉMATÉRIALISER SES DOCUMENTS EST-IL RÉELLEMENT SOURCE D’ÉCONOMIES ?</h2>
                            <div className="summary">
                                <p>86 %. C’est le pourcentage de Français favorables à la dématérialisation des documents, selon une étude publiée par le Figaro du 12 avril 2016. Quels sont les avantages de la dématérialisation ? Est-elle vraiment synonyme d’économie ?</p>
                                <p><a className="read-article" href="/articles/dematerialisation" title="Dematerialisation">Lire la suite</a></p>
                            </div>
                            <div className="infos"><i className="fa fa-user"></i> Par Winnzos&nbsp;&nbsp;&nbsp;<i className="fa fa-clock-o"></i> Vendredi 02 septebre 2016</div>
                        </div>
                        <div className="img col-xs-12 col-sm-6">
                            <img className="img-responsive" src="/front/dematerialisation.jpg" alt="Dematerialisation" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};