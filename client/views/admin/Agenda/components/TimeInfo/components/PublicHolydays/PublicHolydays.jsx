import React, { Component } from 'react';
import moment from 'moment';
import {
  Form, FormGroup, Col, ControlLabel,
} from 'react-bootstrap';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import { insertPublicHolydays } from '/imports/api/Meetups';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';

class PublicHolydays extends Component {
  constructor(props) {
    super(props);
    this.year = moment().year();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    insertPublicHolydays.callPromise()
    .then(() => alertSuccess({
      title: `Jours fériés ajoutés pour ${this.year}`,
    }))
    .catch(err => alertDanger({ message: err.toString() }));
  }
  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalDaysOff">
          <Col sm={12}>
            <ControlLabel>
              Ajouter les jours fériés sur l'année en cours
              <small style={{ marginLeft: '1em' }}>{this.year}</small>
            </ControlLabel>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <SubmitButton onSubmit={this.handleSubmit}>
              Ajouter les jours fériés
            </SubmitButton>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default PublicHolydays;
