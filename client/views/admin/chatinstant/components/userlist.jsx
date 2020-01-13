
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import lodash from 'lodash';

export default class UserList extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        var users = lodash(this.props.messages).groupBy(i=>{
            if(i.from !== Meteor.userId()){
                return i.from;
            }else{
                return i.to;
            }
        }).map((values, key)=>{
            return Meteor.users.findOne(key);
        })
        .filter(i=>i)
        .value();

        return <div>
            <ul className="list-group">
                {users.map(u=>{
                    var numberOfUnReadMessages = lodash.filter(this.props.messages,i=>i.to === Meteor.userId() && i.from === u._id && !i.isReadByReceiver).length;

                    return <li onClick={()=>this.props.onSelectUser(u)} key={u._id} className={"list-group-item"+(this.props.currentConversation === u._id ? " active":"")}> {u.username}
                            {numberOfUnReadMessages ? <span className="badge badge-default"> {numberOfUnReadMessages} </span> : null}
                    </li>
                })}
            </ul>

        </div>
    }

}