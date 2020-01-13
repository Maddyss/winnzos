import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class TemoignagesDOM extends Component {
    render() {
        return (
            <section id="testimonials">
                <h2 className="heading-1 with-lines">T&eacute;moignages</h2>
                <div className="slider">
                    <a className="control prev" href="#"><i className="fa fa-chevron-left"></i></a>
                    <div className="slides">
                        <div className="slide" data-id_slide="1">
                            <blockquote>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia anim.</p>
                            </blockquote>
                            <div className="bubble-arrow"></div>
                            <a href="#" className="view-all" title="Voir tous les t&eacute;moignages">Voir tous les t&eacute;moignages</a>
                            <div className="author">
                                <img src="/front/avatar-default.png" alt="Pr&eacute;nom NOM" className="avatar" />
                                <p className="name">Pr&eacute;nom NOM</p>
                                <p className="loc">VILLE, PAYS</p>
                            </div>
                        </div>
                    </div>
                    <a className="control next" href="#"><i className="fa fa-chevron-right"></i></a>
                </div>
            </section>
        )
    }
};