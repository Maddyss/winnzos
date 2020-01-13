import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class LoginDOM extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Inscription: false,
            UserLogged: Meteor.userId() ? true : false,
            resetPassword: false,
            subscription: {
                UserName: Meteor.user() ?  Meteor.user().username : ''
            },
            captchaWidget : {}
        }
    }

    componentDidMount(){
        window.prerenderReady = true;
    }
    componentDidUpdate(){
        if($('#captcha-resetmdp').length > 0){
            this.state.captchaWidget = grecaptcha.render( 'captcha-resetmdp', {
                'sitekey' : '6Ld6ACgTAAAAAIBuOqg-u5_hQws4oc96Q1Uk2oKe'
            });
            $('#captcha-resetmdp').children().css('width', '').css('height', '');
        }
    }

    loginUser(event)
    {
       event.preventDefault();

       if(Meteor.userId() && Meteor.user() && Meteor.user().roles && Meteor.user().roles.length>0)
       {
           FlowRouter.go('/page_user_profile');
       }
       else
       {
           if(this.refs.password && this.refs.userpass && this.refs.password.value != '' && this.refs.userpass.value != '') {
               Meteor.loginWithPassword(this.refs.userpass.value.trim(), this.refs.password.value.trim(), err => {
                   if(err) {
                       Bert.alert({title: 'Echec Identification',message :'Utilisateur inconnu .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                       this.refs.password.value = '';
                       this.refs.userpass.value = '';
                   } else if(Meteor.user() && Meteor.user().roles && Meteor.user().roles.length>0) {
                       FlowRouter.go('/page_user_profile');
                   }
                   else{
                        Bert.alert({title: 'Echec Identification',message :'Vous ne pouvez pas accédez à la partie professionnel sans un compte professionnel.', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
                        this.refs.password.value = '';
                        this.refs.userpass.value = '';
                   }
               });
           }
           else
           {
               Bert.alert({title: 'Echec Identification',message :'Email et le mot de passe sont obligatoire .', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
               this.refs.password.value = '';
               this.refs.userpass.value = '';
           }
       }


    }
    resetPassword(e){
        e.preventDefault();
        this.setState({
            resetPassword: true
        });
    }
    resetPass(e){
        e.preventDefault();
        let response = grecaptcha.getResponse( this.state.captchaWidget );
        let email = this.refs.userpass.value;
        if(response === ""){
            Bert.alert({title: 'Captcha non valide !',message :'', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
            return false;
        }
        Meteor.call('validationCAPTCHA', {response},  function(error, result) {
            if ( error ) {
                console.log (error.reason);
                Bert.alert ({
                    title:   'Captcha non valide !',
                    message: '',
                    type:    'danger',
                    style:   'growl-top-right',
                    icon:    'fa-exclamation-triangle'
                });
                return;
            }

            Meteor.call('sendResetPassword', {email}, function(error, result){
                if(error){
                    console.log(error.reason);
                }
                else{
                    if(result){
                        Bert.alert( {title:"Un email vient d'être envoyé !", type:'success', style: 'growl-top-right' } );
                        $('#cnx').data('open', false).hide();
                    }else{
                        Bert.alert( {title:'Aucun compte trouvé pour cette email !!!', type:'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'} );
                    }
                }
            });
        });
    }
    handleClickReturn(e){
        e.preventDefault();
        this.setState({
            Inscription: false,
            resetPassword: false
        });
    }

    render() {
        if (this.state.resetPassword){
            return (
                <div className="content">
                    <form className="login-form" onSubmit={this.resetPass.bind(this)}>
                        <h3 className="form-title font-green">Reset Mot de passe Winnzos</h3>
                        <p className="sub-heading-1">Merci de renseigner votre adresse email :</p>
                        <div className="alert alert-danger display-hide">
                            <button className="close" data-close="alert"></button>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Adresse e-mail</label>
                            <input className="form-control form-control-solid placeholder-no-fix" type="text" placeholder="Email" name="username" ref="userpass"/> </div>
                        <div className="form-field row" >
                            <div id="captcha-resetmdp"></div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn green uppercase">Envoyer</button>
                            <a href="javascript:;" id="retour" className="forget-password" onClick={this.handleClickReturn.bind(this)} >Retour</a>
                        </div>
                        <div className="create-account">
                            <p>
                                <a href="/register" id="register-btn" className="uppercase">Créer votre compte Winnzos</a>
                            </p>
                        </div>
                    </form>
                </div>
            )
        }
        else{
            return (
                <div className="content">
                    <form className="login-form" onSubmit={this.loginUser.bind(this)}>
                        <h3 className="form-title font-green">Identifiez-vous</h3>
                        <div className="alert alert-danger display-hide">
                            <button className="close" data-close="alert"></button>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Adresse e-mail</label>
                            <input className="form-control form-control-solid placeholder-no-fix" type="text" placeholder="Email" name="username" ref="userpass"/> </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Mot de passe</label>
                            <input className="form-control form-control-solid placeholder-no-fix" type="password" placeholder="Mot de passe" name="password" ref="password"/> </div>
                        <div className="form-actions">
                            <button type="submit" className="btn green uppercase">Identifiez-vous</button>
                            <a href="javascript:;" id="forget-password" className="forget-password" onClick={this.resetPassword.bind(this)} >Mot de passe oublié ?</a>
                        </div>
                        <div className="create-account">
                            <p>
                                <a href="/register" id="register-btn" className="uppercase">Créer votre compte Winnzos</a>
                            </p>
                        </div>
                    </form>
                </div>
            )
        }
    }
};