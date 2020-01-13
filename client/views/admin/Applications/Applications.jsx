import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import RendezVous from './components/RendezVous/RendezVous.jsx';
import EmployeeManagement from './components/employeemanagement/index.jsx';
import MarketingMail from './components/emailMarketing/MarketingMail.jsx';
import CreationPDF from './components/creationPDF/creationPDF.jsx';
import ChatInstant from './components/chatInstant/chatInstant.jsx';
import SurMesure from './components/surMesure/surMesure.jsx';

const Applications = () => (
  <Grid>
    <Row>
      <Col md={4}>
        <RendezVous />
      </Col>
        <Col md={4}>
            <ChatInstant />
        </Col>
        <Col md={4}>
            <EmployeeManagement />
        </Col>
        <Col md={4}>
            <MarketingMail />
        </Col>
        <Col md={4}>
            <CreationPDF />
        </Col>
        <Col md={4}>
            <SurMesure />
        </Col>
    </Row>
  </Grid>
);

export default Applications;
