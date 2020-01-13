import React from "react";
import Tracker from 'tracker-component';
import Meetups from '/imports/api/Meetups/index.js';

import DailyGraph from "./components/dailygraph.jsx";

export default class VisitorGraph extends Tracker.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetups: [],
        };
        var sub = this.subscribe('Meetups.withEmployees');
        this.autorun(() => {
            let meetups = Meetups.find({type : 'Rendez-vous',isActive : true}).fetch();

            this.setState({
                meetups,
                ready: sub.ready()
            });

        });
    }


    render() {
        return <div className="portlet light bordered">
            <div className="portlet-title">
                <div className="caption">
                    <i className="icon-bar-chart font-dark hide"></i>
                    <span className="caption-subject font-dark bold uppercase">Nombres de Rendez-vous</span>
                    <span className="caption-helper"></span>
                </div>
            </div>
            <div className="portlet-body">

                {
                    this.state.ready ?
                        <DailyGraph dateProperty={'start'} elements={this.state.meetups} /> : <div>
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