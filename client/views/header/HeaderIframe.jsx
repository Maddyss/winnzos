import React, { Component } from 'react';
import Tracker from 'tracker-component';


export default class HeaderIframe extends Tracker.Component {
    constructor(props){
        super(props);
        Meteor.users.deny({
            update() { return true; }
        });

    }

    render() {

        return (
            <div className="page-content">
                {this.props.content}
            </div>
        )
    }

};