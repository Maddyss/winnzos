import React from "react";

import lodash from 'lodash';
import {Line as LineChart} from "react-chartjs";
import moment from "moment";

export default class DailyGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewType: 'week'
        }
    }

    static propTypes = {
        dateProperty: React.PropTypes.string,
        elements : React.PropTypes.array
    };

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
                // Overrides the global setting
                mode: 'label'
            },
            responsive: true
        };
    }

    getViewTypes() {
        return [{
            id: 'week',
            name: 'Semaine',
        }, {
            id: 'month',
            name: 'Mois',
        }, {
            id: 'year',
            name: 'Année',
        },]
    }

    getData() {
        var dataPoints = this.props.elements;

        let start;
        let end = moment();
        let groupment = 'day';

        switch (this.state.viewType) {
            case 'month':
                start = moment().add(-1, 'month');
                groupment = 'day';
                break;
            case 'year':
                start = moment().add(-1, 'year');
                groupment = 'month';
                break;
            case 'week':
            default:
                start = moment().add(-7, 'day');
                groupment = 'day';
                break;
        }

        dataPoints = dataPoints.filter(i => moment(i[this.props.dateProperty]).isSameOrAfter(start) && moment(i[this.props.dateProperty]).isSameOrBefore(end));

        let grouped = lodash.groupBy(dataPoints, i => {
            return moment(i[this.props.dateProperty]).startOf(groupment).format('DD-MM-YYYY')
        });

        let continuousDatesFromStartToEnd = [];
        let now = start.clone().startOf(groupment);
        while (now.isSameOrBefore(end)) {
            continuousDatesFromStartToEnd.push(now);
            now = now.clone().add(1, groupment);
        }

        var dataset = continuousDatesFromStartToEnd.map(i => {
            var existingData = grouped[i.format('DD-MM-YYYY')];
            return existingData ? existingData.length : 0;
        });

        let labels;

        switch (this.state.viewType) {
            case 'year':
                labels = continuousDatesFromStartToEnd.map(i => lodash.startCase(i.format('MMMM YYYY')));
                break;
            case 'week':
            case 'month':
            default:
                labels = continuousDatesFromStartToEnd.map(i => i.format('DD/MM/YYYY'))
                break;
        }

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

    selectViewType(e, viewType) {
        e.preventDefault();
        this.setState({
            viewType: viewType.id
        });
    }

    render() {
        return <div>
            <div>
                Affichage par : {
                this.getViewTypes().map((i, index) => <a href="#" key={index}
                                                         className={"label " + (this.state.viewType === i.id ? 'label-primary' : "label-default")}
                                                         onClick={e => this.selectViewType(e, i)}>
                    {i.name}
                </a>)
            }
            </div>
            <LineChart data={this.getData()} options={this.getOptions()}/>
        </div>
    }
}