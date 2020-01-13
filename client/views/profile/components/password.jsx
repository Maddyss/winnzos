import React, {Component} from 'react';

    var Password = (props) => {

        var {updateFormValue,updatePassword, verifyPasswordMatch} = props;

        return  <form role="form" onSubmit={updatePassword}>
                    <div className="form-group">
                        <label className="control-label">Mot de passe</label>
                        <input type="password" className="form-control" value={props.oldPassword} onChange={(e)=>updateFormValue(e,"oldPassword")}/> 
                    </div>
                    <div className="form-group">
                        <label className="control-label">Nouveau mot de passe</label>
                        <input type="password" className="form-control" value={props.newPassword} onChange={(e)=>updateFormValue(e,"newPassword")} onBlur={(e)=>verifyPasswordMatch(e)}/> 
                    </div>
                    <div className="form-group">
                        <label className="control-label">Retaper le mot de passe</label>
                        <input type="password" 
                            className="form-control" 
                            value={props.confirmNewPassword} 
                            onChange={(e)=>updateFormValue(e,"confirmNewPassword")} 
                            onBlur={(e)=>verifyPasswordMatch(e)}/> 
                    </div>
                    <div className="margin-top-10">
                        {props.errorMessage? <div className="form-group has-error">
                            <p className="help-block">
                                <i className="fa fa-exclamation" aria-hidden="true"></i> {props.errorMessage}
                            </p>
                        </div>
                        :null}
                        <button type="submit" className="btn green"> Modification mot de passe </button>
                        <a href="/home_pro"><button type="button" id="register-back-btn" className="btn green btn-outline">Retour</button></a>
                    </div>
                </form>

  }

    Password.propTypes = {
        updateFormValue : React.PropTypes.func.isRequired,
        updatePassword : React.PropTypes.func.isRequired,
        verifyPasswordMatch : React.PropTypes.func.isRequired,
    };

    export default Password;