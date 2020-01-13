import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Match } from 'meteor/check';

import SelectRegion  from '/imports/Component/select/selectRegion.jsx';
import SelectActivite  from '/imports/Component/select/selectActivite.jsx';
import MapsAutocomplete from './components/AdresseSearchGoogle';

import { concordanceLocalisationRegion } from '/imports/Component/resultPro/function/utils';

export default class RegisterDOM extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            captchaWidget : {}
        }
    }
    addUser(event){
        event.preventDefault();

        let response = '';
        let password = this.refs.password.value;
        let name = this.refs.name.value;
        let email = this.refs.email.value;
        let rpassword = this.refs.rpassword.value;
        let siret = this.refs.siret.value;
        let nomEntreprise = this.refs.nomEnt.value;
        let adresse = this.refs.adress.value;
        let autreActivite = this.refs.otherActivite.value;
        let isValid = false;
        let regionId = $('.region option:selected').val();
        let regionName = $('.region option:selected').text();
        let activiteId = $('.activite option:selected').val();
        let activiteName = $('.activite option:selected').text();
        let condition = $('#cgu').prop('checked');
        let position = Session.get('localisation');
        if(!position){
            navigator.geolocation.getCurrentPosition(function (loc) {
                position = {
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude
                };
                Session.set('position', position);
            });
        }
        if(!position) {
            position = concordanceLocalisationRegion(parseInt(regionId));
        }

        isValid = Match.Where(function(str){
            check(email, String);
            let regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            return regExp.test(email);
        });
        isValid = Match.test(name, String);
        isValid = Match.test(siret, String);
        

        if(password && email && name && password.length > 6 && email.length > 0 && name.length > 0 &&
            email.length > 0 && password.trim() === rpassword.trim() && siret && siret.length > 5 && isValid && regionId > 0 && activiteId.length > 0
            && response === '' && condition && position)
        {
            //Creation Utilisateur
            Accounts.createUser({
                username: email.trim(),
                email : email.trim(),
                password : password.trim(),
                isCompany : true,
                profile  : {
                    name: name.trim(),
                    firstname : this.refs.firstname.value.trim(),
                    telephone : this.refs.phone.value.trim(),
                    address : this.refs.adress.value.trim(),
                    siret: siret.trim(),
                    regionId: regionId.trim(),
                    activiteId: activiteId.trim(),
                    NomEntreprise: nomEntreprise.trim()
                }
            }, function(err) {
                if(err)
                {
                    console.log(err.reason);
                }
                else {
                    Meteor.call('sendVerificationLinkPro');
                    Meteor.call('sendEmail',
                        'contact@winnzos.fr',
                        'contact@winnzos.fr',
                        'Nouvelle entreprise inscrit Winnzos',
                        email.trim() + '\n Entreprise : ' + nomEntreprise.trim() + '\n Code Postal: ' + adresse.trim() + '\n Nom Utilisateur : ' + name.trim());
                    Meteor.call('Users.method.setDefaultCompanyRoles',{});

                    //Création Fiche Pro pour les recherches
                    let fichePro = {};
                    fichePro.activiteId = activiteId;
                    fichePro.activiteName = autreActivite.length > 0 ? autreActivite.trim() : activiteName.trim();
                    fichePro.nomCommercial = nomEntreprise.trim();
                    fichePro.regionId = parseInt(regionId);
                    fichePro.regionName = regionName.trim();
                    fichePro.siret = siret;
                    fichePro.UserId = Meteor.userId();
                    fichePro.description = '';
                    fichePro.Adresse = {};
                    fichePro.Adresse.Ville = '';
                    fichePro.Adresse.Voie = adresse.trim();
                    fichePro.Adresse.ZipCode = '';
                    fichePro.valid = true;
                    fichePro.position = position;
                    Meteor.call("insert.FichePro.methods", {fichePro}, function (err) {
                        if(err)
                        {
                            console.log(err.reason);
                        }
                        else {
                            Bert.alert({title: 'Bienvenue !',message :'Enregistrement effectué .', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                            FlowRouter.go('/page_user_profile');
                        }
                    });
                }
            });

        }
        else if (!isValid)
        {
            Bert.alert({title: 'Echec de l\'enregistrement',message :'Information renseigné incorrect .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }
        else if(email.length === 0)
        {
            Bert.alert({title: 'Email incorrect',message :'Email vide', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }
        else if(siret.length === 0 || siret.length < 5)
        {
            Bert.alert({title: 'Le numéro de SIRET est incorrect',message :'Siret incorrect', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }
        else if(name.length === 0)
        {
            Bert.alert({title: 'Nom incorrect',message :'Nom vide', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }
        else if(password.trim() !== rpassword.trim())
        {
            Bert.alert({title: 'Les mot de passes ne sont pas identique',message :'Mot de passe non identique', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }
        else
        {
            Bert.alert({title: 'Echec de l\'enregistrement',message :'Une erreur s\'est produite lors de l’enregistrement .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }

    }
    componentDidMount(){
        var _this = this;
        $('.select2').css({width : '100%'});
        $('.otherActivite').hide();
        $('.activite').change(function(e) {
            e.preventDefault();
            if($('.activite').val() == 0)
            {
                $('.otherActivite').show();
            }
        });
        $.getScript('https://www.google.com/recaptcha/api.js?render=explicit').done(function(){
            if($('#captcha-register').length > 0){
                _this.state.captchaWidget = grecaptcha.render( 'captcha-register', {
                    'sitekey' : '6Ld6ACgTAAAAAIBuOqg-u5_hQws4oc96Q1Uk2oKe',  // required
                    'theme' : 'red'
                });
            }
        });
        window.prerenderReady = true;
    }
    render() {
        return (
            <div className="content">
                <form className="register-form"  onSubmit={this.addUser.bind(this)}>
                    <h3 className="font-green">Création de compte</h3>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Votre Nom</label>
                        <input className="form-control placeholder-no-fix" type="text" placeholder="Nom *" name="name"  ref="name" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Votre Prénom</label>
                        <input className="form-control placeholder-no-fix" type="text" placeholder="Prénom" name="firstname" ref="firstname" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Email</label>
                        <input className="form-control placeholder-no-fix" type="email" placeholder="Email *" name="email" ref="email" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Adresse</label>
                        <input id="googleGeo" className="form-control placeholder-no-fix" type="text" placeholder="3 allée Yacine Kateb *" name="adress" ref="adress" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Numéro de téléphone</label>
                        <input className="form-control placeholder-no-fix" type="tel" placeholder="N° Téléphone *" name="phone" ref="phone" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Siret</label>
                        <input className="form-control placeholder-no-fix" type="tel" placeholder="N° Siret *" name="siret" ref="siret" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Nom Entreprise</label>
                        <input className="form-control placeholder-no-fix" type="text" placeholder="Nom de l'entreprise *" name="nomEnt" ref="nomEnt" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Mot de passe</label>
                        <input className="form-control placeholder-no-fix" type="password" id="register_password" placeholder="Mot de passe *" name="password" ref="password" /> </div>
                    <div className="form-group">
                        <label className="control-label visible-ie8 visible-ie9">Confirmation Mot de Passe</label>
                        <input className="form-control placeholder-no-fix" type="password" placeholder="Confirmation Mot de Passe *" name="rpassword" ref="rpassword" /> </div>
                    <div className="form-group">
                        <SelectActivite retour={false} /></div>
                    <div className="form-group otherActivite">
                        <label className="control-label visible-ie8 visible-ie9">Préciser le type d'activité</label>
                        <input className="form-control placeholder-no-fix" type="text" placeholder="Préciser votre activité" name="otherActivite" ref="otherActivite" /> </div>
                    <div className="form-group">
                        <SelectRegion retour={false} /></div>
                    <div className="form-group" >
                        <div id="captcha-register"></div>
                    </div>
                    <div className="form-group margin-top-20 margin-bottom-20">
                        <label className="mt-checkbox-outline">
                            <input type="checkbox" ref="condition" id="cgu" /> Accepter les
                            <a href="/cgcommercants">&nbsp; Conditions générales </a> et <a href="/mentionL">&nbsp; Mentions légales </a>
                        </label>
                        <div id="register_tnc_error"> </div>
                    </div>
                    <div className="form-actions">
                        <a href="/page_login"><button type="button" id="register-back-btn" className="btn green btn-outline">Connection</button></a>
                        <button type="submit" id="register-submit-btn" className="btn btn-success uppercase pull-right">Inscription</button>
                    </div>
                </form>
                <MapsAutocomplete />
            </div>
        )
    }
};