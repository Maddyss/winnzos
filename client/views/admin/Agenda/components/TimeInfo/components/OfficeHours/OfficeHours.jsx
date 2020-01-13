import React from 'react';
import {
    Form, FormGroup, Col, ControlLabel,
} from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import InputTimePicker from '/imports/Component/InputTimePicker/InputTimePicker.jsx';
import {setAgendaSettings, AgendaSettings} from '/imports/api/Users';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';

import "./OfficeHours.scss";

class OfficeHours extends UserReactiveComponent {
    constructor(props) {
        super(props);
        const user = this.user();
        const settings = user.agendaSettings();
        this.state = {...settings};
        this.handleClosedForLunchChange = this.handleClosedForLunchChange.bind(this);
    }

    handleChangeOfficeHour = key => (value) => {
        this.setState({[key]: value});
    }
    handleSubmit = (e) => {
        var data = Object.assign({automaticValidation: false}, this.state);
        console.log(data);
        e.preventDefault();
        setAgendaSettings
            .callPromise(data)
            .then(() => alertSuccess({title: 'Informations horaires sauvegardées'}))
            .catch(err => alertDanger({message: err.toString()}));
    }

    get isClosedForLunch(){
        return !!(this.state.morningHourEnd && this.state.afternoonHourStart);
    }

    handleClosedForLunchChange(){
        if(!this.isClosedForLunch) {
            this.setState({
                morningHourEnd: new Date(1970, 1, 1, 12),
                afternoonHourStart: new Date(1970, 1, 1, 14),
            });
        }else{
            this.setState({
                morningHourEnd: null,
                afternoonHourStart: null,
            });
        }
    }

    render() {
        const {officeHourStart, officeHourEnd,morningHourEnd,afternoonHourStart} = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalOfficeHours">
                    <Col componentClass={ControlLabel} sm={3}>
                        {AgendaSettings.officeHourStart.label}
                    </Col>
                    <Col sm={2}>
                        <InputTimePicker
                            value={officeHourStart}
                            onChange={this.handleChangeOfficeHour('officeHourStart')}
                        />
                    </Col>
                    <Col componentClass={ControlLabel} sm={3}>
                        {AgendaSettings.officeHourEnd.label}
                    </Col>
                    <Col sm={2}>
                        <InputTimePicker
                            value={officeHourEnd}
                            onChange={this.handleChangeOfficeHour('officeHourEnd')}
                        />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalOfficeHours">
                    <Col componentClass={ControlLabel} sm={3}>
                        <input type="checkbox" onChange={this.handleClosedForLunchChange} className="form-control openlunchcheckbox" checked={this.isClosedForLunch}/>
                        Je souhaite fermer le midi
                    </Col>
                    {
                        this.isClosedForLunch ? 
                            <div>

                                <Col componentClass={ControlLabel} sm={2}>
                                    {AgendaSettings.morningHourEnd.label}
                                </Col>
                                <Col sm={1}>
                                    <InputTimePicker
                                        value={morningHourEnd}
                                        onChange={this.handleChangeOfficeHour('morningHourEnd')}
                                    />
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>
                                    {AgendaSettings.afternoonHourStart.label}
                                </Col>
                                <Col sm={1}>
                                    <InputTimePicker
                                        value={afternoonHourStart}
                                        onChange={this.handleChangeOfficeHour('afternoonHourStart')}
                                    />
                                </Col>
                            </div> : null
                    }
                </FormGroup>
                <FormGroup>
                    <Col sm={12}>
                        <SubmitButton onSubmit={this.handleSubmit}/>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
export default OfficeHours;
