    import React, {Component} from 'react';

    var ProfileTabs = ({isEmployee}) => {
        return <ul className="nav nav-tabs">
                    <li className="active">
                        <a href="#tab_1_1" data-toggle="tab">Info Visualisation</a>
                    </li>
                    <li>
                        <a href="#tab_1_2" data-toggle="tab">Photo de profil</a>
                    </li>
                    {isEmployee ? null : 
                    <li>
                        <a href="#tab_1_3" data-toggle="tab">Info Entreprise</a>
                    </li>
                    }
                    <li>
                        <a href="#tab_1_4" data-toggle="tab">Changer votre mot de passe</a>
                    </li>
                </ul>
    }

    ProfileTabs.propTypes = {
        isEmployee: React.PropTypes.bool.isRequired
    };

    export default ProfileTabs;