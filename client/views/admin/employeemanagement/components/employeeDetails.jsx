import React, {Component} from 'react';
import { Row, Button, Panel } from 'react-bootstrap';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';

export default (props) => {
    const { employeId } = props;
    let employee = props.employee.filter(function(res) {
        return employeId === res._id;
    });
    if(!employeId){
        return <div></div>;
    }
    return (
    <div>
        <Row>
            <div className="col-md-4 pro-img">
                <ImagesPro proId={employeId} />
            </div>
            <div className="col-md-6">
                <div dangerouslySetInnerHTML={{__html: employee[0].description}}></div>
            </div>
        </Row>
    </div>
    );
}