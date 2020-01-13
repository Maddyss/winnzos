import React, {PropTypes} from 'react';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent';
import {primary, gray} from '/imports/constants/colors';
import {meetupTypes} from '/imports/api/Meetups';
import './Event.css';


class Event extends UserReactiveComponent {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    get isPending(){
        return !this.props.event.validatedStatus;
    }

    handleClick(e){
    }

    render() {
        const {event} = this.props;
        const user = this.user();
        let color = user ? user.agendaColor() : primary;
        if (event.type === meetupTypes[2]) {
            color = gray;
        }

        var eventUser = Meteor.users.findOne(event.proId);
        var userName = "";
        if (eventUser) {
            if (eventUser.color) {
                color = eventUser.color;
            }
            userName = eventUser.displayName();
        }

        if(this.isPending){
            color = gray;
        }

        return (
            <div onClick={this.handleClick} className="wzEvent" style={{background: color}}>
                <span>
                  <strong>{event.title}</strong>
                    {event.description && ` : ${event.description}`} <br/>
                    {userName}
                </span>
                {
                    this.isPending ? <div style={{backgroundColor : '#c0392b'}}>En attente de validation</div> : null
                }
            </div>
        );
    }
}
Event.propTypes = {
    event: PropTypes.object.isRequired,
};

export default Event;
