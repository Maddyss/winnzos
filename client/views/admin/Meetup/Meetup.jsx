import React, {PropTypes} from 'react';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import {
    Form, FormGroup, Col, Radio, ControlLabel, FormControl, Checkbox,
} from 'react-bootstrap';
import {DocHead} from 'meteor/kadira:dochead';
import {Model, insertMeetup, updateMeetup, deleteMeetup} from '/imports/api/Meetups';
import getDefaultsFromModel from '/imports/api/utils/getDefaultsFromModel';
import InputTimePicker from '/imports/Component/InputTimePicker/InputTimePicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import ActionButton from '/imports/Component/global/ActionButton.jsx';
import ButtonLink from '/imports/Component/global/ButtonLink.jsx';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';

import Tracker from 'tracker-component';


class Meetup extends Tracker.Component {
    static propTypes = {
        meetup: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        const {meetup} = this.props;
        const proId = Meteor.user()._id;
        this.state = {
            validatedStatus : true,
            proId,
            ...getDefaultsFromModel(Model),
            ...meetup,
            employees : [],
            isEmployee : Meteor.user().isEmployee(),
            parentCompany : undefined,
            isActive : true,
        };
        // Linter for dangling usage of Mongo
        /* eslint-disable */
        this.meetupId = this.state._id;
        /* eslint-enable */

        this.handleChangePrestation = this.handleChangePrestation.bind(this);

        this.subscribe('Users.employees');
        this.subscribe('Users.parentCompany');

        this.autorun(() => {
            this.setState({
                employees: Meteor.users
                    .find({companyId: Meteor.user()._id})
                    .fetch()
            });
        });
        if(this.state.isEmployee){
            this.autorun(() => {
                this.setState({
                    parentCompany: Meteor.users
                        .findOne({_id: Meteor.user().companyId})
                });
            });
        }
    }

    handleChangeType(type) {
        return () => this.setState({type});
    }

    setDates(start, end, state) {
        const step = Meteor.user().agendaStep();
        const mStart = moment(new Date(start));
        let mEnd = moment(new Date(end));
        const newState = Object.assign({}, state);
        if (mEnd.isSameOrBefore(mStart)) {
            mEnd = moment(mStart);
            mEnd.add(step, 'm');
            newState.end = mEnd.toDate();
        }
        this.setState(newState);
    }

    handleChangeAllDay = e => this.setState({allDay: e.nativeEvent.target.checked});
    handleChangeStart = start => this.setDates(start, this.state.end, {start})
    handleChangeEnd = end => this.setDates(this.state.start, end, {end})

    handleChangeText(key) {
        return e => this.setState({[key]: e.nativeEvent.target.value});
    }

    handleChangeRecipient = e => this.setState({recipient: e.nativeEvent.target.value})
    handleSubmit = (e) => {
        e.preventDefault();
        const content = Object.assign({}, this.state,
            {start: new Date(this.state.start), end: new Date(this.state.end)}
        );
        delete content.parentCompany;
        delete content.isEmployee;
        delete content.employees;
        console.log(content);
        const validatedMethod = this.meetupId ? updateMeetup : insertMeetup;
        validatedMethod
            .callPromise(content)
            .then(() => {
                FlowRouter.go('Agenda');
                alertSuccess({title: `Rendez-vous ${this.meetupId ? 'modifié' : 'sauvegardé'}'`});
            })
            .catch(err =>{
                alertDanger({message: err.toString()})
            });
    }
    handleDelete = (e) => {
        e.preventDefault();
        deleteMeetup
            .callPromise({_id: this.meetupId})
            .then(() => {
                FlowRouter.go('Agenda');
                alertSuccess({title: 'Rendez-vous effacé'});
            })
            .catch(err => alertDanger({message: err.toString()}));
    }

    handleChangePrestation = (e)=>{
        var prestationName = e.target.value;
        var modifier = {prestationName : prestationName};

        var prestation = this.prestations.find(i=>i.name === prestationName);
        if(prestation){
            modifier.end = moment(new Date(this.state.start)).add(prestation.duration,'minutes').toDate().toString();
        }

        this.setState(modifier);
    }

