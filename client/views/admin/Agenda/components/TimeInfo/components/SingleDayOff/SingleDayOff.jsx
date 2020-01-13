import React from 'react';
import {
  Form, FormGroup, Col, ControlLabel,
} from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import InputDatePicker from '/imports/Component/InputDatePicker/InputDatePicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import getDefaultsFromModel from '/imports/api/utils/getDefaultsFromModel';
import {
  Model, DayOff, meetupTypes, insertMeetup,
} from '/imports/api/Meetups';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';

import moment from 'moment';


class SingleDayOff extends UserReactiveComponent {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }
  handleChange = value => this.setState({ value })
  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    if (value !== null) {

      const date = new Date(value);
      var startOfTheDay = moment(date).hour(0).minutes(1);
      var endOfTheDay = moment(date).hour(23).minutes(59);

      const dayOff = {
        ...getDefaultsFromModel(Model),
        type: meetupTypes[2],
        proId: this.user().userId(),
        title: DayOff.dayOff.label,
        start: startOfTheDay.toDate(),
        end: endOfTheDay.toDate(),
        allDay: true,
        validatedStatus : true,
      };
      insertMeetup.callPromise(dayOff)
      .then(() => alertSuccess({ title: `${DayOff.dayOff.label} ajouté` }))
      .catch(err => alertDanger({ message: err.toString() }));
    }
  }
  render() {
    const { value } = this.state;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalSingleDayOff">
          <Col sm={12}>
            <p>Désactiver une journée</p>
            <InputDatePicker
              value={value}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <SubmitButton disabled={value === null} onSubmit={this.handleSubmit}>
              Désactiver cette journée
            </SubmitButton>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default SingleDayOff;
