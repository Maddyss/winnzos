import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';

export default class ProfileDOM extends React.Component{
    constructor(props){
        super(props);
    }
    logoutHome(event){
        event.preventDefault();

        Meteor.logout();
        FlowRouter.go('/');
    }
    render() {
        return (
            <li className="dropdown dropdown-user">
                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                    <ImagesPro proId={ Meteor.userId() } />
                    <span className="username username-hide-on-mobile"> { Meteor.user() ?  Meteor.user().username : this.logoutHome } </span>
                    <i className="fa fa-angle-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-default">
                    <li>
                        <a href="/page_user_profile">
                            <i className="icon-user"></i> Mon Compte </a>
                    </li>
                    {/* <li>
                        <a href="/app_calendar">
                            <i className="icon-calendar"></i> Mon Agenda </a>
                    </li>
                    <li>
                        <a href="/app_inbox">
                            <i className="icon-envelope-open"></i> Boite Mail
                            <span className="badge badge-danger"> 3 </span>
                        </a>
                    </li>
                    <li className="divider"> </li>
                    <li>
                        <a href="/page_user_lock">
                            <i className="icon-lock"></i> Verrouillage </a>
                    </li>*/}
                    <li>
                        <a href="javascript:;" onClick={ this.logoutHome }>
                            <i className="icon-key"></i> Déconnection </a>
                    </li>
                </ul>
            </li>
        )
    }
};