/**
 * Created by root on 20/07/16.
 */
import update from 'react-addons-update';
import React, {Component} from 'react';
import {
    Form, FormGroup, Col, Radio, ControlLabel, FormControl, Checkbox,
} from 'react-bootstrap';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import Meetups from '/imports/api/Meetups';
import InputTimePicker from '/imports/Component/InputTimePicker/InputTimePicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';

import {Entreprise} from '/imports/api/collection/collection';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';
import FichePro from '/imports/Component/FichePro/FichePro.jsx';
import swal from 'sweetalert2';
import lodash from 'lodash'
import {parseDurationInMinutes, roundDateToNextXMinutes} from './function/utils.js'

import './infoProAuthentifie.scss';

import AppointmentBooking from "./components/appointmentbooking.jsx";
import BookingCalendar from "./components/calendar.jsx";
import MapsProFiche from './MapsProFiche';

export default class Professionnel extends Tracker.Component {
    constructor(props) {
        super(props);
        let proId = String(this.props.proId);
        this.state = {
            nomCommercial: FlowRouter.getParam('proName'),
            proId: proId,
            pro: {},
            company: {},
            employees: [],
            allMeetups: [],
            appointment: {
                hour: null
            },
            currentday: moment(),
            showDetailedAppointmentView: false,
            errorMessage: ""
        }
        window.sub = this.subscribe('infoSociete.FichePro', proId);
        this.subscribe('Users.specific.employees.with.events', proId);
        this.autorun(() => {
            var pro = Entreprise.findOne({ userId: proId });
            var company = Meteor.users.findOne({ _id: proId });
            // var company = Meteor.users.find({ _id: proId }).fetch();
            var employees = Meteor.users.find({ companyId: proId }).fetch();

            var allMeetups = Meetups.find({
                $and: [{
                    $or: [
                        { proId: { $in: employees.map(j => j._id) } },
                        { proId: proId }
                    ]
                }
                ]
            }).fetch();

            this.setState({
                pro: pro,
                company: company,
                employees: employees,
                allMeetups: allMeetups,
            });
        });
        this.trackStats();

        this.getInfoSociete.bind(this);
        // this.societe.bind(this);
        this.createMeetupRequest = this.createMeetupRequest.bind(this);
        this.generateAvailabilityDays = this.generateAvailabilityDays.bind(this);
        this.getAvailableEmployeesForDate = this.getAvailableEmployeesForDate.bind(this);
        this.getInfoSociete = this.getInfoSociete.bind(this);
        this.getListeArticle = this.getListeArticle.bind(this);
        this.getListeAvis = this.getListeAvis.bind(this);
        this.getListeService = this.getListeService.bind(this);
        this.getNextDays = this.getNextDays.bind(this);
        this.getPreviousDays = this.getPreviousDays.bind(this);
        this.goBackToCalendar = this.goBackToCalendar.bind(this);
        this.isDateAvailableForAnyEmployee = this.isDateAvailableForAnyEmployee.bind(this);
        this.isDateAvailableForEmployee = this.isDateAvailableForEmployee.bind(this);
        this.setAppointement = this.setAppointement.bind(this);
        this.updateAppointmentHour = this.updateAppointmentHour.bind(this);
        this.updateAppointmentValue = this.updateAppointmentValue.bind(this);
        this.getMeetupDuration = this.getMeetupDuration.bind(this);
        this.getClosedDays = this.getClosedDays.bind(this);
    }

    trackStats() {
        let proId = String(this.props.proId);

        Meteor.call('stats.record.userview', {
            userVisitedId: proId,
            location: 'detail'
        }, (err) => {
            if (err) {
                console.log(err.reason);
            } else {
                console.log("Stats tracked for ", proId);
            }
        });
    }

    componentDidUpdate() {
        window.prerenderReady = true;
    }

    componentWillUnmount() {
        const comp = this.autorun(c => {
            c.stop();
        });
    }

