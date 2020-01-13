import React from 'react';
import isNull from 'lodash/isNull';
import {
    Form, FormGroup, Col, ControlLabel,
} from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import InputDateRangePicker from '/imports/Component/InputDateRangePicker/InputDateRangePicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import getDefaultsFromModel from '/imports/api/utils/getDefaultsFromModel';
import {
    Model, DayOff, meetupTypes, insertMeetup,
} from '/imports/api/Meetups';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';

class OffPeriod extends UserReactiveComponent {
    constructor(props) {
        super(props);
        this.state = {startDate: null, endDate: null};
    }

    isSubmitDisabled = () => {
        const {startDate, endDate} = this.state;
        return isNull(startDate) || isNull(endDate);
    }
    handleChange = picker => this.setState(picker)
    handleSubmit = (e) => {
        e.preventDefault();
        const {startDate, endDate} = this.state;
        if (!this.isSubmitDisabled()) {
            const start = startDate.toDate();
            const end = endDate.toDate();
            const offPeriod = {
                ...getDefaultsFromModel(Model),
                type: meetupTypes[2],
                proId: this.user().userId(),
                title: DayOff.dayOff.label,
                start,
                end,
                allDay: true,
                validatedStatus : true,
            };
            insertMeetup.callPromise(offPeriod)
                .then(() => alertSuccess({title: 'Période ajoutée'}))
                .catch(err => alertDanger({message: err.toString()}));
        }
    }

    render() {
        const {startDate, endDate} = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalSingleDayOff">
                    <Col sm={12}>
                        <p>Désactiver une période</p>
                        <InputDateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={12}>
                        <SubmitButton
                            disabled={this.isSubmitDisabled()}
                            onSubmit={this.handleSubmit}
                        >
                            Désactiver cette période
                        </SubmitButton>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
export default OffPeriod;
