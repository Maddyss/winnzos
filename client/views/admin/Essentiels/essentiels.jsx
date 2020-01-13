import React, {PropTypes} from 'react';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import {
    Form, FormGroup, Col, Radio, ControlLabel, FormControl, Checkbox, Row
} from 'react-bootstrap';
import {DocHead} from 'meteor/kadira:dochead';
import PortletTabs from '/imports/Component/PortletTabs/PortletTabs.jsx';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';

import Tracker from 'tracker-component';
import Web from './components/web/web.jsx';
import Graphisme from './components/graphisme/graphisme.jsx';
import Contenu from './components/contenu/contenu';


class Essentiels extends Tracker.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
           <div>
               <div className="container">
                   <h2>Les indispensables pour votre entreprise</h2>
                   <div className="row">
                       <Row>
                           <Col md={12}>
                               <PortletTabs
                                   title="Qu'elle est votre besoin ?"
                                   items={[
                                       { title: 'Pack', component: <Contenu /> },
                                       { title: 'Création Graphique', component: <Graphisme /> },
                                       { title: 'Création Web', component: <Web /> }
                                   ]}
                               />
                           </Col>
                       </Row>
                   </div>
               </div>
           </div>
        );
    }
}

export default Essentiels;