    setAppointement(day, hour) {

        var stateModifier = {};


        if (day) {
            var workers = this.state.employees.concat(this.state.company);

            var defaultPresta = this.state.company.profile.agendaSettings.prestations.length > 0 ? this.state.company.profile.agendaSettings.prestations[0]._id : null;
            var modifier = {
                ['day']: { $set: day },
                ['employee']: { $set: workers[0]._id },
                ['prestation']: { $set: defaultPresta },
            };

            var original;
            var newValue;

            if (hour) {
                modifier['hour'] = { $set: hour };
                original = this.state.appointment;
                newValue = update(original, modifier);
            }
            else {
                var days = this.generateAvailabilityDays();
                var currentDay = days.find(i => i.date.isSame(day));
                modifier['hour'] = { $set: currentDay.calendarDisplayHours[0] }
                original = this.state.appointment;
                newValue = update(original, modifier);
            }

            stateModifier.appointment = newValue;
            stateModifier.showDetailedAppointmentView = true;

            var appointmentDate = stateModifier.appointment.day.clone().hour(stateModifier.appointment.hour.hour()).minutes(stateModifier.appointment.hour.minutes());
            var employees = this.getAvailableEmployeesForDate(appointmentDate);
            newValue.employee = employees[0].id;
        }
        else {
            //we need to select the first hour available
            stateModifier.appointment = {};
            stateModifier.showDetailedAppointmentView = true;
        }


        stateModifier.appointment

        this.setState(stateModifier);
    }

    goBackToCalendar(day) {
        var modifier = {
            ['day']: { $set: day }
        };

        var original = this.state.appointment;
        var newValue = update(original, modifier);

        this.setState({
            appointment: newValue,
            showDetailedAppointmentView: false
        });
    }

    updateAppointmentValue(event, key) {
        var modifier = {
            [key]: { $set: event.target.value }
        };
        var original = this.state.appointment;
        var newValue = update(original, modifier);

        this.setState({
            appointment: newValue
        });
    }

    updateAppointmentHour(event, key) {
        var modifier = {
            [key]: { $set: moment(event) }
        };
        var original = this.state.appointment;
        var newValue = update(original, modifier);

        this.setState({
            appointment: newValue
        });
    }

    getNextDays() {
        this.setState({
            currentday: this.state.currentday.add(4, 'days')
        });
    }

    getPreviousDays() {
        this.setState({
            currentday: this.state.currentday.add(-4, 'days')
        });
    }

    isDateAvailableForEmployee(date, employee) {
        var meetupExists = this.state.allMeetups.find(i => {
            if (i.proId !== employee) {
                return false;
            }

            var start = moment(i.start);
            var end = moment(i.end);

            if (date.isSameOrAfter(start) && date.isBefore(end)) {
                return true;
            }

            return false;
        });

        return !meetupExists;
    }

    isDateAvailableForAnyEmployee(date) {
        var employeeIds = this.state.employees.map(i => i._id);
        employeeIds.push(this.state.company._id);

        return employeeIds.find(id => {
            return this.isDateAvailableForEmployee(date, id);
        });
    }


    getMeetupDuration() {
        var selectedPrestation = this.state.appointment.prestation;
        var duration = parseDurationInMinutes(this.state.company.profile.agendaSettings.timeFrame || "1h");
        if (selectedPrestation !== null) {
            var prestation = this.state.company.profile.agendaSettings.prestations[selectedPrestation];
            if (prestation) {
                duration = prestation.duration;
            }
        }
        return duration;
    }

