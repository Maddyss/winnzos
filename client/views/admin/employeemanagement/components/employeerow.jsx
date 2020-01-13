import React, {Component} from 'react';

import InputColorPicker from '/imports/Component/InputColorPicker/InputColorPicker.jsx';

var EmployeeRow = ({username,emails,handleDeleteEmployee,handleSeeEmployee,_id,color}) => {
    return <tr>
        <td>
            {emails[0].address}
        </td>
        <td>
            {username}
        </td>
        <td>
            <InputColorPicker onChange={()=>1} value={color} />
        </td>
        <td>
            <a className="btn btn-primary" onClick={()=>handleSeeEmployee(_id)}>Voir</a>
            <a className="btn btn-primary" onClick={()=>handleDeleteEmployee(_id)}>Supprimer</a>
        </td>
    </tr>
}

EmployeeRow.propTypes = {
    username: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired,
    handleDeleteEmployee : React.PropTypes.func.isRequired,
    handleSeeEmployee : React.PropTypes.func.isRequired,
};

export default EmployeeRow;