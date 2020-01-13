import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

// @NOTE Order matter for route definition: subs first, then mainApp static
//  routes, then admin static routes, then admin dynamic, then notFound routes
import globalSubs from './utils/globalSubs';
import './utils/routingStart';
import './mainRouter';
import './adminRouter';
import initDynamicRoutes from './dynamicRoutes';

if (Meteor.isClient) {
  Tracker.autorun((comp) => {
    if (globalSubs.ready()) {
      comp.stop();
      initDynamicRoutes();
      Meteor.defer(() => {
        // Linter disabled for preserved isomorphic traces
        /* eslint-disable */
        console.log('Router released');
        /* eslint-enable */
        FlowRouter.initialize();
      });
    }
  });
} else {
  initDynamicRoutes();
}
