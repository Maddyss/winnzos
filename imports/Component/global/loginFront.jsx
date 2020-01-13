import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import 'meteor/accounts-google';
import 'meteor/accounts-ui';

export default class LoginButton extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            Inscription: false,
            UserLogged: Meteor.userId() ? true : false,
            user: Meteor.user(),
            resetPassword: false,
            subscription: {
                UserName: Meteor.user() ? Meteor.user().username : ''
            },
            captchaWidget: {}
        }
    }
    componentDidMount() {
        var $cnx = $('#cnx').data('open', false).hide();
        var $cnx_button = $('#cnx-button');
        $cnx_button.click(function (e) {
            e.preventDefault();
            if ($cnx.data('open'))
                $cnx.data('open', false).fadeOut(300);
            else
                $cnx.data('open', true).fadeIn(300);
        });
        $.getScript('https://www.google.com/recaptcha/api.js?render=explicit');
    }
    loginUser(e) {
        e.preventDefault();

        if (this.state.UserLogged) {
            FlowRouter.go('/');
        }
        else {
            if (this.refs.password && this.refs.userpass && this.refs.password.value != '' && this.refs.userpass.value != '') {
                let username = this.refs.userpass.value.trim();
                Meteor.loginWithPassword(this.refs.userpass.value.trim(), this.refs.password.value.trim(), err => {
                    if (err) {
                        Bert.alert({ title: 'Echec Identification', message: 'Utilisateur inconnu .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
                        this.refs.password.value = '';
                        this.refs.userpass.value = '';
                    } else {
                        this.setState({
                            UserLogged: true,
                            subscription: { UserName: username }
                        });
                    }
                });
            }
            else {
                Bert.alert({ title: 'Echec Identification', message: 'Email et le mot de passe sont obligatoire .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
                this.refs.password.value = '';
                this.refs.userpass.value = '';
            }
        }
    }
    handleClickIdent(e) {
        e.preventDefault();
        this.setState({
            Inscription: false
        });
    }
    handleClickInscr(e) {
        e.preventDefault();
        this.setState({
            Inscription: true
        });
    }
    handleClickReturn(e) {
        e.preventDefault();
        this.setState({
            Inscription: false,
            resetPassword: false
        });
    }
    googleLogin(e) {
        e.preventDefault();
        Meteor.loginWithGoogle({
            requestPermissions: "openid email https://www.googleapis.com/auth/drive https://www.google.com/m8/feeds",
            requestOfflineToken: true,
            forceApprovalPrompt: true
        }, function (err) {
            if (err)
                Bert.alert({ title: 'Identification échoué !', message: 'Veuillez réessayez ou contacter le support.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
            else {
                this.setState({
                    UserLogged: true,
                    subscription: { UserName: Meteor.user().profile.name }
                });
            }
        }.bind(this));
    }
    facebookLogin(e) {
        e.preventDefault();
        Meteor.loginWithFacebook({}, function (err) {
            if (err)
                Bert.alert({ title: 'Identification échoué !', message: 'Veuillez réessayez ou contacter le support.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
            else {
                this.setState({
                    UserLogged: true,
                    subscription: { UserName: Meteor.users().profile.name }
                });
            }
        }.bind(this));
    }
    inscripUser(e) {
        e.preventDefault();
        let password = this.refs.password.value;
        let email = this.refs.userpass.value;
        let rpassword = this.refs.repassword.value;
        let isValid = false;

        isValid = Match.Where(function (str) {
            check(email, String);
            let regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            return regExp.test(email);
        });

        let response = grecaptcha.getResponse(this.state.captchaWidget);
        if (response === "") {
            Bert.alert({ title: 'Captcha non valide !', message: '', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
            return false;
        }
        Meteor.call('validationCAPTCHA', { response }, function (error, result) {
            if (error) {
                console.log(error.reason);
                Bert.alert({ title: 'Captcha non valide !', message: '', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
                return;
            }


            if (password && email && password.length > 6 && email.length > 0 &&
                email.length > 0 && password.trim() === rpassword.trim() && isValid) {
                //Creation Utilisateur
                Accounts.createUser({
                    username: email.trim(),
                    email: email.trim(),
                    password: password.trim()
                }, function (err) {
                    if (err) {
                        console.log(err.reason);
                    }
                    else {
                        Meteor.call('sendVerificationLink');
                        this.setState({
                            UserLogged: true,
                            subscription: { UserName: username }
                        });
                    }
                });
            }
            else {
                Bert.alert({ title: 'Identification échoué !', message: 'Les informations renseignées sont incorrect.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
            }
        });
    }
    logout(e) {
        e.preventDefault();

        Meteor.logout();
        this.setState({
            UserLogged: false
        });
    }
    resetPassword(e) {
        e.preventDefault();
        this.setState({
            resetPassword: true
        });
    }
    resetPass(e) {
        e.preventDefault();
        let response = grecaptcha.getResponse(this.state.captchaWidget);
        let email = this.refs.userpass.value;
        if (response === "") {
            Bert.alert({ title: 'Captcha non valide !', message: '', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
            return false;
        }
        Meteor.call('validationCAPTCHA', { response }, function (error, result) {
            if (error) {
                console.log(error.reason);
                Bert.alert({
                    title: 'Captcha non valide !',
                    message: '',
                    type: 'danger',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle'
                });
                return;
            }

            Meteor.call('sendResetPassword', { email }, function (error, result) {
                if (error) {
                    console.log(error.reason);
                }
                else {
                    if (result) {
                        Bert.alert({ title: "Un email vient d'être envoyé !", type: 'success', style: 'growl-top-right' });
                        $('#cnx').data('open', false).hide();
                    } else {
                        Bert.alert({ title: 'Aucun compte trouvé pour cette email !!!', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle' });
                    }
                }
            });
        });
    }

    contentLogin() {
        let content;
        if (this.state.Inscription && !this.state.UserLogged && !this.state.resetPassword) {
            content = <div id="cnx-container">
                <h2 className="heading-1">Bienvenue sur <span>Winnzos</span></h2>
                <p className="sub-heading-1">Merci de renseigner les champs suivant: </p>
                <form method="post" onSubmit={this.inscripUser.bind(this) }>
                    <div className="form-field field-text row" id="field_email">
                        <input type="text" name="userpass" placeholder="Adresse e-mail" ref="userpass"/>
                    </div>
                    <div className="form-field field-password row" id="field_password">
                        <input type="password" name="password" placeholder="Mot de passe" ref="password"/>
                    </div>
                    <div className="form-field field-password row" id="field_password">
                        <input type="password" name="password" placeholder="Confirmation Mot de passe" ref="repassword"/>
                    </div>
                    <div className="form-field row" style={{ 'textAlign': 'center' }}>
                        <div id="captcha-creation"></div>
                    </div>
                    <div className="form-field field-checkbox row" id="field_remember">
                        <a href="javascript:;" data-original-title="facebook" className="col-md-6" onClick={this.facebookLogin.bind(this) }
                            style={{ 'textAlign': 'center' }}><i className="fa fa-facebook-square fa-3x" aria-hidden="true"></i></a>
                        <a href="javascript:;" data-original-title="Goole Plus" className="col-md-6" onClick={this.googleLogin.bind(this) }
                            style={{ 'textAlign': 'center', 'color': 'red' }}><i className="fa fa-google-plus-square fa-3x" aria-hidden="true"></i></a>
                    </div>
                    <div className="form-field field-checkbox row" id="field_remember">
                        <a  href="/" title="Identifiez-vous" onClick={this.handleClickIdent.bind(this) } style={{ 'textAlign': 'center' }}>Déjà inscrit?</a>
                    </div>
                    <div className="form-field field-submit" id="field_submit-cnx">
                        <input type="submit" name="submit-cnx" value="Inscription" />
                    </div>
                </form>
            </div>
        }
        else if (!this.state.Inscription && !this.state.UserLogged && !this.state.resetPassword) {
            content = <div id="cnx-container">
                <h2 className="heading-1">Bienvenue sur <span>Winnzos</span></h2>
                <p className="sub-heading-1">Merci de vous identifier ci-dessous: </p>
                <form method="post" onSubmit={this.loginUser.bind(this) }>
                    <div className="form-field field-text" id="field_email">
                        <input type="text" name="userpass" placeholder="Adresse e-mail" ref="userpass"/>
                    </div>
                    <div className="form-field field-password" id="field_password">
                        <input type="password" name="password" placeholder="Mot de passe" ref="password"/>
                        <a className="forget-password" href="javascript:;" onClick={this.resetPassword.bind(this) }
                            title="Mot de passe oublié ?">Mot de passe oublié?</a>
                    </div>
                    <div className="form-field field-checkbox row" id="field_remember">
                        <a href="javascript:;" data-original-title="facebook" className="col-md-6" onClick={this.facebookLogin.bind(this) }
                            style={{ 'textAlign': 'center' }}><i className="fa fa-facebook-square fa-3x" aria-hidden="true"></i></a>
                        <a href="javascript:;" data-original-title="Goole Plus" className="col-md-6" onClick={this.googleLogin.bind(this) }
                            style={{ 'textAlign': 'center', 'color': 'red' }}><i className="fa fa-google-plus-square fa-3x" aria-hidden="true"></i></a>
                    </div>
                    <div className="form-field field-checkbox" id="field_remember">
                        <a  href="/" title="Pas encore inscrit ?" onClick={this.handleClickInscr.bind(this) } style={{ 'textAlign': 'center' }}>Pas encore inscrit?</a>
                    </div>
                    <div className="form-field field-checkbox" id="field_remember">
                        <a  href="/page_login" title="Vous êtes une entreprise ?" style={{ 'textAlign': 'center' }}>Vous êtes une entreprise?</a>
                    </div>
                    <div className="form-field field-submit" id="field_submit-cnx">
                        <input type="submit" name="submit-cnx" value="S'identifier" />
                    </div>
                </form>
            </div>
        }
        else if (this.state.resetPassword) {
            content = <div id="cnx-container">
                <h2 className="heading-1">Reset Mot de passe <span>Winnzos</span></h2>
                <p className="sub-heading-1">Merci de renseigner votre adresse email ci-dessous: </p>
                <form method="post" onSubmit={this.resetPass.bind(this) }>
                    <div className="form-field field-text" id="field_email">
                        <input type="text" name="userpass" placeholder="Adresse e-mail" ref="userpass"/>
                    </div>
                    <div className="form-field row" style={{ 'textAlign': 'center' }}>
                        <div id="captcha-creation"></div>
                    </div>
                    <div className="form-field field-checkbox" id="field_remember">
                        <a  href="/" title="Retour connection" onClick={this.handleClickReturn.bind(this) } >Retour connection</a>
                    </div>
                    <div className="form-field field-submit" id="field_submit-cnx">
                        <input type="submit" name="submit-cnx" value="Envoyer" />
                    </div>
                </form>
            </div>
        }
        else {
            content = <div id="cnx-container">
                <h2 className="heading-1">Bienvenue <span>{this.state.subscription.UserName}</span></h2>
                <p className="sub-heading-1"></p>
                <div className="row" style={{ 'textAlign': 'center' }}>
                    <div className="col-md-6">
                        {Meteor.user() && Meteor.user().roles && Meteor.user().roles.length > 0 ? null :
                            <a className="btn btn-default" href="/settings" aria-label="Settings">
                                <i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Settings
                            </a>
                        }
                        {Meteor.user() && Meteor.user().roles && Meteor.user().roles.length > 0 ? null :
                            <a className="btn btn-default" href="/favorites" aria-label="Settings">
                                <i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Favorits
                            </a>
                        }
                    </div>
                    <div className="col-md-6">
                        <a className="btn btn-danger" href="/settings">
                            <i className="fa fa-trash-o"></i>&nbsp; Delete</a>
                    </div>
                </div>
                <form method="post" onSubmit={this.logout.bind(this) }>
                    <div className="form-field field-submit" id="field_submit-cnx">
                        <input type="submit" name="submit-cnx" value="Deconnexion" />
                    </div>
                </form>
            </div>
        }
        return content;
    }
    componentDidUpdate() {
        if ($('#captcha-creation').length > 0) {
            this.state.captchaWidget = grecaptcha.render('captcha-creation', {
                'sitekey': '6Ld6ACgTAAAAAIBuOqg-u5_hQws4oc96Q1Uk2oKe',  // required
                'theme': 'red'
            });
            $('#captcha-creation').children().css('width', '').css('height', '');
        }
    }
    render() {
        return (
            <div>
                <a href="#" className="header-buttons" id="cnx-button"><i className="fa fa-lock"></i>&nbsp; &nbsp; &nbsp; Mon compte</a>
                <section id="cnx">
                    <div id="cnx-container-arrow"></div>
                    { this.contentLogin() }
                </section>
            </div>
        );
    }
};