import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import '/imports/api/Users';
import MenuItem from './components/MenuItem/MenuItem.jsx';
import Tracker from 'tracker-component';

class MenuDOM extends Tracker.Component {
  constructor(props){
    super(props);
  }
    componentDidMount(){
      this.autorun(()=>{
          Meteor.user();
          this.forceUpdate();
      });
  }
  user() {
    return Meteor.user();
  }
  render() {
    var isEmployee = Meteor.user().isEmployee();
    const hasRendezVous = this.user() ? this.user().hasRendezVous() : false;
    const hasEmployeeManagement = this.user() ? this.user().hasEmployeeManagement() : false;
    const hasChatInstant = this.user() ? this.user().hasChat() : false;
    return (
      <div className="page-sidebar-wrapper">
        <div className="page-sidebar navbar-collapse collapse">
          <ul
            className="page-sidebar-menu page-header-fixed "
            style={{ paddingTop: 20 }}
          >
            <MenuItem
              isVisible={!isEmployee}
              path="/home_pro"
              title="Home"
              icon="icon-home"
            />
            <MenuItem
                isVisible={!isEmployee}
                path={FlowRouter.path('MyOffer')}
                title="Mon abonnement"
                icon="fa fa-star"
            />
            <MenuItem
                isVisible={!isEmployee}
                path={FlowRouter.path('OrdersListPage')}
                title="Mes commandes"
                icon="fa fa-euro"
            />
            <MenuItem
              isVisible={!isEmployee}
              path={FlowRouter.path('Applications')}
              title="Applications"
              icon="icon-book-open"
            />
            {
              hasRendezVous || isEmployee ?
                <MenuItem
                  path={FlowRouter.path('Agenda')}
                  title="Agenda"
                  icon="icon-calendar"
                /> : null
            }
            {
              hasEmployeeManagement ?
                <MenuItem
                  isVisible={!isEmployee}
                  path={FlowRouter.path('EmployeeManagement')}
                  title="Gestion des Employés"
                  icon="icon-people"
                /> : null
            }
            {
              hasChatInstant ?
                <MenuItem
                  isVisible={!isEmployee}
                  path={FlowRouter.path('ChatInstant')}
                  title="Communication en Temps Réel"
                  icon="icon-envelope"
                /> : null
            }
            <MenuItem
                isVisible={!isEmployee}
                path={FlowRouter.path('Essentiels')}
                title="Essentiels"
                icon="fa fa-check"
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuDOM;
