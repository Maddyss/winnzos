import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import '/imports/stylesheet/adminBoard/coming-soon.min.css';
import '/imports/scripts/global/jquery.countdown';

export default class CommingSoon extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount () {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('#defaultCountdown').countdown({until: austDay});
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 coming-soon-header">
                        <a className="brand" href="/home_pro">
                            <img src="/front/logo-winnzos.png" alt="logo" className="img-fluid" /> </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 coming-soon-content">
                        <h1>Bientôt!</h1>
                        <p> Un peu de patience cette fonctionnalités arrivera bientôt ! </p>
                        <br />
                    </div>
                    <div className="col-md-6 coming-soon-countdown">
                        <div id="defaultCountdown"> </div>
                    </div>
                </div>
            </div>
    );
    }
};