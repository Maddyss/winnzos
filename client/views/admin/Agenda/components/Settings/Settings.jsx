import React from 'react';
import {
  Form, FormGroup, Col, ControlLabel, FormControl, Checkbox,
} from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import InputColorPicker from '/imports/Component/InputColorPicker/InputColorPicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';
import { setAgendaSettings, AgendaSettings } from '/imports/api/Users';
import Prestations from "./Prestations.jsx";

class Settings extends UserReactiveComponent {
  constructor(props) {
    super(props);
    const user = this.user();
    const settings = user.agendaSettings();
    this.state = { prestations : [], ...settings };
    this.onPrestationChanged = this.onPrestationChanged.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var data = Object.assign({ automaticValidation: false }, this.state);
    console.log(data);
    setAgendaSettings
    .callPromise(data)
    .then(() => alertSuccess({ title: 'Réglages sauvegardés' }))
    .catch(err => alertDanger({ message: err.toString() }));
  }
  handleAutomaticValidation = (e) => {
    const automaticValidation = e.nativeEvent.target.checked;
    this.setState({ automaticValidation });
  }
  handleColor = color => this.setState({ color })
  handleTimeFrame = (e) => {
    const timeFrame = e.nativeEvent.target.value;
    this.setState({ timeFrame });
  }
  onPrestationChanged(prestations){
    this.setState({prestations : prestations});
  }
  render() {
    const { automaticValidation, color, timeFrame } = this.state;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col sm={12}>
            <Checkbox
              inline
              checked={automaticValidation}
              onChange={this.handleAutomaticValidation}
            >{AgendaSettings.automaticValidation.label}</Checkbox>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <ControlLabel>{AgendaSettings.color.label}</ControlLabel>
            <FormControl
              componentClass={InputColorPicker}
              value={color}
              onChange={this.handleColor}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <ControlLabel>{AgendaSettings.timeFrame.label}</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Durée des créneaux"
              value={timeFrame}
              onChange={this.handleTimeFrame}
            >
              {
                AgendaSettings.timeFrame.allowedValues.map(t =>
                  <option key={t} value={t}>{t}</option>
                )
              }
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <ControlLabel>Préstations</ControlLabel>
            <FormControl
                componentClass="select"
                placeholder="Durée des créneaux"
                value={timeFrame}
                onChange={this.handleTimeFrame}
            >
              {
                AgendaSettings.timeFrame.allowedValues.map(t =>
                    <option key={t} value={t}>{t}</option>
                )
              }
            </FormControl>
          </Col>
        </FormGroup>
        <h3>Vos Prestations</h3>
        <Prestations onPrestationChanged={this.onPrestationChanged} prestations={this.state.prestations}/>
        <FormGroup>
          <Col sm={12}>
            <SubmitButton onSubmit={this.handleSubmit} />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Settings;
