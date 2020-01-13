import update from 'react-addons-update';
import React, {Component} from 'react';
import {
    Form, FormGroup, Col, Radio, ControlLabel, FormControl, Checkbox,
} from 'react-bootstrap';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import InputTimePicker from '/imports/Component/InputTimePicker/InputTimePicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';

import {Entreprise} from '/imports/api/collection/collection';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';
import FichePro from '/imports/Component/FichePro/FichePro.jsx';
import swal from 'sweetalert2';
import lodash from 'lodash'
import {parseDurationInMinutes, roundDateToNextXMinutes, convertMinutesToReadableSentence} from '../function/utils.js'

export default class Calendar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div id="calendar-slider">
            {this.props.currentday.date() != moment().date() ?
                <a className="control prev" href="#" onClick={(e) => this.props.getPreviousDays() }><i
                    className="fa fa-chevron-left"></i></a>
                : null}
            <div className="slides">
                {_.map(this.props.days, (d, index) => {
                    return <div className="day-block-container" key={index}>
                        <div className="day-block full">
                            <div className="heading">
                                {d.date.format('dddd') }<br /> {d.date.format('Do MMMM') }
                            </div>
                            <div className="content">
                                {d.calendarDisplayHours.length ?
                                    <ul>
                                        {_.map(_.take(d.calendarDisplayHours, 4), (h, hindex) => {
                                            return <li key={hindex}>
                                                <a href="#"
                                                   onClick={(e) => this.props.setAppointement(d.date, h) }>
                                                    {h.format('HH:mm') }
                                                </a>
                                            </li>
                                        }) }
                                        <li>
                                            <a href="#"
                                               onClick={(e) => this.props.setAppointement(d.date) }>
                                                Voir plus
                                            </a>
                                        </li>
                                    </ul> :
                                    <span>Aucune disponibilité</span>
                                }
                            </div>
                        </div>
                    </div>
                }) }
            </div>
            <a className="control next" href="#" onClick={(e) => this.props.getNextDays() }><i
                className="fa fa-chevron-right"> </i></a>
        </div>;
    }
}