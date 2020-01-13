import React, {Component} from 'react';
import moment from 'moment';


    var CompanyInfo = (props) => {
        var {updateFormValue,changeCompteSocieteComplementaire} = props;

        return    <div className="tab-pane" id="tab_1_3">
                    <form role="form" onSubmit={changeCompteSocieteComplementaire}>
                        <div className="form-group">
                            <label className="control-label">Siret</label>
                            <input type="text" placeholder="010203040506" className="form-control" value={props.siret} onChange={(e)=>updateFormValue(e,"siret")}/> 
                        </div>
                        <div className="form-group">
                            <label className="control-label">Capital</label>
                            <input type="text" placeholder="1 000" className="form-control" value={props.capital} onChange={(e)=>updateFormValue(e,"capital")}/> 
                        </div>
                        <div className="form-group">
                            <label className="control-label">Forme Juridique</label>
                            <input type="text" placeholder="SASU" className="form-control"  value={props.formeJuridique} onChange={(e)=>updateFormValue(e,"formeJuridique")}/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Effectif</label>
                            <input type="text" placeholder="5" className="form-control" value={props.effectif} onChange={(e)=>updateFormValue(e,"effectif")}/> 
                        </div>
                        <div className="form-group">
                            <label className="control-label">Date de création</label>
                            <input type="text" placeholder="01/07/2016" className="form-control" value={props.dateCreation} onChange={(e)=>updateFormValue(e,"dateCreation")}/> 
                        </div>
                        <div className="margiv-top-10">
                            <button type="submit" className="btn green"> Sauvegarder </button>
                            <a href="/home_pro"><button type="button" id="register-back-btn" className="btn green btn-outline">Retour</button></a>
                        </div>
                    </form>
                </div>

  }

    CompanyInfo.propTypes = {
        changeCompteSocieteComplementaire : React.PropTypes.func.isRequired,
        updateFormValue : React.PropTypes.func.isRequired,
    };

    export default CompanyInfo;