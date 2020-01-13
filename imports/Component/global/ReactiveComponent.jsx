import { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// Linter for using decorated class
/* eslint-disable */
const ReactiveComponent = TrackerReact(Component);
/* eslint-enable */

export default ReactiveComponent;
