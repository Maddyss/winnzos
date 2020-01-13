/**
 * Created by root on 03/09/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ParrainagePage extends Component {
    constructor (props) {
        super (props);
    }
    parrain(e){
        e.preventDefault();
        let nom = this.refs.name.value;
        let ent = this.refs.ent.value;
        let cp = this.refs.cp.value;
        let message = this.refs.message.value;

        check([nom,ent,cp,message], [String]);

        if(nom.length > 0 && email.length > 0 && message.length >0){
            Meteor.call('sendEmail',
                'contact@winnzos.fr',
                'contact@winnzos.fr',
                'Demande Parrainage utilisateur',
                message + '\n Entreprise : ' + ent + '\n Code Postal: ' + cp + '\n Nom Utilisateur : ' + nom);
        }
        else{
            Bert.alert({title: 'Information incomplète',message :'', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation-triangle'});
        }
    }
    informationWinnzos(){

    }
    render () {
        return (
            <div id="parrainage">
                <div className="container">
                    <div className="row">
                        <h2 style={{'textAlign':'center'}}>Parrainez vos entreprise !</h2>
                    </div>
                </div>
                <div style={{'backgroundColor': '#f2dede'}}>
                    <div className="container">
                        <div className="row">
                            <p>Vous en avez assez de courir pour trouver l’article que vous voulez ? Vous recherchez juste un produit près de chez vous et pas trop cher ?..
                                Alors, plus d’inquiétude, Winnzos a tout prévu ! En quelques clics, trouvez le commerce ou le produit de votre choix, et à proximité de chez vous.</p>
                            <p>Mais, plus simple encore, vous pouvez également demander à Winnzos de contacter une entreprise pour vous ! Nous pouvons, à votre demande, entrer en contact avec
                                l’entreprise de votre choix. Pour cela, rien de plus simple : il vous suffit de remplir le formulaire, en notifiant les informations concernant l‘enseigne que vous recherchez.
                                Nous nous chargerons alors de tout, afin de vous faciliter la tâche. Plus de perte de temps pour contacter une entreprise.
                                En remplissant ce formulaire, vous aurez des informations précises sur les produits, la géolocalisation, et les meilleurs tarifs. Et tout cela au plus près de chez vous !</p>
                            <p>Avec Winnzos, vous facilitez votre quotidien et vos contacts avec les professionnels que vous cherchez.
                                N’hésitez pas à remplir le formulaire.
                                <a href="/contact" > <span style={{'textDecoration':'underline', 'fontSize': '15px', 'fontWeight': '600'}}>Vous pouvez également récupérer les informations de contact de Winnzos</span></a>
                                , et ainsi poursuivre les démarches vous-mêmes.</p>

                            <form method="post" onSubmit={this.parrain.bind(this)}>
                                <div className="form-group">
                                    <input type="text" placeholder="Votre Nom et Prénom" className="form-control input-md" ref="name" /> </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Nom de l'entreprise" className="form-control input-md" ref="ent" /> </div>
                                <div className="form-group">
                                    <input type="text" placeholder="CodePostal" className="form-control input-md" ref="cp" /> </div>
                                <div className="form-group">
                                    <textarea rows="4" name="message" placeholder="Indiquer des informations supplémentaire concernant l'entreprise." className="form-control input-md" ref="message" ></textarea>
                                </div>
                                <button type="submit" className="btn red">Envoyer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}