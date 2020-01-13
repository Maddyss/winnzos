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


export default class AppointmentBooking extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        var currentDay = this.props.days.find(i => i.date.isSame(this.props.appointment.day));
        var appointmentDate = this.props.appointment.day.clone().hour(this.props.appointment.hour.hour()).minutes(this.props.appointment.hour.minutes());
        var availableEmployees = this.props.getAvailableEmployeesForDate(appointmentDate);

        return <div>
            <a href="#" className="btn btn-warning"  onClick={(e) => this.props.goBackToCalendar(this.props.appointment.day) }>
                <i className="fa fa-arrow-left" aria-hidden="true"> </i>Retour au calendrier
            </a>
            <p>Veuillez compléter les informations suivantes pour finaliser la demande de
                rendez-vous</p>
            <Form horizontal onSubmit={(e) => this.props.createMeetupRequest(e)}>
                <div>
                    <div className="form-group">
                        <div className="heading-1 with-lines text-center"><label
                            className="control-label">{this.props.appointment.day.format('dddd Do MMMM') }</label></div>
                        <div>Durée du rendez-vous {convertMinutesToReadableSentence(this.props.getMeetupDuration())}</div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Heure (obligatoire) </label>
                        <select className="form-control select2 activite"
                                value={this.props.appointment.hour.unix()}
                                onChange={(e) => this.props.updateAppointmentValue({target: {value: moment(e.target.value * 1000)}}, "hour") }>
                            {
                                _.map(currentDay.calendarDisplayHours, (ah, index) => {
                                    return <option value={ah.unix()}
                                                   key={index}>{ah.format('HH:mm') } </option>
                                })
                            }
                        </select>

                    </div>
                    <div className="form-group">
                        <label className="control-label">Prestation</label>
                        <select className="form-control"
                                value={this.props.appointment.prestation}
                                onChange={(e) => this.props.updateAppointmentValue(e, "prestation") }>
                            <option value={null} key="none">Choisir une préstation</option>
                            {
                                _.map(this.props.company.profile.agendaSettings.prestations, (p, index) => {
                                    return <option value={index} key={index}>{p.name} ({p.duration}
                                        mins) </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Employé</label>
                        <select className="form-control"
                                value={this.props.appointment.employee}
                                onChange={(e) => this.props.updateAppointmentValue(e, "employee") }>
                            {
                                _.map(availableEmployees, (e, index) => {
                                    return <option value={e.id} key={e.id}>{e.name}</option>
                                })
                            }
                        </select>
                        <p>{lodash.get(lodash.find(this.props.employees, (e) => {
                            return e._id === this.props.appointment.employee
                        }), 'description')}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Nom</label>
                        <input type="text" placeholder="Hugo" className="form-control"
                               value={this.props.appointment.name || "" }
                               onChange={(e) => this.props.updateAppointmentValue(e, "name") }/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Numéro de Téléphone</label>
                        <input type="text" placeholder="06 ..." className="form-control"
                               value={this.props.appointment.phoneNumber || "" }
                               onChange={(e) => this.props.updateAppointmentValue(e, "phoneNumber") }/>
                    </div>
                    <div className="form-group">
                        <Checkbox checked={this.props.appointment.cgu || false}
                                  onChange={(e) => this.props.updateAppointmentValue(e, "cgu") }>
                            J'accepte les <a href="/condG">conditions générales d'utilisation.</a>
                        </Checkbox>
                    </div>
                    <div className="pull-right">
                        <p>{this.props.errorMessage}</p>
                        <SubmitButton onSubmit={(e) => this.props.createMeetupRequest() }>
                            Prendre rendez-vous
                        </SubmitButton>
                    </div>
                </div>
            </Form>
        </div>
    }
}