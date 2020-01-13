import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import '/imports/stylesheet/global/error.min.css';

export default class NoPageFound extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12 page-404">
                    <div className="number font-red"> 404 </div>
                    <div className="details">
                        <h3>Oops! Vous êtes perdu.</h3>
                        <p> Votre page est introuvable.
                            <br/>
                            <a href="/"> Retour à l'accueil </a>  </p>
                    </div>
                </div>
            </div>
        );
    }
};