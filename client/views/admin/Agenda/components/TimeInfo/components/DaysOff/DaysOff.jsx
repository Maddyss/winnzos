import React, { Component } from 'react';
import lodash from 'lodash';
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import { weekDaysAsNumbers, weekDayNumberToString, weekDayStringToNumber } from '/imports/constants/weekDays';
import { insertDayOff, removeDayOff } from '/imports/api/Meetups';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';
import "./DaysOff.scss";
import Tracker from 'tracker-component';
import moment from 'moment';

import Meetups from '/imports/api/Meetups';
import {Entreprise} from '/imports/api/collection/collection';



class DaysOff extends Tracker.Component {
  constructor(props) {
    super(props);    
    let proId = String(Meteor.userId());
    this.state = { 
      daysOff: [],
      closedDays:[],
      pro: {},
      company: {},
      allMeetups: [],            
      employees: [],
    };
    this.getDaysOff = this.getDaysOff.bind(this);
    this.getClosedDays = this.getClosedDays.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    var subscription = this.subscribe('Meetups.withEmployees');

    this.shouldUpdate = true;
    this.autorun(() => {
        var pro = Entreprise.findOne({ userId: proId });
        var company = Meteor.users.findOne({ _id: proId });
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

          var stateUpdate = {
                pro: pro,
                company: company,
                allMeetups: allMeetups,
            };

        if(subscription.ready() && this.shouldUpdate){
          var closedDays = this.getClosedDays(allMeetups);
          var daysOff = this.getDaysOff(closedDays);
          this.shouldUpdate = false;          
          stateUpdate.daysOff = daysOff;
          stateUpdate.closedDays = closedDays;
        }    

        this.setState(stateUpdate);
        });

  }

  handleDayChange(e){
    const dayOff = Number(e.nativeEvent.target.value);
    var indexOf = lodash.indexOf(this.state.daysOff,dayOff);
    if(indexOf>-1){
      var daysOff = this.state.daysOff.concat();
      daysOff.splice(indexOf,1);  
      this.setState({ daysOff:daysOff });
    }
    else{
      var daysOff = this.state.daysOff.concat(dayOff);  
      this.setState({ daysOff:daysOff });
    }
  }

  handleSubmit(e){
    e.preventDefault();

    var daysOffToAdd=lodash.filter(this.state.daysOff,(d)=>{
      if(!lodash.some(this.state.closedDays,(c)=>{return c === weekDayNumberToString(d)})){
          return true;
      }
    });
    var daysOffToRemove = lodash.map(lodash.filter(this.state.closedDays,(d)=>{
      if(!lodash.some(this.state.daysOff,(c)=>{return d === weekDayNumberToString(c)})){
          return true;
      }
    }),i=>weekDayStringToNumber(i));

    var allPromises = [];

    if(daysOffToAdd && daysOffToAdd.length>0){
      lodash.forEach(daysOffToAdd, (dayToAdd)=>{
       allPromises.push(insertDayOff.callPromise({dayOff: dayToAdd}))
          // .then(() => )
          // .catch(err => alertDanger({ message: err.toString() }));
        });       
      }    

    if(daysOffToRemove && daysOffToRemove.length>0){
      var allPromises = [];
      lodash.forEach(daysOffToRemove, (dayToRemove)=>{
       allPromises.push(removeDayOff.callPromise({dayOff: dayToRemove}))
          // .then(() => )
          // .catch(err => alertDanger({ message: err.toString() }));
        });        
      }

       Promise.all(allPromises).then(()=>{
          alertSuccess({
               title: `Les jours non travaillés on été sauvegardé.`,
           });
          this.shouldUpdate = true;
           
        }).catch(err => alertDanger({ message: err.toString() }));
  }

  getDaysOff(closedDays){
    return lodash.filter(weekDaysAsNumbers,d =>{
      return lodash.some(closedDays,(closedDay)=>{return closedDay === weekDayNumberToString(d)});
    }) || [] ;
  }

    getClosedDays(meetups) {
        var closedDays = [];
        var days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        var yearClosedDays = meetups.filter(m => {
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

        return closedDays;
    }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalDaysOff">
          <Col sm={12}>
            <p>Jours de fermeture sur l'année en cours</p>
               {
                weekDaysAsNumbers.map(d =>{
                var isChecked = lodash.some(this.state.daysOff,(dayOff)=>{return dayOff === d});
                  return <label key={d} className="closedDays">
                    <input type="checkbox" value={d} checked={isChecked} onClick={this.handleDayChange}/> {weekDayNumberToString(d)}
                  </label>
                }
                )
              }
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <SubmitButton onSubmit={this.handleSubmit}>
              Sauvegarder
            </SubmitButton>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default DaysOff;
