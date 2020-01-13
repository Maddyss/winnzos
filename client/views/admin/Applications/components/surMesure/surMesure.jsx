import React from 'react';
import classNames from 'classnames';
import { Row, Button, Panel } from 'react-bootstrap';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';

class SurMesure extends UserReactiveComponent {
    render() {
        return (
            <Panel style={{ padding: '1em 0' }}>
                <Row>
                    <img
                        className="img-thumbnail img-circle img-responsive center-block" alt=""
                        src="/front/SurMesureBulle.png"
                    />
                </Row>
                <Row bsClass="text-center">
                    <h1>
                        <span
                            className='label label-default'
                            style={{ fontSize: '.5em' }}
                        >
                          Demande sur mesure
                        </span>
                    </h1>
                        <div>
                            <Row>
                                <Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red"><a href="/home_pro/surMesure" style={{'color': 'white', 'margingBottom': '10px'}}>En Savoir Plus</a></Button>
                            </Row>
                        </div>
                </Row>
            </Panel>
        );
    }
}

export default SurMesure;
