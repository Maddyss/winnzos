import React from "react";
import swal from 'sweetalert2';
import Tracker from 'tracker-component';

import "./settings.scss";
import ImagesPro from "/imports/Component/resultPro/imagesPro.jsx";
import {Entreprise, FichePro} from '/imports/api/collection/collection';
import {Images} from '/imports/api/collection/collection-images';

import ProfilePicture from '/client/views/profile/components/profilepicture.jsx';

export default class Settings extends Tracker.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.getCurrentEmail(),
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
            errorMessage: null,
            images :[]
        }

        this.sub3 = this.subscribe('get.images.pro', Meteor.userId());

        this.autorun(()=>{
           this.setState({images : Images.find().fetch()});
        });

        this.updateFormValue = this.updateFormValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCurrentEmail = this.getCurrentEmail.bind(this);
        this.imagesPro = this.imagesPro.bind(this);
        this.photoProfil = this.photoProfil.bind(this);
        this.setImage = this.setImage.bind(this);
        this.newImage = this.newImage.bind(this);
    }


    getCurrentEmail() {
        return Meteor.user().emails[0].address
    }

    updateFormValue(name) {
        return (e) => {
            this.setState({
                [name]: e.target.value,
            })
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let errorMessage = null;

        if (this.state.email !== this.getCurrentEmail()) {
            if (this.state.email.indexOf('@') === -1) {
                errorMessage = "L'email est invalide";
            }
            else {
                Meteor.call('Users.updateemail', {newEmail: this.state.email}, (err) => {
                    if (err) {
                        console.log(err.reason);
                        this.setState({
                            errorMessage: 'Cet adresse email est déjà utilisé.'
                        })
                    } else {
                        swal({
                            title: "Votre email a été mis à jour.",
                            text: "Attention, votre login reste inchangé.",
                            type: 'success',
                        })
                    }
                });
            }
        }

        if (this.state.oldPassword && ( this.state.newPassword1 || this.state.newPassword2)) {
            if (this.state.newPassword1 != this.state.newPassword2) {
                errorMessage = 'Les mots de passes ne correspondent pas';
            } else {
                Accounts.changePassword(this.state.oldPassword, this.state.newPassword1, (err) => {
                    if (!err) {
                        swal({
                            title: "Votre mot de passe a été mis à jour",
                            type: 'success',
                        })
                    } else {
                        console.log(err.reason);
                        if (err.error === 403) {
                            this.setState({
                                errorMessage: 'Le mot de passe est invalide'
                            })
                        }
                    }
                });
            }
        }

        this.setState({
            errorMessage
        })
    }

    imagesPro() {
        let linkImages = Images.findOne({'userId': Meteor.userId()});
        if (linkImages) {
            return linkImages.link();
        }
        else
            return [];
    }

    photoProfil() {
        return (
            <div>
                <div className="row">
                    <img src={ this.imagesPro() } style={{'maxWidth': '600px', 'maxHeight': '600px'}}/>
                </div>
                <div className="row" style={{'paddingTop': '30px'}}>
                    <input type="file" name="Changer Photo Profil" onChange={this.newImage.bind(this)}/>
                </div>
            </div>
        )
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
                        Bert.alert({title: 'Le fichier a correctement été téléchargé !',message :'', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
                    }
                }
            });
        }
    }
    setImage(e) {
        e.preventDefault();
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            Images.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic',
                onStart: function (error) {
                    if (error) {
                        Bert.alert({
                            title: 'Erreur lors du téléchargement !',
                            message: 'Le fichier doit être inférieur à 10MB.',
                            type: 'danger',
                            style: 'growl-top-right',
                            icon: 'fa-exclamation-triangle'
                        });
                        console.log(error.reason);
                    }
                },
                onUploaded: function (error) {
                    if (error) {
                        Bert.alert({
                            title: 'Erreur lors du téléchargement !',
                            message: 'Le fichier doit être inférieur à 10MB.',
                            type: 'danger',
                            style: 'growl-top-right',
                            icon: 'fa-exclamation-triangle'
                        });
                        console.log(error.reason);
                    }
                    else {
                        Bert.alert({
                            title: 'Le fichier a correctement été téléchargé !',
                            message: '',
                            type: 'success',
                            style: 'growl-top-right',
                            icon: 'fa-check'
                        });
                    }
                }
            });
        }
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Votre profil</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Adresse email</label>
                            <input type="email" className="form-control" value={this.state.email}
                                   onChange={this.updateFormValue('email')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Ancien mot de passe</label>
                            <input type="text" className="form-control" value={this.state.oldPassword}
                                   onChange={this.updateFormValue('oldPassword')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Nouveau mot de passe</label>
                            <input type="text" className="form-control" value={this.state.newPassword1}
                                   onChange={this.updateFormValue('newPassword1')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Nouveau mot de passe (répéter)</label>
                            <input type="text" className="form-control" value={this.state.newPassword2}
                                   onChange={this.updateFormValue('newPassword2')}/>
                        </div>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-default">Mettre à jour
                        </button>
                        {this.state.errorMessage ? <div className="text-danger">{this.state.errorMessage}</div> : null}
                    </form>

                    <ProfilePicture  {...this.state} photoProfil={this.photoProfil} setImage={this.setImage}
                                     imagesPro={this.imagesPro}/>

                </div>
            </div>
        </div>
    }
}