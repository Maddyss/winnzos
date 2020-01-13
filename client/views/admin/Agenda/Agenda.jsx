import React from 'react';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import PortletTabs from '/imports/Component/PortletTabs/PortletTabs.jsx';
import TimeInfo from './components/TimeInfo/TimeInfo.jsx';
import Calendar from './components/Calendar/Calendar.jsx';
import Settings from './components/Settings/Settings.jsx';

class Agenda extends UserReactiveComponent {
  render() {
    const hasRendezVous = this.user() ? this.user().hasRendezVous() : false;
    return (
      <Grid>
        {
          hasRendezVous ?
            <Row>
              <Col md={12}>
                <PortletTabs
                  title="Agenda"
                  items={[
                    { title: 'Calendrier', component: <Calendar /> },
                    { title: 'Information Horaire', component: <TimeInfo /> },
                    { title: 'Réglages', component: <Settings /> },
                  ]}
                />
              </Col>
            </Row> :
            <Row>
              <h1>Section réservée</h1>
              <p>
                Veuillez acheter ce service pour en bénéficier :&nbsp;
                <a href={FlowRouter.path('Applications')}>Vos applications</a>
              </p>
            </Row>
        }
      </Grid>
    );
  }
}

export default Agenda;
