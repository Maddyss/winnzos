import React from 'react';
import {
    Form, FormGroup, Col, ControlLabel, FormControl, Checkbox,
} from 'react-bootstrap';
import { setAgendaSettings, AgendaSettings } from '/imports/api/Users';
import Tracker from 'tracker-component';

class DurationDropdown extends Tracker.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        value :  React.PropTypes.number.isRequired,
        onChange : React.PropTypes.func.isRequired
    }

    render() {
        return <select value={this.props.value} onChange={(e)=>this.props.onChange(e.target.value*1)} className={(this.props.className || "")+" form-control"}>
            <option value={30}>30 minutes</option>
            <option value={60}>1 heure</option>
            <option value={120}>2 heures</option>
            <option value={180}>3 heures</option>
        </select>
    }
}



export default DurationDropdown;
