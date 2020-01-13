import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';
import { DocHead } from 'meteor/kadira:dochead';

import HeaderFront from '../../../client/views/header/headerFront.jsx';
import NoPageFound from '/imports/Component/global/404.jsx';

const notFound = () => {
  FlowRouter.notFound = {
    action() {
      DocHead.setTitle('404 Page Introuvable');
      const metaUrl = { name: 'url', content: 'https://www.winnzos.fr/404' };
      DocHead.addMeta(metaUrl);
      DocHead.addMeta({name: 'prerender-status-code', content:'404'});
      mount(HeaderFront, { content: <NoPageFound /> });
    },
  };
};

export default notFound;
