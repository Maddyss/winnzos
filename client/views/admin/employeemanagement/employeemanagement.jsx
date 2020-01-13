/**
 * Created by raphael on 09/11/16.
 */

import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import randomColor from "randomcolor";
import Tracker from 'tracker-component';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {createEmployee, deleteEmployee} from '/imports/api/Users/methods.js';
import {Accounts} from 'meteor/accounts-base';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import EmployeeTable from "./components/employeetable.jsx";
import DetailsEmployee from "./components/employeeDetails.jsx";

import './employeemanagement.scss';



export default class EmployeeManagement extends Tracker.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmployeeEmail: '',
            newName: '',
            newEmployeePassword: '',
            newEmployeeColor : this.newColor(),
            employeeIdCurrent : null
        }
        this.handleNewEmployee = this.handleNewEmployee.bind(this);
        this.handleNewNom = this.handleNewNom.bind(this);
        this.handleNewEmployeEmailChange = this.handleNewEmployeEmailChange.bind(this);
        this.handleNewEmployeeColorChange = this.handleNewEmployeeColorChange.bind(this);
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
        this.handleSeeEmployee = this.handleSeeEmployee.bind(this);

        this.subscribe('Users.employees');

        this.autorun(() => {
            this.setState({
                employees: Meteor.users
                    .find({companyId: Meteor.user()._id})
                    .fetch()
            });
        });
    }

    newColor(){
        return randomColor({luminosity: 'light'});
    }

    handleNewEmployee() {
        var options = {
            username: this.state.newName,
            email: this.state.newEmployeeEmail,
            color : this.state.newEmployeeColor,
            companyId: Meteor
                .user()
                ._id
        }

        console.log("Creating a new employee", options);

        createEmployee
            .callPromise(options)
            .then(() => {
                alertSuccess({title: "Employé créé"});
                this.setState({
                    newEmployeeEmail: '',
                    newName: '',
                    newEmployeePassword: '',
                    newEmployeeDescription: '',
                    newEmployeeColor : this.newColor()
                });
            })
            .catch((err) => {
                console.log(err.reason);
                alertDanger(err.message);
            });
    }

    handleNewEmployeEmailChange(e) {
        this.setState({newEmployeeEmail: e.target.value})
    }


    handleDeleteEmployee(employeeId) {
        swal({
            title: 'Etes vous sûr de vouloir supprimé cet employé ?',
            text: 'Ceci sera définitif aucun retour possible.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui !',
            cancelButtonText: 'Non !'
        }).then(function() {

            deleteEmployee.callPromise({userId: employeeId}).then(()=> {
                alertSuccess({title: 'Employé supprimé'});
            });

        });
       /* if (confirm("Êtes vous sûr de vouloir supprimer cet employé?")) {
            deleteEmployee.callPromise({userId: employeeId}).then(()=> {
                alertSuccess({title: 'Employé supprimé'});
            });
        }*/
    }

    handleSeeEmployee(employeeId) {
        this.setState({
            employeeIdCurrent: employeeId
        });
    }

    handleNewEmployeeColorChange(newColor){
        this.setState({newEmployeeColor: newColor})
    }
    handleNewNom(e){
        this.setState({newName: e.target.value})
    }

    render() {
        return (
            <div className="employee-management">
                <h3>Gestion des employés</h3>
                <p>Utilisez cette application pour gérer vos employés</p>
                <EmployeeTable
                    {...this.state}
                    handleNewEmployee={this.handleNewEmployee}
                    handleNewNom={this.handleNewNom}
                    handleNewEmployeEmailChange={this.handleNewEmployeEmailChange}
                    handleDeleteEmployee={this.handleDeleteEmployee}
                    handleSeeEmployee={this.handleSeeEmployee}
                    newEmployeeColor={this.state.newEmployeeColor}
                    handleNewEmployeeColorChange={this.handleNewEmployeeColorChange}
                />
                <DetailsEmployee employeId={this.state.employeeIdCurrent} employee={this.state.employees} />
            </div>
        )
    }
}
