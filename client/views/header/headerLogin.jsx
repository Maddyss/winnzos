import React from 'react';
import { Meteor } from 'meteor/meteor';


import '/imports/stylesheet/global/components-md.min.css';
import '/imports/stylesheet/global/plugins-md.min.css';
import '/imports/stylesheet/adminBoard/login.min.css';



export default class HeaderLogin extends React.Component{
    constructor(props){
        super(props);
        Meteor.users.deny({
            update() { return true; }
        });
        Meteor.logout();
    }
    componentDidMount(){
        $('body').attr('class', 'login');
        $('body').css('background-color', '#364150');
        $.getScript('https://www.google.com/recaptcha/api.js?render=explicit');
    }

    componentWillUnmount () {
        $('body').removeClass('login');
        $('body').css('background-color', '');
    }

    render() {
        return (
            <div>
                <main>
                    <div className="logo">
                        <a href="/">
                            <img src="/header/img/logo.png" alt="Logo Winnzos" width={'70'} height={'70'}/> </a>
                    </div>
                    {this.props.content}
                </main>
                <footer>
                    <section id="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div>
                                    <p className="text-center">&copy; 2016 WINNZOS. Tous droits r&eacute;serv&eacute;s</p>
                                    <p className="text-center"> Winnzos : <i className="fa fa-map-marker"></i> 3 allée Yacine Kateb, 79000 Niort </p>
                                    <p className="text-center"> <a href="mailto:contact@winnzos.fr">contact@winnzos.fr</a>&nbsp;/&nbsp;<i className="fa fa-phone"></i> : 09.72.58.90.29 </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </footer>
            </div>
        )
    }

};