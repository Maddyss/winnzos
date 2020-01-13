/**
 * Created by root on 02/09/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Parrainage extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <section id="parrainage">
                <div className="container" style={{'padding':'10px'}}>
                    <div className="row">
                        <div className="col-md-6" >
                            <div style={{'backgroundColor':'#f4b8b8', 'textAlign': 'center', 'padding':'20px', 'borderRadius':'5px'}}>
                                <h4 style={{'fontWeight': '600', 'paddingBottom':'10px'}}>Vous êtes une entreprise ?</h4>
                                <p>Saviez-vous que 92 % des internautes font des recherches en ligne avant de se déplacer en magasin ?</p>
                                <p>Venez-vous inscrire gratuitement.</p>
                                <a href="/register"><button className="btn red price-button sbold uppercase">Inscrivez-vous</button></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{'background':'#f4b8b8', 'textAlign': 'center', 'padding':'20px', 'borderRadius':'5px'}}>
                                <h4 style={{'fontWeight': '600', 'paddingBottom':'10px'}}>Faites découvrir Winnzos à une entreprise</h4>
                                <p>Nous pouvons aussi contacter une entreprise pour vous ! </p>
                                <p>Pour cela, rien de plus simple : cliquez sur le bouton ci-dessous.</p>
                                <a href="/parrainage"><button className="btn red price-button sbold uppercase">Faites découvrir Winnzos</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}