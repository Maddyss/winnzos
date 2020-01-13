import React, {Component} from 'react';

import NewEmployee from "./newemployee.jsx";
import EmployeeRow from "./employeerow.jsx";

export default (props) => {
    return <table className="table">
        <thead>
            <tr>
                <td>Email</td>
                <td>Nom Prénom</td>
                <td>Couleur</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            {
                props.employees.map(e=><EmployeeRow key={e._id} {...e}
                                                    handleDeleteEmployee={props.handleDeleteEmployee} handleSeeEmployee={props.handleSeeEmployee} />)
            }
            <NewEmployee {...props}/>
        </tbody>
    </table>
}