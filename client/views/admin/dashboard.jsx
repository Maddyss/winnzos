import React from 'react';
import GraphVisiteur from './statistics/visitorgraph.jsx';
import MeetupsGraph from './statistics/meetupsgraph.jsx';
import MeetupsDayOfWeekGraph from './statistics/meetingstats.jsx';

const DashBoard = () => (
  <div>
      <div className="row">
          <div className="col-md-6 col-sm-6">
              <GraphVisiteur location={'detail'} title="Visites sur votre profil" />
          </div>
          <div className="col-md-6 col-sm-6">
              <GraphVisiteur location={'list'} title="Affichages dans les résultats de recherche"/>
          </div>
      </div>
      {
          Meteor.user().hasRendezVous() ?
              <div className="row">
                  <div className="col-md-6 col-sm-6">
                      <MeetupsGraph />
                  </div>
                  <div className="col-md-6 col-sm-6">
                      <MeetupsDayOfWeekGraph />
                  </div>
              </div>
              :null
      }
  </div>
);

export default DashBoard;
