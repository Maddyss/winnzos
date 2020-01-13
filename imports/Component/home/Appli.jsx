import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import EmployeeManagement from '/client/views/admin/Applications/components/employeemanagement/index.jsx';
import MarketingMail from '/client/views/admin/Applications/components/emailMarketing/MarketingMail.jsx';
import CreationPDF from '/client/views/admin/Applications/components/creationPDF/creationPDF.jsx';
import ChatInstant from '/client/views/admin/Applications/components/chatInstant/chatInstant.jsx';

const Applications = () => (
    <Grid>
        <Row>
            <Col md={4}>
                <Panel style={{ padding: '1em 0' }}>
                    <Row>
                        <img
                            className="img-thumbnail img-circle img-responsive center-block" alt=""
                            src="/front/EmployeeBulle.png" width="40%" height="40%"
                        />
                    </Row>
                    <Row bsClass="text-center">
                        <h1>
                            <span className="label label-primary" style={{ fontSize: '.5em' }}>
                              Gestion Employée
                            </span>
                        </h1>
                        <div>
                            <Row>
                                <a href="/employee" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a>
                            </Row>
                        </div>
                    </Row>
                </Panel>
            </Col>
            <Col md={4}>
                <Panel style={{ padding: '1em 0' }}>
                    <Row>
                        <img
                            className="img-thumbnail img-circle img-responsive center-block" alt=""
                            src="/pro/Rendez-vous.png" width="40%" height="45%"
                        />
                    </Row>
                    <Row bsClass="text-center">
                        <h1>
                            <span className="label label-primary" style={{ fontSize: '.5em' }}>
                              Rendez-vous
                            </span>
                        </h1>
                        <div>
                            <Row>
                                <a href="/rendezvous" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a>
                            </Row>
                        </div>
                    </Row>
                </Panel>
            </Col>
            <Col md={4}>
                <Panel style={{ padding: '1em 0' }}>
                    <Row>
                        <img
                            className="img-thumbnail img-circle img-responsive center-block" alt=""
                            src="/front/EmailBulle.png" width="40%" height="40%"
                        />
                    </Row>
                    <Row bsClass="text-center">
                        <h1>
                            <span className="label label-primary" style={{ fontSize: '.5em' }}>
                              Campagne E-Mail
                            </span>
                        </h1>
                        <div>
                            <Row>
                                <a href="/emailMarketing" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a>
                            </Row>
                        </div>
                    </Row>
                </Panel>
            </Col>
            <Col md={4}>
                <Panel style={{ padding: '1em 0' }}>
                    <Row>
                        <img
                            className="img-thumbnail img-circle img-responsive center-block" alt=""
                            src="/front/avatar-default.png" width="40%" height="40%"
                        />
                    </Row>
                    <Row bsClass="text-center">
                        <h1>
                            <span className="label label-primary" style={{ fontSize: '.5em' }}>
                              Devis, Facture
                            </span>
                        </h1>
                        <div>
                            <Row>
                                <a href="/devisFacture" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a>
                            </Row>
                        </div>
                    </Row>
                </Panel>
            </Col>
            <Col md={4}>
                <Panel style={{ padding: '1em 0' }}>
                    <Row>
                        <img
                            className="img-thumbnail img-circle img-responsive center-block" alt=""
                            src="/front/ConversationBulle.png" width="40%" height="40%"
                        />
                    </Row>
                    <Row bsClass="text-center">
                        <h1>
                            <span className="label label-primary" style={{ fontSize: '.5em' }}>
                              Conversation Instantannée
                            </span>
                        </h1>
                        <div>
                            <Row>
                                <a href="/chatInstant" style={{'color': 'white', 'margingBottom': '10px'}}><Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red">En Savoir Plus</Button></a>
                            </Row>
                        </div>
                    </Row>
                </Panel>
            </Col>
        </Row>
    </Grid>
);

export default Applications;
