import React, { Component } from 'react';
import NotificationDOM from '/imports/Component/notification.jsx';

import ProfileDOM from '/client/views/admin/menu/profile_menu.jsx';
import MenuDOM from '/client/views/admin/menu/menu.jsx';

import '/imports/stylesheet/bootstrap-switch/css/bootstrap-switch.min.css';
import '/imports/stylesheet/front/global.css';

import '/imports/Sass/global/components-md.scss';
import '/imports/Sass/layouts/layout/layout.scss';
import '/imports/Sass/layouts/layout/custom.scss';
import '/imports/Sass/layouts/layout/themes/darkblue.scss';
import Tracker from 'tracker-component';


import ShoppingCartNotification from './shoppingcartnotification.jsx';

class ActionHeaderRight extends Component {
    render() {
        return (
            <ul className="nav navbar-nav pull-right">
                <ShoppingCartNotification />
                <NotificationDOM />
                <ProfileDOM />
                <li className="dropdown dropdown-extended dropdown-notification">
                    <a href="/" className="dropdown-toggle"  style={{'color':'white', 'paddingRight':'5px'}}><i className="fa fa-arrow-left" aria-hidden="true"></i> Accueil</a>
                </li>
            </ul>
        )
    }

};


export default class Header extends Tracker.Component {
    constructor(props){
        super(props);
        Meteor.users.deny({
            update() { return true; }
        });

    }
    componentDidMount(){
        $('body').removeClass('login').css('background-color', '');
        $('body').addClass('page-header-fixed page-sidebar-closed-hide-logo page-content-white page-md');
        /*var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

         var s1=document.createElement("script");
         var s0=document.getElementsByTagName("script")[0];
         s1.async=true;
         s1.src='https://embed.tawk.to/58109e959ca1830bdc9dc8c9/default';
         s1.charset='UTF-8';
         s1.setAttribute('crossorigin','*');
         s0.parentNode.insertBefore(s1,s0);*/

        $.getScript('https://www.google.com/recaptcha/api.js?render=explicit');

    }
    render() {

        return (
            <div className="page-wrapper">
                <div className="page-header navbar navbar-fixed-top">
                    <div className="page-header-inner ">
                        <div className="page-logo">
                            <a href="/home_pro">
                                <img src="/pro/logo-winnzos-blanc.png" alt="logo" className="logo-default img-fluid"  /> </a>
                            <a href="/home_pro" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                                <span></span>
                            </a>
                        </div>
                        <div className="top-menu">
                            <ActionHeaderRight />
                        </div>
                    </div>
                </div>
                <div className="clearfix"> </div>
                <main className="page-container">
                    <MenuDOM />
                    <div className="page-content-wrapper">
                        <div className="page-content">
                            {this.props.content}
                        </div>
                    </div>
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

