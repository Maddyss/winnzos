import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

// Block the routing untill all routes are defined (see routing-defined)
if (Meteor.isClient) {
  FlowRouter.wait();
}

// Routing rules for SSR
if (Meteor.isServer) {
  // Cache is set on 100s
  // const TIME_IN_MS = 1000 * 100;
  const TIME_IN_MS = 0;
  FlowRouter.setPageCacheTimeout(TIME_IN_MS);
  // Defer Script loading
  FlowRouter.setDeferScriptLoading(true);
  // Linter for server side traces
  /* eslint-disable */
  console.log('SSR cache set');
  /* eslint-enable */
}
