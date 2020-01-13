import React from 'react';
import { Form, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import InputDatePicker from '/imports/Component/InputDatePicker/InputDatePicker.jsx';
import SubmitButton from '/imports/Component/global/SubmitButton.jsx';
import getDefaultsFromModel from '/imports/api/utils/getDefaultsFromModel';
import { Model, DayOff, meetupTypes, removeMeetup } from '/imports/api/Meetups';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';
import Meetups from '/imports/api/Meetups';
import "./SingleDaysOffList.scss";

import moment from 'moment';


class SingleDaysOffList extends Tracker.Component {
  constructor(props) {
    super(props);
    let proId = String(Meteor.userId());

    this.state = {
      value: null,
      closedDays: [],
      allMeetups: [],
      employees: [],
      company: {},

    };

    var subscription = this.subscribe('Meetups.withEmployees');
    this.getClosedDays = this.getClosedDays.bind(this);
    this.removeClosedDay = this.removeClosedDay.bind(this);

    this.autorun(() => {
      var employees = Meteor.users.find({ companyId: proId }).fetch();
      var company = Meteor.users.findOne({ _id: proId });
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
        allMeetups: allMeetups,
        company: company,
      };

      if (subscription.ready()) {
        stateUpdate.closedDays = this.getClosedDays(allMeetups);
      }

      this.setState(stateUpdate);
    });

  }


  getClosedDays(meetups) {
    var closedDays = [];
    var yearClosedDays = meetups.filter(m => {
      if (m.proId !== this.state.company._id) {
        return false;
      }
      var mStart = moment(m.start);
      var mEnd = moment(m.end);
      var today = moment()._d;
      if (m.allDay && m.type === "Indisponibilité" && mStart.format("DD/MM/YYYY") === mEnd.format("DD/MM/YYYY")) {
        if (mEnd > today && !closedDays.some((d) => { return d === mStart.format("DD/MM/YYYY"); })) {
          closedDays.push(mStart.format("DD/MM/YYYY"));
        }
        return true;
      }
    });
    return _.sortBy(closedDays, i => {
      return moment(i, "DD/MM/YYYY").unix();
    });
  }

  removeClosedDay(e, d) {
    e.preventDefault();
    var meetup = _.find(this.state.allMeetups, (m) => {
      var mStart = moment(m.start);
      var mEnd = moment(m.end);
      if (mStart.format("DD/MM/YYYY") === d && mEnd.format("DD/MM/YYYY") === d) {
        return true;
      }
    });

    if (meetup) {
      removeMeetup.callPromise({_id:meetup._id})
        .then(() => alertSuccess({ title: `Le jour a été réactivé.` }))
        .catch(err => alertDanger({ message: err.toString() }));
    }
    else {
      alertDanger({ message: "Impossible de trouver le jour." });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalSingleDaysOffList">
          <Col sm={12}>
            <p>Liste des journées désactivées</p>
          </Col>
          {
            this.state.closedDays.map((d, index) => {
              return <div className="col-md-4" key={index}><label>{d} <i className="fa fa-times reactivate-day" title="Réactiver le jour." onClick={(e) => this.removeClosedDay(e, d)}></i></label></div>
            })
          }
        </FormGroup>
      </Form>
    );
  }
}
export default SingleDaysOffList;
