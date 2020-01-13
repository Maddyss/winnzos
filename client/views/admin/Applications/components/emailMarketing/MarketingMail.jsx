import React from 'react';
import classNames from 'classnames';
import { Row, Button, Panel } from 'react-bootstrap';
import { alertSuccess, alertDanger } from '/imports/Component/global/Alerts';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import UserReactiveComponent from '/imports/Component/global/UserReactiveComponent.jsx';
import { payRendezVous } from '/imports/api/Users';

class MarketingMail extends UserReactiveComponent {
    handleClick = (e) => {
        e.preventDefault();
        /*payRendezVous.callPromise({})
            .then(() => {
                alertSuccess({ title: 'Agenda ajouté à votre profil' });
                FlowRouter.go('campagneEmail');
            })
            .catch(err => alertDanger({ message: err.toString() }));*/
    }
    render() {
        const hasMarketingMail = this.user() ? this.user().hasMarketingMail() : false;
        return (
            <Panel style={{ padding: '1em 0' }}>
                <Row>
                    <img
                        className="img-thumbnail img-circle img-responsive center-block" alt=""
                        src="/front/EmailBulle.png"
                    />
                </Row>
                <Row bsClass="text-center">
                    <h1>
            <span
                className={(classNames('label', hasMarketingMail ? 'label-primary' : 'label-default'))}
                style={{ fontSize: '.5em' }}
            >
              Campagne E-mail
            </span>
                    </h1>
                    {
                        hasMarketingMail ?
                            <div>
                                <Row>
                                    <Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red"><a href="/home_pro/emailMarketing" style={{'color': 'white', 'margingBottom': '10px'}}>En Savoir Plus</a></Button>
                                </Row>
                            </div>
                            :
                            <div>
                                <Row>
                                    <Button type="button" bsSize="sm" bsStyle="info" bsClass="btn btn-circle red"><a href="/home_pro/emailMarketing" style={{'color': 'white', 'margingBottom': '10px'}}>En Savoir Plus</a></Button></Row>
                                <Row>
                                    <Button
                                        type="button"
                                        bsSize="sm" bsStyle="info"
                                        bsClass="btn btn-circle green"
                                        onClick={this.handleClick}
                                    >Bientôt disponible</Button>
                                </Row>
                            </div>
                    }
                </Row>
            </Panel>
        );
    }
}

export default MarketingMail;
