import React from "react";
import Tracker from 'tracker-component';
import UserViews from '/imports/api/userview/index.js';
import lodash from 'lodash';
import {Line as LineChart} from "react-chartjs";
import moment from "moment";

import DailyGraph from "./components/dailygraph.jsx";


export default class MeetupsGraph extends Tracker.Component {
    constructor(props) {
        super(props);
        this.state = {
            userviews: [],
        };
        var sub = this.subscribe('ProfileViews.OfCurrentUser');
        this.autorun(() => {
            let userviews = UserViews.find({
                userVisitedId: Meteor.userId(),
                location : this.props.location
            }).fetch();

            this.setState({
                userviews,
                ready: sub.ready()
            });

        });

    }
    render() {
        return <div className="portlet light bordered">
            <div className="portlet-title">
                <div className="caption">
                    <i className="icon-bar-chart font-dark hide"></i>
                    <span className="caption-subject font-dark bold uppercase">{this.props.title}</span>
                    <span className="caption-helper"></span>
                </div>
            </div>
            <div className="portlet-body">
                {
                    this.state.ready ?
                        <DailyGraph elements={this.state.userviews} dateProperty={'date'}/> : <div>
                        <div id="site_statistics_loading">
                            <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                            <span className="sr-only">En chargement...</span>
                        </div>
                        <div id="site_statistics_content" className="display-none">
                            <div id="site_statistics" className="chart">
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>;
    }
}