/**
 * Created by root on 10/09/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ImageSource extends Component {
    constructor (props) {
        super (props);
        console.log(this.props);
    }

    render () {
        return (
            <div>
                <div>Toto</div>
            </div>
        )
    }

}