import React, {Component} from 'react';

import InputColorPicker from '/imports/Component/InputColorPicker/InputColorPicker.jsx';


var NewEmployee = ({handleNewEmployee, 
    handleNewEmployeEmailChange,
    handleNewNom,
    handleNewEmployePasswordChange ,
    handleNewEmployeDescriptionChange,
    handleNewEmployeeColorChange,
    newEmployeeEmail,
    newEmployeeDescription,
    newEmployeeColor}) => {

    return <tr>
        <td>
            <input
                className="form-control"
                onChange={handleNewEmployeEmailChange}
                placeholder="Email"
                value={newEmployeeEmail}/>
        </td>
        <td>
            <input
                className="form-control"
                onChange={handleNewNom}
                placeholder="Nom Prénom"/>
        </td>
        <td><InputColorPicker onChange={handleNewEmployeeColorChange} value={newEmployeeColor} /></td>
        <td>
            <a className="btn btn-primary" onClick={handleNewEmployee}>Nouvel employé</a>
        </td>
    </tr>
}

NewEmployee.propTypes = {
    handleNewEmployee: React.PropTypes.func.isRequired,
    handleNewEmployeEmailChange: React.PropTypes.func.isRequired,
    handleNewEmployeeColorChange: React.PropTypes.func.isRequired,
};

export default NewEmployee;