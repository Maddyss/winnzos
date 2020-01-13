import React from 'react';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import {Grid, Row, Col} from 'react-bootstrap';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import Meetups from '/imports/api/Meetups';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import './Calendar.css';
import Event from './components/Event/Event.jsx';
import EventAgenda from './components/EventAgenda/EventAgenda.jsx';
import _ from "lodash";

import swal from 'sweetalert2';

moment.locale('fr');
BigCalendar.momentLocalizer(moment);

const hourFormat = 'HH:mm';

class Calendar extends UserReactiveComponent {
    constructor(props) {
        super(props);
        this.state = {
            view: 'week',
            subscription: {
                meetups: Meteor.subscribe('Meetups.withEmployees'),
            },
        };
    }

    componentWillUnmount() {
        this.state.subscription.meetups.stop();
    }

    meetups = () => Meetups.find().fetch()
    handleView = view => this.setState({view})
    // Modify an existing meetup
    handleSelectEvent = (event) => {
        if (!event.validatedStatus) {
            var eventUser = Meteor.users.findOne(event.proId);
            var employee = '';
            if (eventUser.companyId) {
                employee = 'Employé : ' + eventUser.username;
            }

            var prestation = '';
            if (eventUser.companyId) {
                prestation = 'Prestation : ' + event.prestationName;
            }

            var duration = '';
            if (!event.allDay) {
                duration = ' de ' + moment(event.start).format('hh[h]mm') +
                    ' à ' + moment(event.end).format('hh[h]mm');
            }

            swal({
                title: 'Accepter cet évenement?',
                text:   'Date : ' + moment(event.start).format('DD/MM/YYYY') + duration + '\n' +
                        'Titre : ' + event.title + '\n' +
                        'Description : ' + event.description + '\n' +
                        employee + '\n' +
                        prestation
                ,
                input : 'textarea',
                inputPlaceholder : 'Raison du refus (optionel)',
                type: 'success',
                showCancelButton: true,
                confirmButtonText: 'Accepter',
                cancelButtonText: 'Refuser',
                onOpen: function () {
                    $('.swal2-textarea').on('change',function(){
                        window.cancelReason = $('.swal2-textarea').val();
                    });
                }
            }).then(function () {
                Meteor.call('Meetups.methods.validateMeetup',event._id);
            }).catch(function(dismiss,reason){

                if(dismiss === 'cancel'){
                    Meteor.call('Meetups.methods.cancelMeetup',{
                        meetupId:event._id,
                        cancelationReason:window.cancelReason || ''
                    });
                }
            });
        }
        else {

            // Linter for Mongo dangling API
            /* eslint-disable */
            const url = event._id;
            /* eslint-enable */
            FlowRouter.go('CrudMeetup', {url}, event);

        }
    }
    // Create a new meetup
    handleSelectedSlot = slot => FlowRouter.go(
        'CrudMeetup', {url: 'nouveau'}, {start: slot.start, end: slot.end}
    )

    updateCalendarVisibility(user) {
        var key = "is" + user._id + "Disabled";
        this.setState({
            [key]: !this.state[key]
        });
    }

    render() {
        const {view} = this.state;
        const user = this.user();
        const step = user.agendaStep();
        const officeHourStart = user.officeHourStart();
        const officeHourEnd = user.officeHourEnd();

        var users = _(this.meetups()).groupBy(m=>m.proId).map((value, userId)=>Meteor.users.findOne(userId)).filter(i=>i).value();

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <div style={{width: 'calc(100% - 35px)', height: 'calc(100vh - 250px)'}}>
                            <BigCalendar
                                events={_.filter(this.meetups(), m=>!this.state["is" + m.proId + "Disabled"])}
                                view={view} onView={this.handleView}
                                views={['day', 'week', 'month']}
                                selectable
                                step={step}
                                rtl={false}
                                min={officeHourStart}
                                max={officeHourEnd}
                                scrollToTime={officeHourStart}
                                popup
                                messages={{
                                    allDay: 'Jour entier',
                                    previous: 'Précédent',
                                    next: 'Suivant',
                                    today: "Aujourd'hui",
                                    month: 'Mois',
                                    week: 'Semaine',
                                    day: 'Jour',
                                    agenda: 'Agenda',
                                    showMore() {
                                        return 'Afficher plus';
                                    },
                                }}
                                components={{
                                    event: Event,
                                    agenda: {
                                        event: EventAgenda,
                                    },
                                }}
                                formats={{
                                    dateFormat: 'DD/MM',
                                    dayFormat: 'ddd DD/MM',
                                    weekdayFormat: 'dddd',
                                    monthHeaderFormat: 'MMMM YYYY',
                                    weekHeaderFormat: 'dddd DD/MM',
                                    dayHeaderFormat: 'dddd DD/MM/YYYY',
                                    agendaHeaderFormat: 'dddd DD/MM',
                                    selectRangeFormat: 'DD/MM/YYYT',
                                    agendaDateFormat: 'dddd DD/MM',
                                    agendaTimeFormat(start) {
                                        return moment(start).format(hourFormat);
                                    },
                                    agendaTimeRangeFormat({start, end}) {
                                        const fStart = moment(start).format(hourFormat);
                                        const fEnd = moment(end).format(hourFormat);
                                        return `${fStart} - ${fEnd}`;
                                    },
                                    timeGutterFormat: hourFormat,
                                }}
                                onSelectEvent={this.handleSelectEvent}
                                onSelectSlot={this.handleSelectedSlot}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    {users.map(user=> {

                        var color = user.color || (user.profile ? user.profile.agendaSettings ? user.profile.agendaSettings.color : null : null ) || "rgb(214, 70, 53)";


                        return <Col md={12} key={user._id}>
                            <div className="color-tile" style={{backgroundColor: color}}></div>
                            <label><input type="checkbox" onChange={()=>this.updateCalendarVisibility(user)}
                                          checked={!this.state["is" + user._id + "Disabled"]}/>
                                {Meteor.user()._id === user._id ? "Mon agenda" :
                                    <span>Agenda de <strong>{user.displayName()}</strong></span>}</label>
                        </Col>
                    })
                    }

                </Row>
            </Grid>
        );
    }
}

export default Calendar;