    createMeetupRequest(e) {
        e.preventDefault();
        if (!this.state.appointment.cgu) {
            this.setState({
                errorMessage: "Vous devez accepter les conditions générale d'utilisation pour pouvoir prendre rendez-vous."
            });
            return;
        }

        if (!this.state.appointment.phoneNumber || this.state.appointment.phoneNumber.length < 10) {
            this.setState({
                errorMessage: "Merci de remplir un numéro de téléphone valide."
            });
            return;
        }

        if(!this.state.appointment.name || this.state.appointment.name.length < 2){
            this.setState({
                errorMessage: "Vous devez renseigner votre Nom."
            });
            return;
        }

        var startDate = this.state.appointment.day.clone().hour(this.state.appointment.hour.hour()).minute(this.state.appointment.hour.minutes());
        var endDate = startDate.clone().add(this.getMeetupDuration(), 'minutes');
        var selectedPrestation = this.state.company.profile.agendaSettings.prestations[this.state.appointment.prestation];

        var NameUser = this.state.appointment.name;
        var params = {
            proId: this.state.appointment.employee,
            phoneNumber: this.state.appointment.phoneNumber,
            start: startDate.toDate(),
            end: endDate.toDate(),
            allDay: false,
            type: 'Rendez-vous',
            title: (selectedPrestation ? selectedPrestation.name : 'Rendez-vous') + ' avec ' + NameUser,
            prestationName: selectedPrestation ? selectedPrestation.name : null,
            isActive: true,
        }

        Meteor.call('Meetups.methods.createMeetupRequest', params, (err) => {
            if (err) {
                console.log(err.reason);
                this.setState({
                    errorMessage: err.message,
                });
            } else {
                swal({
                    title: 'Le rendez vous a été enregistré.',
                    text: 'Vous recevrez une confirmation par email.',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                });
                this.goBackToCalendar(this.state.appointment.day);
            }
        });
    }


    hasChat() {
        return this.state.company && Roles.userIsInRole(this.state.company._id, 'chatInstant');
    }

