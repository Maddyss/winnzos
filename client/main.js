import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import {Meteor} from 'meteor/meteor';
import '/imports/router';

if (Meteor.isClient) {
    if (
        FlowRouter.current().path === '/login' ||
        FlowRouter.current().path === '/register' ||
        FlowRouter.current().path === '/'
    ) {
        $('body').addClass('login');
    } else {
        $('body')
            .addClass('page-header-fixed page-sidebar-closed-hide-logo page-content-white page-md');
    }
}