    get prestations(){
        var prestations = [];
        const company = this.state.isEmployee? this.state.parentCompany : Meteor.user();
        if(company && company.profile && company.profile.agendaSettings && company.profile.agendaSettings.prestations){
            prestations = company.profile.agendaSettings.prestations;
        }
        return prestations;
    }

    render() {
        const title = `${this.meetupId ? 'Modifier' : 'Créer'} un rendez-vous`;


        DocHead.setTitle(title);
        const {type, start, end, allDay} = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col sm={12}>
                        <h1>{title}</h1>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalType">
                    <Col sm={12}>
                        {
                            Model.type.allowedValues.map(t =>
                                <Radio
                                    key={kebabCase(t)}
                                    inline
                                    checked={type === t}
                                    onChange={this.handleChangeType(t)}
                                >{t}</Radio>
                            )
                        }
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalAllDay">
                    <Col smOffset={2} sm={10}>
                        <Checkbox checked={allDay} onChange={this.handleChangeAllDay}>
                            {Model.allDay.label}
                        </Checkbox>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartEnd">
                    <Col componentClass={ControlLabel} sm={2}>De</Col>
                    <Col sm={2}>
                        <InputTimePicker
                            value={start}
                            onChange={this.handleChangeStart}
                            disabled={allDay}
                        />
                    </Col>
                    <Col componentClass={ControlLabel} sm={1}>À</Col>
                    <Col sm={2}>
                        <InputTimePicker
                            value={end}
                            onChange={this.handleChangeEnd}
                            disabled={allDay}
                        />
                    </Col>
                </FormGroup>
                {
                    this.state.isEmployee ? null :
                        <FormGroup controlId="formEmployeeSelection">
                            <Col componentClass={ControlLabel} sm={2}>Employé</Col>
                            <Col sm={10}>
                                <FormControl componentClass="select" placeholder=""
                                             value={this.state.proId || Meteor.user()._id}
                                             onChange={this.handleChangeText('proId')}
                                             rows={4}>
                                    <option value={Meteor.user()._id}>Pas d'employé</option>
                                    {this.state.employees.map(e=><option key={e._id} value={e._id}>{e.username}</option>)}
                                </FormControl>
                            </Col>
                        </FormGroup>
                }
                <FormGroup controlId="formPrestationSelection">
                    <Col componentClass={ControlLabel} sm={2}>Prestation</Col>
                    <Col sm={10}>
                        <FormControl componentClass="select" placeholder=""
                                     value={this.state.prestationName || ''}
                                     onChange={this.handleChangePrestation}
                                     rows={4}>
                            <option value="">Pas de prestation</option>
                            {this.prestations.map(e=><option key={e.name} value={e.name}>{e.name}</option>)}
                        </FormControl>
                    </Col>
                </FormGroup>
                {
                    ['recipient', 'title'].map(key =>
                        <FormGroup key={key} controlId={`formHorizontal${upperFirst(key)}`}>
                            <Col componentClass={ControlLabel} sm={2}>{Model[key].label}</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    min={Model[key].min}
                                    max={Model[key].max}
                                    placeholder={Model[key].label}
                                    value={this.state[key] || ''}
                                    onChange={this.handleChangeText(key)}
                                />
                            </Col>
                        </FormGroup>
                    )
                }
                <FormGroup controlId="formHorizontalDescription">
                    <Col smOffset={2} sm={10}>
                        <FormControl
                            type="text"
                            componentClass="textarea"
                            max={Model.description.max}
                            rows={4}
                            placeholder={Model.description.label}
                            value={this.state.description || ''}
                            onChange={this.handleChangeText('description')}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={3}>
                        <SubmitButton onSubmit={this.handleSubmit}>
                            {this.meetupId ? 'Modifier le rendez-vous' : 'Créer le rendez-vous'}
                        </SubmitButton>
                    </Col>
                    {
                        this.meetupId &&
                        <Col sm={3}>
                            <ActionButton onClick={this.handleDelete}>
                                Effacer le rendez-vous
                            </ActionButton>
                        </Col>
                    }
                    <Col sm={3}>
                        <ButtonLink routeName="Agenda">Annuler</ButtonLink>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default Meetup;