    getInfoSociete() {
        let certification;
        certification = <div className="user-pic pro"><ImagesPro proId={this.state.proId.toString() }/>
            <div className="certified">Professionnel CERTIFI&Eacute; </div>
        </div>;

        var days = this.generateAvailabilityDays();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div id="contact-buttons">
                            {this.hasChat() ? <a href={ '/pro/chat/' + this.state.nomCommercial + '?proId=' + this.state.company._id} title="Contacter"
                                className="button-1 color-2"><i
                                    className="fa fa-phone"></i>&nbsp; &nbsp; &nbsp; <span>Contacter</span></a> : null}
                        </div>
                        <h1 className="heading-1 text-center">{this.state.pro.titreContact}</h1>
                        {this.state.pro.activiteName && this.state.pro.activiteName != 0 ? <h2 className="sub-heading-1 text-center">{this.state.pro.activiteName}</h2> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6" id="main-block">
                        { certification }
                        <div className="description" dangerouslySetInnerHTML={{ __html: this.state.pro.descriptions }}>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h3 className="heading-1 with-lines text-center">Prenez rendez-vous en ligne</h3>
                        {!this.state.showDetailedAppointmentView ?
                            <BookingCalendar {...this.state}
                                getPreviousDays={this.getPreviousDays}
                                setAppointement={this.setAppointement}
                                getNextDays={this.getNextDays}
                                days={days}

                                />
                            :
                            <AppointmentBooking {...this.state}
                                updateAppointmentValue={this.updateAppointmentValue}
                                goBackToCalendar={this.goBackToCalendar}
                                createMeetupRequest={this.createMeetupRequest}
                                getAvailableEmployeesForDate={this.getAvailableEmployeesForDate}
                                getMeetupDuration={this.getMeetupDuration}
                                days={days}
                                />
                        }

                    </div>
                </div>
                <div className="section-heading"><h2 className="heading-1 with-lines text-center">Information entreprise</h2></div>
                <div className="row">
                    {/*<div id="rdv-infos">*/}
                    <div className="col-md-6">
                        <div className="col-md-4">
                            <div className="text-center border-info">
                                <p style={{ 'color': '#ea212e' }}>
                                    <i className="fa fa-calendar fa-4x"></i>
                                </p>
                                {this.state.company.profile.agendaSettings ?
                                    <p>{moment(this.state.company.profile.agendaSettings.officeHourStart).format("HH[h]mm") } - {moment(this.state.company.profile.agendaSettings.morningHourEnd).format("HH[h]mm") } / {moment(this.state.company.profile.agendaSettings.afternoonHourStart).format("HH[h]mm") } - {moment(this.state.company.profile.agendaSettings.officeHourEnd).format("HH[h]mm") }</p>
                                    : null}
                                {this.getClosedDays() ?
                                    <p>{this.getClosedDays() } </p> : null}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center border-info">
                                <p style={{ 'color': '#ea212e' }}>
                                    <i className="fa fa-map-marker fa-4x"></i>
                                </p>
                                <p>{ this.state.pro.AdresseSiege.Voie + ' ' + this.state.pro.AdresseSiege.ZipCode + ' ' + this.state.pro.AdresseSiege.Ville }</p>
                            </div>
                        </div>
                        { this.state.pro.telContact !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{ 'color': '#ea212e' }}>
                                        <i className="fa fa-phone fa-4x"></i>
                                    </p>
                                    <p>{ this.state.pro.telContact }</p>
                                </div>
                            </div>
                            :
                            null }
                        { this.state.pro.mailContact !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{ 'color': '#ea212e' }}>
                                        <i className="fa fa-envelope-o fa-4x"></i>
                                    </p>
                                    <p><a href={"mailto:" + this.state.pro.mailContact } >{ this.state.pro.mailContact } </a></p>
                                </div>
                            </div>
                            :
                            null }
                        { this.state.pro.siteWeb !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{ 'color': '#ea212e' }}>
                                        <i className="fa fa-globe fa-4x"></i>
                                    </p>
                                    <p><a target="_blank" href={ this.state.pro.siteWeb } >{ this.state.pro.siteWeb }</a></p>
                                </div>
                            </div>
                            :
                            null }
                        { this.state.pro.lienFacebook !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{ 'color': '#ea212e' }}>
                                        <i className="fa fa-facebook fa-4x"></i>
                                    </p>
                                    <p><a target="_blank" href={ this.state.pro.lienFacebook } >{ this.state.pro.lienFacebook }</a></p>
                                </div>
                            </div>
                            :
                            null }
                        { this.state.pro.lienTwitter !== '' ?
                            <div className="col-md-4">
                                <div className="text-center border-info">
                                    <p style={{ 'color': '#ea212e' }}>
                                        <i className="fa fa-twitter fa-4x"></i>
                                    </p>
                                    <p><a target="_blank" href={ this.state.pro.lienTwitter } >{ this.state.pro.lienTwitter }</a></p>
                                </div>
                            </div>
                            :
                            null }
                    </div>
                    <div className="col-md-6">
                        <MapsProFiche pos={this.state.pro.fichePro} />
                    </div>
                </div>
            </div>
        )
    }

    getAvailableEmployeesForDate(appointmentDate) {
        var availableEmployees = [];
        var employees = this.state.employees.map(i => ({ id: i._id, name: i.username }));
        employees.push({ id: this.state.company._id, name: this.state.pro.titreContact });

        availableEmployees = employees.filter(e => {
            return this.isDateAvailableForEmployee(appointmentDate, e.id);
        })
        return availableEmployees;
    }

    isDayFullyUnavailable(day) {
        day = day.clone().hour(12);

        var fullDayMeetupExists = this.state.allMeetups.find(m => {
            if (m.proId !== this.state.company._id) {
                return false;
            }


            var mStart = moment(m.start);
            var mEnd = moment(m.end);

            if (m.allDay && m.type === "Indisponibilité" && mStart.isSameOrBefore(day) && mEnd.isAfter(day)) {
                return true;
            }
        });
        return fullDayMeetupExists;
    }

    getClosedDays() {
        var closedDays = [];
        var info = "";
        var days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        var yearClosedDays = this.state.allMeetups.filter(m => {
            if (m.proId !== this.state.company._id) {
                return false;
            }
            var mStart = moment(m.start);
            var mEnd = moment(m.end);

            if (m.allDay && m.type === "Indisponibilité") {
                if (m.title.indexOf('Jour non ouvré') > -1) {
                    var day = m.title.split(' ')[0];
                    if (!closedDays.some((d) => { return d === day; }) && days.some((d) => { return d === day; })) {
                        closedDays.push(day);
                    }
                }
                return true;
            }
        });

        var orderedClosedDays = lodash.orderBy(closedDays, (d) => {
            return days.indexOf(d);
        });

        lodash.forEach(orderedClosedDays, (d) => {
            if (!info) {
                info = "Sauf " + d;
            }
            else {
                info = info + " et " + d;
            }
        });

        return info;
    }

    generateAvailabilityDays() {
        var days = [];
        if (this.state.company.profile.agendaSettings) {
            var officeStartHour = moment(this.state.company.profile.agendaSettings.officeHourStart);
            var officeEndHour = moment(this.state.company.profile.agendaSettings.officeHourEnd);
            var timeSpan = parseDurationInMinutes(this.state.company.profile.agendaSettings.timeFrame) || 30;
            var minimumStartHour = roundDateToNextXMinutes(moment().add(1, 'hour'), timeSpan);

            for (var i = 0; i < 4; i++) {
                days[i] = {
                    date: this.state.currentday.clone().add(i, 'days'),
                    calendarDisplayHours: [],
                };

                if (!this.isDayFullyUnavailable(days[i].date)) {

                    var startHour = moment.max(days[i].date.clone().hour(officeStartHour.hour()).minutes(officeStartHour.minutes()), minimumStartHour);
                    var currentHour = startHour.clone();
                    var endHour = days[i].date.clone().hour(officeEndHour.hour()).minutes(officeEndHour.minutes());


                    while (currentHour.isBefore(endHour)) {


                        if (this.state.company.profile.agendaSettings.morningHourEnd &&
                            this.state.company.profile.agendaSettings.afternoonHourStart) {

                            var morningEndsHour = moment(this.state.company.profile.agendaSettings.morningHourEnd);
                            var morningEnds = days[i].date.clone().hour(morningEndsHour.hour()).minutes(morningEndsHour.minutes());
                            var afternoonStartsHour = moment(this.state.company.profile.agendaSettings.afternoonHourStart);
                            var afternoonStarts = days[i].date.clone().hour(afternoonStartsHour.hour()).minutes(afternoonStartsHour.minutes());

                            if (currentHour.isSameOrAfter(morningEnds) && currentHour.isBefore(afternoonStarts)) {
                                currentHour = afternoonStarts; //Let's jump to the start of the afternoon.
                            }
                        }

                        var employeeWithAvailability = this.isDateAvailableForAnyEmployee(currentHour);

                        if (employeeWithAvailability) {
                            days[i].calendarDisplayHours.push(currentHour);
                        }
                        currentHour = currentHour.clone().add(timeSpan, 'minutes');
                    }
                }
            }
        }
        return days;
    }

    getListeService(service) {
        return (
            service.map(serv => {
                return (
                    <ul>
                        <li><span>{ serv.titre }</span></li>
                    </ul>
                )

            })
        )
    }

    getListeArticle(article) {
        return (
            article.map(art => {
                return (
                    <ul>
                        <li><span>{ art.titre }</span></li>
                    </ul>
                )

            })
        )
    }

    getListeAvis(avis) {
        return (
            avis.map(av => {
                return (
                    <div className="avis">
                        <p className="info">Par { av.name } le { moment(av.time).format('DD/MM/YYYY') }</p>
                        <p className="text">{ av.description }</p>
                    </div>
                )

            })
        )
    }

    render() {
        const {pro, company} = this.state;
        return (
            <div>
                <section id="content">
                    {  pro && company ? this.getInfoSociete() : (<Spinner />) }
                </section>
            </div>
        )
    }
}
