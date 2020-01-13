import React from 'react';
import {
    Form, FormGroup, Col, ControlLabel, FormControl, Checkbox,
} from 'react-bootstrap';
import { setAgendaSettings, AgendaSettings } from '/imports/api/Users';
import Tracker from 'tracker-component';
import DurationDropdown from "./DurationDropdown";

class Prestations extends Tracker.Component {
    constructor(props) {
        super(props);
        const user = Meteor.user();
        this.state = { newPrestationDuration : 30,newPrestationName : '' };
        this.onDurationPrestationChange = this.onDurationPrestationChange.bind(this);
        this.onNewPrestationNameChange = this.onNewPrestationNameChange.bind(this);
        this.onAddNewPrestation = this.onAddNewPrestation.bind(this);
        this.onRemovePrestation = this.onRemovePrestation.bind(this);
    }

    convertMinutesToHours(minutes){
        if(minutes>=60){
            var hours = Math.round(minutes/60);
            if(hours>1){
                return hours + " heures";
            }else{
                return hours + " heures";
            }
        }else{
            if(minutes>1){
                return minutes + " minutes"
            }else{
                return minutes + " minute";
            }
        }
    }

    static propTypes ={
        prestations : React.PropTypes.array,
        onPrestationChanged : React.PropTypes.func.isRequired,
    }

    onNewPrestationNameChange(e){
        this.setState({newPrestationName:e.target.value});
    }

    onDurationPrestationChange(newValue){
        this.setState({newPrestationDuration:newValue});
    }
    
    onAddNewPrestation(){
        var newPrestation = {name : this.state.newPrestationName, duration : this.state.newPrestationDuration};
        var newPrestationsArray = this.props.prestations.concat(newPrestation);
        this.props.onPrestationChanged(newPrestationsArray);
        this.setState({
            newPrestationName : '',
        });
    }


    onRemovePrestation(index){
        //Clones the array
        var newPrestationsArray = this.props.prestations.concat();
        newPrestationsArray.splice(index,1);
        this.props.onPrestationChanged(newPrestationsArray);
    }


    render() {
        var prestations = this.props.prestations || [];
        return <table className="table">
            <thead>
                <tr>
                    <td>Préstation</td>
                    <td>Durée</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
            {
                prestations.map((p,index)=><tr key={index}>
                    <td>{p.name}</td>
                    <td>{this.convertMinutesToHours(p.duration)}</td>
                    <td><a className="btn btn-primary" onClick={()=>this.onRemovePrestation(index)}>Supprimer</a></td>
                </tr>)
            }
            <tr>
                <td><input type="text" placeholder="Nom de la prestation" className="form-control" value={this.state.newPrestationName} onChange={this.onNewPrestationNameChange}/></td>
                <td><DurationDropdown onChange={this.onDurationPrestationChange} value={this.state.newPrestationDuration} /></td>
                <td><a className="btn btn-primary" onClick={this.onAddNewPrestation}>Ajouter</a></td>
            </tr>
            </tbody>
        </table>
    }
}

export default Prestations;
