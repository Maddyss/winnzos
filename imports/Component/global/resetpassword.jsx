/**
 * Created by root on 19/08/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Fonction extends Component {
    constructor (props) {
        super (props);
    }
    resetPass(e){
        e.preventDefault();
        let password = this.refs.password.value.trim();

        Accounts.resetPassword(this.props.token, password, function(err) {
            if (err) {
                Bert.alert({title: 'Modification mot de passe échoué !',message :'Désolé la modification de votre mot de passe n\'a pu aboutir.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
            } else {
                Bert.alert({title: 'Modification mot de passe réussi !',message :'Vous disposez maintenant d\'un nouveau mot de passe.', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                FlowRouter.go('/');
            }
        });
    }
    render () {
        return (
            <div className="row" style={{'textAlign':'center'}}>
                <div className="col-md-4 col-md-offset-4">
                    <h2 className="heading-1">Modification du mot de passe</h2>
                    <p className="sub-heading-1">Merci de renseigner les champs suivant :</p>
                    <form method="post" onSubmit={this.resetPass.bind(this)}>
                        <div className="form-field field-password row" id="field_password">
                            <input type="password" name="password" placeholder="Mot de passe" ref="password"/>
                        </div>
                        <div className="form-field field-password row" id="field_password">
                            <input type="password" name="password" placeholder="Confirmation Mot de passe" ref="repassword"/>
                        </div>
                        <div className="form-field field-submit" id="field_submit-cnx">
                            <input type="submit" name="submit-cnx" value="Validation" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}