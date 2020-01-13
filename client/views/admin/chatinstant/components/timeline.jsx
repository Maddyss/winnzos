import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import TimeLineItem from "./timeline-item";

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return <div className="portlet light portlet-fit bordered">
            <div className="portlet-body">
                <div className="mt-timeline-2">
                    <div className="mt-timeline-line border-grey-steel"></div>
                    <ul className="mt-container">
                        {
                            this.props.messages.map(message => {
                                return <TimeLineItem key={message._id} message={message}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>;
    }

}