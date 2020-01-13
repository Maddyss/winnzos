import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default ResetPassword = React.createClass({
    componentDidMount() {
        Modules.client.resetPassword( { form: "#reset-password" } );
        $('body').addClass('login');
    },
    handleSubmit( event ) {
        event.preventDefault();
    },
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <h4 className="page-header">Reset Mot de passe</h4>
                    <form id="reset-password" className="reset-password" onSubmit={this.handleSubmit}>
                        <p className="alert alert-info"></p>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nouveau mot de passe</label>
                            <input type="password" name="newPassword" className="form-control" placeholder="New Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Retaper votre mot de passe</label>
                            <input type="password" name="repeatNewPassword" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Reset Password &amp; Login" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});