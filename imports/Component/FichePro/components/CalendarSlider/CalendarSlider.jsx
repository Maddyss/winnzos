import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';
import Tracker from 'tracker-component';
import Meetups from '/imports/api/Meetups';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';

class CalendarSlider extends Tracker.Component {
  static propTypes = {
    fichePro: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    const { fichePro } = this.props;
    const { userId } = fichePro;
    const proId = userId;
    this.state = { agendaSettings: null, meetups: null };
    this.subs = ['Users.agendaSettings.single', 'Meetups.all.pro'].map(subName =>
      this.subscribe(subName, proId)
    );
    this.autorun(() => {
      const proUser = Meteor.users.findOne(proId);
      this.setState({
        agendaSettings: proUser && proUser.rawAgendaSettings(),
        meetups: Meetups.find({ proId }).fetch(),
      });
    });
  }
  render() {
    const { fichePro } = this.props;
    const { agendaSettings, meetups } = this.state;
    /*if (!agendaSettings || !meetups) {
      return <Spinner />;
    }*/
    console.log('fichePro', fichePro);
    console.log('agendaSettings', agendaSettings);
    console.log('meetups', meetups);
    return (
      <Col xs={12} sm={6}>
        {/*<p>
          Agenda settings:
          {
            JSON.stringify(agendaSettings)
          }
        </p>*/}
        <p>
          Meetups:
          {
            JSON.stringify(meetups)
          }
        </p>
      </Col>
    );
  }
}
export default CalendarSlider;
