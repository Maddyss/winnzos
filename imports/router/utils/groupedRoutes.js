import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

function redirectNotLoggedIn(context, redirect) {
  if (!Meteor.userId()) {
    redirect('/page_login');
  }
}

export const userPro = FlowRouter.group({
  triggersEnter: [redirectNotLoggedIn],
});
