import React from "react";
import Tracker from 'tracker-component';
import Meetups from '/imports/api/Meetups/index.js';
import {Bar as BarChart} from "react-chartjs";
import lodash from "lodash";
import moment from "moment";
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

    getOptions() {
        return {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            hover: {
                mode: 'label'
            },
            responsive: true
        };
    }


    getData() {
        var dataPoints = this.state.meetups;

        let groupment = 'day';

        let grouped = lodash.groupBy(dataPoints, i => {
            return moment(i.start).startOf(groupment).format('d')
        });

        let continuousDatesFromStartToEnd = [0,1,2,3,4,5,6];

        var dataset = continuousDatesFromStartToEnd.map(i => {
            var existingData = grouped[i+''];
            return existingData ? existingData.length : 0;
        });

        let labels = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

        return {
            labels: labels,
            datasets: [
                {
                    label: "Affichages journaliers",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: dataset
                },
            ]
        };
    };

    render() {
        return <div className="portlet light bordered">
            <div className="portlet-title">
                <div className="caption">
                    <i className="icon-bar-chart font-dark hide"></i>
                    <span className="caption-subject font-dark bold uppercase">Nombres de Rendez-vous par jour de la semaine</span>
                    <span className="caption-helper"></span>
                </div>
            </div>
            <div className="portlet-body">

                {
                    this.state.ready ?
                        <BarChart options={this.getOptions()} data={this.getData()} /> : <div>
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