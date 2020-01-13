import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export default class TimeLineItem extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        var position = "right";
        if(this.props.message.from === Meteor.userId()){
            position = "left";
        }
        return <li className={"mt-item "+position}>
            <div className="mt-timeline-content">
                <div className="mt-content-container">
                    <div className="mt-title">
                        <h3 className="mt-content-title">{this.props.message.userFrom().username}</h3>
                        {moment(this.props.message.date).format('DD/MM/YYYY, HH:mm:ss')}
                    </div>
                    <div className="mt-content border-grey-salt">
                        {this.props.message.message.split('\n').map((i,index)=><p key={index}>{i}</p>)}
                    </div>
                </div>
            </div>
        </li>;
    }
}