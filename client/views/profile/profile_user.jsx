import React, { Component } from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor'
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import trumbowyg from 'trumbowyg';
import {alertSuccess, alertDanger} from '/imports/Component/global/Alerts';
import {Entreprise, FichePro} from '/imports/api/collection/collection';
import { Images } from '/imports/api/collection/collection-images';

import PortletTabs from '/imports/Component/PortletTabs/PortletTabs.jsx';
import GeneralInfo from "./components/generalinfo.jsx";
import CompanyInfo from "./components/companyinfo.jsx";
import ProfilePicture from "./components/profilepicture.jsx";
import Password from "./components/password.jsx";
import ImagesPro from "/imports/Component/resultPro/imagesPro.jsx";

import '/imports/Sass/pages/profile.scss';
import '/imports/stylesheet/editors/trumbowyg.min.css';

import {updateEmployeeDescription} from '/imports/api/Users/methods.js';

export default class PageProfileSettings extends Tracker.Component{
    constructor(props) {
        super(props);
         this.state = {
            ready: false,
        }

        this.sub1 = this.subscribe('infoSociete.Modification');
        this.sub2 = this.subscribe('fichePro.modification');
        this.sub3 = this.subscribe('get.images.pro', Meteor.userId());
        this.sub4 =  this.subscribe('Users.employee');      

        Tracker.autorun((comp)=>{
            if(this.isReady()){
                this.setState({
                    ready:true,
                    titreContact : (this.infoSociete().titreContact ? this.infoSociete().titreContact : (Object.keys(this.ficheSocieteFront()).length > 0 ?  this.ficheSocieteFront().nomCommercial : undefined )),
                    companyName:this.infoSociete().SocieteName,
                    email:this.infoSociete().mailContact,
                    phoneNumber: this.infoSociete().telContact,
                    city: this.infoSociete().AdresseSiege ? (this.infoSociete().AdresseSiege.Ville ? this.infoSociete().AdresseSiege.Ville : (Object.keys(this.ficheSocieteFront()).length> 0 ?  this.ficheSocieteFront().Adresse.Ville : undefined )) : undefined,
                    postalCode: this.infoSociete().AdresseSiege ? (this.infoSociete().AdresseSiege.ZipCode? this.infoSociete().AdresseSiege.ZipCode : (Object.keys(this.ficheSocieteFront()).length > 0 ?  this.ficheSocieteFront().Adresse.ZipCode : undefined )) : undefined,
                    address: this.infoSociete().AdresseSiege ? (this.infoSociete().AdresseSiege.Voie ? this.infoSociete().AdresseSiege.Voie : (Object.keys(this.ficheSocieteFront()).length > 0 ?  this.ficheSocieteFront().Adresse.Voie : undefined )) : undefined,
                    activityId : this.ficheSocieteFront().activiteId,
                    stateId: this.ficheSocieteFront().regionId,
                    companyRole: this.infoSociete().roleEntreprise,
                    webSite:this.infoSociete().siteWeb,
                    facebookLink: this.infoSociete().lienFacebook,
                    twitterLink: this.infoSociete().lienTwitter,
                    siret: this.infoSociete().siret ? this.infoSociete().siret : this.ficheSocieteFront().siret,
                    capital: this.infoSociete().capital,
                    formeJuridique: this.infoSociete().formeJuridique,
                    effectif: this.infoSociete().effectif,
                    dateCreation: this.infoSociete().dateCreation,
                    oldPassword:"",
                    newPassword:"",
                    confirmNewPassword:"",
                    description: Meteor.user().isEmployee()? Meteor.user().description : this.infoSociete().descriptions
                });
                comp.stop();
            }
        })  

        this.isReady = this.isReady.bind(this);
        this.ficheSocieteFront = this.ficheSocieteFront.bind(this);
        this.infoSociete = this.infoSociete.bind(this);
        this.imagesPro = this.imagesPro.bind(this);
        this.changeCompteSociete = this.changeCompteSociete.bind(this);
        this.changeCompteSocieteComplementaire = this.changeCompteSocieteComplementaire.bind(this);
        this.verifDonneCorrect = this.verifDonneCorrect.bind(this);
        this.verifDonneSupCorrect = this.verifDonneSupCorrect.bind(this);
        this.setImage = this.setImage.bind(this);
        this.newImage = this.newImage.bind(this);
        this.photoProfil = this.photoProfil.bind(this);
        this.updateEmployeeDescription = this.updateEmployeeDescription.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.updateFormValue = this.updateFormValue.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.verifyPasswordMatch = this.verifyPasswordMatch.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    isReady(){
        return this.sub1.ready() && this.sub2.ready() && this.sub3.ready() && this.sub4.ready();
    }

    componentDidMount () {
        $.trumbowyg.svgPath = '/icons/editors/icons.svg';
        $('#description').trumbowyg({
            btns: [
                ['bold', 'italic', 'underline', 'strikethrough'],
                ['strong', 'em'],
                'btnGrp-justify',
                'btnGrp-lists',
                ['fullscreen']
            ],
            lang: 'fr'
        }).on('tbwchange',()=>{
            this.setState({
                description: $('#description').trumbowyg('html'),
            });
        });

        $('#description').trumbowyg('html', this.state.description);

        Tracker.autorun((comp)=>{
            var ready = this.isReady();
            if(ready){
                comp.stop();
                    $('#description').trumbowyg('html', this.state.description);
                }
         });
        
        this.autorun(() => {
            Images.findOne({'userId': Meteor.userId()});
            this.forceUpdate();
        });
    }

    ficheSocieteFront() {
        let fiche = FichePro.findOne({});
        if(fiche)
            return fiche;
        else
            return [];
    }

    infoSociete() {
        let entreprise = Entreprise.findOne({});
        if ( entreprise )
        {
            return entreprise;
        }
        else
            return [];
    }

    imagesPro() {
        let linkImages = Images.findOne({'userId': Meteor.userId()});
        if ( linkImages )
        {
            return linkImages.link();
        }
        else
            return [];
    }

    changeCompteSociete(event){
        event.preventDefault();

        let ObjetSociete = {};

        ObjetSociete.UserId = Meteor.userId();
        ObjetSociete.titreContact = this.state.titreContact? this.state.titreContact.trim():"";
        ObjetSociete.SocieteName = this.state.companyName? this.state.companyName.trim():"";
        ObjetSociete.AdresseSiege = {
            ville: this.state.city?this.state.city.trim():"",
            voie: this.state.address?this.state.address.trim():"",
            zipcode: this.state.postalCode?this.state.postalCode.trim():""
        };       
        ObjetSociete.roleEntreprise = this.state.companyRole?this.state.companyRole.trim():"";
        ObjetSociete.siteWeb = this.state.webSite?this.state.webSite.trim():"";
        ObjetSociete.lienFacebook = this.state.facebookLink?this.state.facebookLink.trim():"";
        ObjetSociete.lienTwitter = this.state.twitterLink?this.state.twitterLink.trim():"";
        ObjetSociete.telContact = this.state.phoneNumber?this.state.phoneNumber.trim():"";
        ObjetSociete.mailContact = this.state.email?this.state.email.trim():"";

        if($('.activite option:selected').val() !== '' )
           {
               ObjetSociete.activiteId = $('.activite option:selected').val();
           }
        else
           {
               ObjetSociete.activiteId = '';
           }

        if($('.activite option:selected').text().length > 0 )
            {
                ObjetSociete.activiteName = $('.activite option:selected').text();
            }
        else
            {
                ObjetSociete.activiteName = '';
            }

        if(parseInt($('.region option:selected').val()) > 0 )
            {
                ObjetSociete.regionId = parseInt($('.region option:selected').val());
            }
        else
            {
                ObjetSociete.regionId = 0;
            }

        if($('.region option:selected').text().length > 0 )
            {
                ObjetSociete.regionName = $('.region option:selected').text();
            }
        else
            {
                ObjetSociete.regionName = '';
            }

        ObjetSociete.fichePro = this.ficheSocieteFront()._id?this.ficheSocieteFront()._id:"";                   
        ObjetSociete.Certifie = false;
        ObjetSociete.descriptions = this.state.description?this.state.description.trim():"";          

        let valid = this.verifDonneCorrect(ObjetSociete);

        if((this.infoSociete().SocieteName !== undefined || this.infoSociete().Siret !== undefined) && valid)
        {
            Meteor.call("Methods.update.fichePro", ObjetSociete.fichePro);
            Meteor.call("update.Societe.methods", {ObjetSociete}, function (err) {
                if (err)
                    Bert.alert({title: 'Enregistrement impossible',message :'Erreur dans les données fournies .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                else
                    Bert.alert({title: 'Enregistrement réussi', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
            });
        }else if(valid){
            Meteor.call("Methods.update.fichePro", ObjetSociete.fichePro);
            Meteor.call("insert.Societe.methods", {ObjetSociete}, function (err) {
                if (err)
                    Bert.alert({title: 'Enregistrement impossible',message :'Erreur dans les données fournies .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                else
                {
                    Bert.alert({title: 'Enregistrement réussi', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                }

            });
        }
    }

    changeCompteSocieteComplementaire(event){
        event.preventDefault();

        let ObjetSociete = {};
        ObjetSociete.UserId = Meteor.userId();
        ObjetSociete.Capital = parseInt(this.state.capital) > 0 ? parseInt(this.state.capital)  : 0;
        ObjetSociete.Effectif = parseInt(this.state.effectif) > 0 ? parseInt(this.state.effectif)  : 1;
        ObjetSociete.DateCreation = this.state.dateCreation ? moment(new Date(this.state.dateCreation)).format('DD/MM/YYYY')  : moment(new Date().getTime()).format('DD/MM/YYYY');
        ObjetSociete.FormeJuridique = this.state.formeJuridique ? this.state.formeJuridique.trim()  : '';
        ObjetSociete.Siret = this.state.siret ? this.state.siret.trim()  : '';

        let valid = this.verifDonneSupCorrect(ObjetSociete);
        if(valid){
            if(this.infoSociete().length > 0)
            {
                Meteor.call("update.Societe.InfoComplementaire.methods", {ObjetSociete}, function (err) {
                    if (err)
                        Bert.alert({title: 'Enregistrement impossible',message :'Erreur dans les données fournies .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                    else
                        Bert.alert({title: 'Enregistrement réussi', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                });
            }else{
                Meteor.call("insert.Societe.InfoComplementaire.methods", {ObjetSociete}, function (err) {
                    if (err)
                        Bert.alert({title: 'Enregistrement impossible',message :'Erreur dans les données fournies .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                    else
                    {
                        Bert.alert({title: 'Enregistrement réussi', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                    }
                });
            }
        }
    }

    verifDonneCorrect(Societe){
        let valid = true;
        let textErreur = '';
        let regexEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        let regexZipCode =  /^[0-9]{5,5}$/i;
        let regexUrl =  /^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/i;
       
        if(Societe.mailContact !== '' && !regexEmail.test(Societe.mailContact))
        {
            textErreur = "Adresse E-mail incorrect. </br>";
            valid = false;
        }
        if(Societe.AdresseSiege.zipcode !== '' && !regexZipCode.test(Societe.AdresseSiege.zipcode)){
            textErreur += "Code-Postal incorrect. </br>";
            valid = false;
        }
        if(Societe.siteWeb !== '' && !regexUrl.test(Societe.siteWeb)){
            textErreur += "Le lien du site web est incorrect. </br>";
            valid = false;
        }
        if(Societe.lienFacebook !== '' && !regexUrl.test(Societe.lienFacebook)){
            textErreur += "Le lien facebook est incorrect. </br>";
            valid = false;
        }
        if(Societe.lienTwitter !== '' && !regexUrl.test(Societe.lienTwitter)){
            textErreur += "Le lien Twitter est incorrect. </br>";
            valid = false;
        }
        if(!Match.test(Societe.titreContact, String) && Societe.titreContact.length < 250)
        {
            textErreur = "Titre de publication incorrect. </br>";
            valid = false;
        }
        if(!Match.test(Societe.SocieteName, String) && Societe.SocieteName.length < 50)
        {
            textErreur = "Nom de la société incorrect. </br>";
            valid = false;
        }
        if(!Match.test(Societe.AdresseSiege.voie, String) && Societe.AdresseSiege.voie.length < 255)
        {
            textErreur = "Adresse incorrect. </br>";
            valid = false;
        }
        if(Societe.roleEntreprise === '' && !Match.test(Societe.roleEntreprise, String) && Societe.roleEntreprise.length < 250)
        {
            textErreur = "Fonction dans l'entreprise incorrect. </br>";
            valid = false;
        }
        if(Societe.descriptions !== '' && !Match.test(Societe.descriptions, String))
        {
            textErreur = "Descriptions incorrect. </br>";
            valid = false;
        }
        if(!valid)
        {
            Bert.alert({title: 'Enregistrement impossible',message :textErreur, type: 'danger', style: 'fixed-top', icon: 'fa-exclamation-triangle', hideDelay: 70000});
        }
        return valid;
    }

    verifDonneSupCorrect(Societe){
        let valid = true;
        let regexDate= /^\d?\d\/\d?\d\/\d\d(\d\d)?$/;

        if(! regexDate.test(this.state.dateCreation)){
            textErreur = "Date de création incorrect. </br>";
            valid = false;
        }      

        if(!valid)
        {
            Bert.alert({title: 'Enregistrement impossible',message :textErreur, type: 'danger', style: 'fixed-top', icon: 'fa-exclamation-triangle', hideDelay: 70000});
        }
        return valid;
    }

    setImage(e){
        e.preventDefault();
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            Images.insert ({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic',
                onStart: function (error) {
                    if(error){
                        Bert.alert({title: 'Erreur lors du téléchargement !',message :'Le fichier doit être inférieur à 10MB.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                        console.log(error.reason);
                    }
                },
                onUploaded: function (error) {
                    if(error){
                        Bert.alert({title: 'Erreur lors du téléchargement !',message :'Le fichier doit être inférieur à 10MB.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                        console.log(error.reason);
                    }
                    else{
                        Bert.alert({title: 'Le fichier a correctement était téléchargé !',message :'', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                    }
                }
            });
        }
    }

    newImage(e){
        e.preventDefault()
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            let idImages = Images.findOne({'userId': Meteor.userId()})._id;
            Meteor.call("Methods.images.pro.remove",idImages, function(err){ if(err)console.log(err.reason); });
            Images.insert ({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic',
                onStart: function (error) {
                    if(error){
                        Bert.alert({title: 'Erreur lors du téléchargement !',message :'Le fichier doit être inférieur à 10MB.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                        console.log(error.reason);
                    }
                },
                onUploaded: function (error) {
                    if(error){
                        Bert.alert({title: 'Erreur lors du téléchargement !',message :'Le fichier doit être inférieur à 10MB.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                        console.log(error.reason);
                    }
                    else{
                        Bert.alert({title: 'Le fichier a correctement était téléchargé !',message :'', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                    }
                }
            });
        }
    }

    photoProfil(){
        return (
            <div>
                <div className="row">
                    <img src={ this.imagesPro() } style={{'maxWidth':'600px', 'maxHeight':'600px'}} />
                </div>
                <div className="row" style={{'paddingTop':'30px'}}>
                    <input type="file" name="Changer Photo Profil" onChange={this.newImage.bind(this)}/>
                </div>
            </div>
        )
    }

    updateEmployeeDescription(){
        var description = this.state.description;
        updateEmployeeDescription.callPromise({description}).then(()=>{
            alertSuccess({title:'Description mise à jour'});
        }).catch(()=>{
            alertDanger({title:'Impossible de mettre la description à jour'});
        });
    }

    handleFormSubmit(e){
        e.preventDefault();
        if(Meteor.user().isEmployee()){
            this.updateEmployeeDescription();
        }else{
            this.changeCompteSociete(e);
        }
    }
    
    updateFormValue(event,key){
        var modifier = {
            [key] : event.target.value
        };
        this.setState(modifier);
    }

    verifyPasswordMatch(e){
        e.preventDefault();
        if(!this.state.confirmNewPassword || !this.state.newPassword){
            return false;
        }
        if(this.state.confirmNewPassword != this.state.newPassword){
            this.setState({errorMessage:"Les nouveaux mot de passe ne correspondent pas."});
            return false;
        } 
        else{
            this.setState({errorMessage:""});            
            return true;
        }
    }

    updatePassword(e){
        if(this.verifyPasswordMatch(e)){
            Accounts.changePassword(this.state.oldPassword, this.state.newPassword, (err)=>{
                if(!err){
                    alertSuccess({title:'Mot de passe mis à jour'});
                }
                else{
                    alertDanger({title:err});
                }
            });
        }
        else{
             Bert.alert({title: 'Enregistrement impossible',message :"Les nouveaux mot de passe ne correspondent pas.", type: 'danger', style: 'fixed-top', icon: 'fa-exclamation-triangle', hideDelay: 70000})
        }
    }
    
    render() {        
        var isEmployee = Meteor.user() &&  Meteor.user().isEmployee();

        var tabs = [{ title: 'Info Visualisation', component: <GeneralInfo  {...this.state} updateFormValue={this.updateFormValue} isEmployee={isEmployee} handleFormSubmit={this.handleFormSubmit}/>  },
                    { title: 'Photo de profil', component: <ProfilePicture  {...this.state} photoProfil={this.photoProfil} setImage={this.setImage} imagesPro={this.imagesPro}/> },
                    { title: 'Info Entreprise', component: <CompanyInfo  {...this.state} updateFormValue={this.updateFormValue} changeCompteSocieteComplementaire={this.changeCompteSocieteComplementaire}/>},
                    {title: 'Changer votre mot de passe', component:<Password {...this.state} updateFormValue={this.updateFormValue} updatePassword={this.updatePassword} verifyPasswordMatch={this.verifyPasswordMatch} />}];

        if(isEmployee){
            tabs.splice(2,1);
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="profile-sidebar">
                        <div className="portlet light profile-sidebar-portlet ">
                            <div className="profile-userpic">
                                {this.state.ready && this.imagesPro().length > 0 ? 
                                    <img src={this.imagesPro()} className="img-responsive" alt="" /> 
                                    : <img src="/front/avatar-default.png" className="img-responsive" alt="" /> } 
                                    </div>
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name"> 
                                {this.state.ready ? 
                                    (this.ficheSocieteFront().nomCommercial != '' ? 
                                    this.ficheSocieteFront().nomCommercial 
                                    : undefined)
                                    : undefined }
                                    </div>
                            </div>
                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-circle green btn-sm">Besoin d'aide ?</button>
                            </div>
                            <div className="profile-usermenu">
                                <ul className="nav">
                                    <li>
                                        <a href="/page_user_stats">
                                            <i className="icon-settings"></i> Statistiques </a>
                                    </li>
                                    <li className="active">
                                        <a href="/page_user_profile">
                                            <i className="icon-settings"></i> Modification Compte</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {isEmployee ? null :
                          <div className="portlet light ">
                            <div>
                                <h4 className="profile-desc-title">A propos de votre entreprise </h4>
                                <span className="profile-desc-text">  </span>
                                <div className="margin-top-20 profile-desc-link">
                                    <i className="fa fa-globe"></i>
                                    <a href={this.state.webSite ? this.state.webSite : '/page_user_profile'}>{this.state.webSite}</a>
                                </div>
                                <div className="margin-top-20 profile-desc-link">
                                    <i className="fa fa-twitter"></i>
                                    <a href={this.state.twitterLink ? this.state.twitterLink : '/page_user_profile'}>{this.state.twitterLink}</a>
                                </div>
                                <div className="margin-top-20 profile-desc-link">
                                    <i className="fa fa-facebook"></i>
                                    <a href={this.state.facebookLink ? this.state.facebookLink : '/page_user_profile'}>{this.state.facebookLink}</a>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                    <div className="profile-content">
                        <div className="row">
                            <div className="col-md-12">                                                                   
                                <PortletTabs title="Mon compte" items={tabs}/>                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
