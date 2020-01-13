import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';
import { userPro } from '../utils/groupedRoutes';
// Layout
import Header from '../../../client/views/header/header.jsx';
// Views
import Meetup from '../../../client/views/admin/Meetup/Meetup.jsx';
// API
import Meetups from '/imports/api/Meetups';

const initMeetups = () => {
  const name = 'CrudMeetup';
  userPro.route('/rendez-vous/:url', {
    name,
    action(params, queryParams) {
      const url = params.url;
      if (!url) {
        FlowRouter.go('NotFound');
      } else {
        if (params.url === 'nouveau') {
          if (!queryParams.start || !queryParams.end) {
            FlowRouter.go('NotFound');
          } else {
            mount(Header, { content: <Meetup
              meetup={{ start: queryParams.start, end: queryParams.end }}
            /> });
          }
        } else {
          const meetup = Meetups.findOne({ _id: params.url });
          if (meetup) {
            mount(Header, { content: <Meetup meetup={meetup} /> });
          } else {
            FlowRouter.go('NotFound');
          }
        }
      }
    },
  });
  // Linter disabled for preserved isomorphic traces
  /* eslint-disable */
  console.log('Meetups routes declared');
  /* eslint-enable */
};

export default initMeetups;
