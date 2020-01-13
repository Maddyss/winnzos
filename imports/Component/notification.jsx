import React, { Component } from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Notification } from '../api/collection/collection';

export default class NotificationDOM extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            subscription: {
                notifications: Meteor.subscribe('notification.limit5')
            }
        }
    }
    componentWillUnmount() {
        this.state.subscription.notifications.stop();
    }
    notifications() {
        return Notification.find({}).fetch();
    }
    notificationsCount() {
        return Notification.find({}).count();
    }
    getListNotif() {
        return (
             this.notifications().map(notif => {
                    return (
                        <li key={notif._id}>
                            <a href={notif._id}>
                                <span className="time">{moment(notif.time).format('DD/MM/YYYY')}</span>
                                    <span className="details">
                                        <span className="label label-sm label-icon label-success">
                                        <i className="fa fa-plus"></i>
                                    </span> {notif.title} </span>
                            </a>
                        </li>
                    )
                })
        )
    }
    getAucunNotif()
    {
        return (<li><span className="details">Aucune notification</span></li>);
    }
    render() {
        return (
        <li className="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
            <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                <i className="icon-bell"></i>
                <span className="badge badge-default"> {(this.notificationsCount()) ? this.notificationsCount() : 0} </span>
            </a>
            <ul className="dropdown-menu">
                <li className="external">
                    <h3><span className="bold">{(this.notificationsCount()) ? this.notificationsCount() + ' notifications': 0 + ' notification'}</span></h3>
                </li>
                <li>
                    <ul  className="dropdown-menu-list scroller" data-handle-color="#637283">{(this.notifications()) ? this.getListNotif() :  this.getAucunNotif() } </ul>
                </li>
            </ul>
        </li>
        )
    }
};
