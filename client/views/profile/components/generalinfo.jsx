import SelectRegion  from '/imports/Component/select/selectRegion.jsx';
import SelectActivite  from '/imports/Component/select/selectActivite.jsx';
import React, {Component} from 'react';

    var GeneralInfo = (props) => {
        var {isEmployee,updateFormValue,handleFormSubmit} = props;

        return  <form role="form" onSubmit={handleFormSubmit}>                                                   
                    <div>
                    {!isEmployee ? 
                        <div>
                            <div className="form-group">
                                <label className="control-label">Titre publication (obligatoire)</label>
                                <input type="text" placeholder="Winnzos service informatique " className="form-control" value={props.titreContact} onChange={(e)=>updateFormValue(e,"titreContact")} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Nom de la Société (obligatoire)</label>
                                <input type="text" placeholder="Winnzos" className="form-control" value={props.companyName} onChange={(e)=>updateFormValue(e,"companyName")} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">E-mail de contact</label>
                                <input type="text" placeholder="contact@winnzos.fr" className="form-control" value={props.email} onChange={(e)=>updateFormValue(e,"email")} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">N° Téléphone de contact</label>
                                <input type="tel" placeholder="0569758463" className="form-control" value={props.phoneNumber} onChange={(e)=>updateFormValue(e,"phoneNumber")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Ville (obligatoire)</label>
                                <input type="text" placeholder="Paris" className="form-control" value={props.city} onChange={(e)=>updateFormValue(e,"city")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Code-Postal (obligatoire)</label>
                                <input type="number" placeholder="75000" className="form-control" value={props.postalCode} onChange={(e)=>updateFormValue(e,"postalCode")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Adresse (obligatoire)</label>
                                <input type="text" placeholder="8 rue georges Pompidou" className="form-control" value={props.address} onChange={(e)=>updateFormValue(e,"address")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Activité</label>
                                <SelectActivite activiteId={props.activityId} retour={false} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Région</label>
                                <SelectRegion regionId={props.stateId} retour={false} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Fonction dans l'entreprise (obligatoire)</label>
                                <input type="text" placeholder="Dirigeant" className="form-control" value={props.companyRole} onChange={(e)=>updateFormValue(e,"companyRole")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Site web</label>
                                <input type="text" placeholder="http://winnzos.fr" className="form-control" value={props.webSite} onChange={(e)=>updateFormValue(e,"webSite")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Facebook</label>
                                <input type="text" placeholder="http://facebook.fr/winnzos" className="form-control" value={props.facebookLink} onChange={(e)=>updateFormValue(e,"facebookLink")} /> 
                            </div>
                            <div className="form-group">
                                <label className="control-label">Twitter</label>
                                <input type="text" placeholder="http://twitter.fr/winnzos" className="form-control" value={props.twitterLink} onChange={(e)=>updateFormValue(e,"twitterLink")} />
                            </div>
                        </div>
                        :null}
                        <div className="form-group">
                            <label className="control-label">Descriptions</label>
                            <textarea className="form-control" id="description" rows="3" placeholder="Réaliser une description simple de vous qui sera publiée sur votre profil." />
                        </div>
                    </div> 
                    <div className="margiv-top-10">
                        <button type="submit" className="btn green"> Sauvegarder </button>
                        <a href="/home_pro"><button type="button" id="register-back-btn" className="btn green btn-outline">Retour</button></a>
                    </div>
                </form>

  }

    GeneralInfo.propTypes = {
        isEmployee: React.PropTypes.bool.isRequired,
        updateFormValue : React.PropTypes.func.isRequired,
    };

    export default GeneralInfo;