import React, { PropTypes, Component } from 'react';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';

class ResGoogle extends Component {
    constructor(props) {
        super(props);
    }
    conponentDidMount(){
        window.prerenderReady = true;
    }
    render() {
        let compteur = 0;
        const { res, nbres } = this.props;
        let result = null;
        if(res){
            result = res.map((pro, index) => {
                if(compteur < nbres) {
                    compteur ++;
                    let ficheProId = pro.place_id;
                    if(ficheProId && ficheProId != "") {
                        return (
                            <div className="col-xs-12 col-sm-4" key={index}>
                                <div className="result">
                                    <a href={'/pro/' + pro.name + '?pro=' + ficheProId }
                                       title={pro.name}> <img src={pro.photos ? pro.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500}) : "/front/user-pic-default.png"} title={pro.name} /> </a>
                                    <h3 className="heading"><a
                                        href={'/pro/' + pro.name + '?pro=' + ficheProId }
                                        title={pro.name}>{pro.name}</a></h3>
                                    <p className="spec">{concordanceTypes(pro.types)}</p>
                                    <p className="address">{pro.formatted_address.split(',')[1]}</p>
                                    <p className="address">{pro.formatted_address.split(',')[0]}</p>
                                    <p className="address">{pro.formatted_address.split(',')[2]}</p>
                                </div>
                            </div>
                        )
                    }
                }
            })
        }
        else{
            result = <div></div>;
        }
        return (
            <div>
                { result }
            </div>
        )
    }
}
export default ResGoogle;

function concordanceTypes(listType){
    "use strict";
    let type = '';
    $.each(listType, function(j, el){
        if(el === 'hair_care'){
            if(type.length  === 0)
                type += 'Salon de coiffure';
            else
                type += ', Salon de coiffure';
        }
        else if(el === 'beauty_salon'){
            if(type.length  === 0)
                type += 'Salon de beauté';
            else
                type += ', Salon de beauté';
        }
        else if(el === 'veterinary_care'){
            if(type.length  === 0)
                type += 'Vétérinaire';
            else
                type += ', Vétérinaire';
        }
        else if(el === 'car_rental'){
            if(type.length  === 0)
                type += 'Location de voiture';
            else
                type += ', Location de voiture';
        }
        else if(el === 'funeral_home'){
            if(type.length  === 0)
                type += 'Pompes Funebres';
            else
                type += ', Pompes Funebres';
        }
        else if(el === 'car_repair'){
            if(type.length  === 0)
                type += 'Garages';
            else
                type += ', Garages';
        }
        else if(el === 'laundry'){
            if(type.length  === 0)
                type += 'Blanchisserie';
            else
                type += ', Blanchisserie';
        }
        else if(el === 'doctor'){
            if(type.length  === 0)
                type += 'Docteur';
            else
                type += ', Docteur';
        }
        else if(el === 'dentist'){
            if(type.length  === 0)
                type += 'Dentiste';
            else
                type += ', Dentiste';
        }
        else if(el === 'health'){
            if(type.length  === 0)
                type += 'Santé';
            else
                type += ', Santé';
        }
        else if(el === 'spa'){
            if(type.length  === 0)
                type += 'Spa';
            else
                type += ', Spa';
        }
        else if(el === 'stadium'){
            if(type.length  === 0)
                type += 'Stade';
            else
                type += ', Stade';
        }
        else if(el === 'sport'){
            if(type.length  === 0)
                type += 'Sport';
            else
                type += ', Sport';
        }
        else if(el === 'lodging'){
            if(type.length  === 0)
                type += 'Hébergement';
            else
                type += ', Hébergement';
        }
        else if(el === 'campground'){
            if(type.length  === 0)
                type += 'Campings';
            else
                type += ', Campings';
        }
        else if(el === 'amusement_park'){
            if(type.length  === 0)
                type += 'Parc d\'attraction';
            else
                type += ', Parc d\'attraction';
        }
        else if(el === 'aquarium'){
            if(type.length  === 0)
                type += 'Aquarium';
            else
                type += ', Aquarium';
        }
        else if(el === 'art_gallery'){
            if(type.length  === 0)
                type += 'Gallerie d\'art';
            else
                type += ', Gallerie d\'art';
        }
        else if(el === 'park'){
            if(type.length  === 0)
                type += 'Parc';
            else
                type += ', Parc';
        }
        else if(el === 'zoo'){
            if(type.length  === 0)
                type += 'Zoo';
            else
                type += ', Zoo';
        }
        else if(el === 'bowling_alley'){
            if(type.length  === 0)
                type += 'Bowling';
            else
                type += ', Bowling';
        }
        else if(el === 'real_estate_agency'){
            if(type.length  === 0)
                type += 'Agence immobilière';
            else
                type += ', Agence immobilière';
        }
        else if(el === 'electrician'){
            if(type.length  === 0)
                type += 'Electricien';
            else
                type += ', Electricien';
        }
        else if(el === 'painter'){
            if(type.length  === 0)
                type += 'Peintre';
            else
                type += ', Peintre';
        }
        else if(el === 'locksmith'){
            if(type.length  === 0)
                type += 'Serrurier';
            else
                type += ', Serrurier';
        }
        else if(el === 'bakery'){
            if(type.length  === 0)
                type += 'Boulangerie';
            else
                type += ', Boulangerie';
        }
        else if(el === 'meal_delivery'){
            if(type.length  === 0)
                type += 'Livraison de repas';
            else
                type += ', Livraison de repas';
        }
        else if(el === 'food'){
            if(type.length  === 0)
                type += 'Restaurant rapide';
            else
                type += ', Restaurant rapide';
        }
        else if(el === 'grocery_or_supermarket'){
            if(type.length  === 0)
                type += 'Supermarchés';
            else
                type += ', Supermarchés';
        }
        else if(el === 'cafe'){
            if(type.length  === 0)
                type += 'Café';
            else
                type += ', Café';
        }
        else if(el === 'restaurant'){
            if(type.length  === 0)
                type += 'Restaurant';
            else
                type += ', Restaurant';
        }
        else if(el === 'meal_takeaway'){
            if(type.length  === 0)
                type += 'Restauration à emporter';
            else
                type += ', Restauration à emporter';
        }
        else if(el === 'electronics_store'){
            if(type.length  === 0)
                type += 'Magasin d\'électronique';
            else
                type += ', Magasin d\'électronique';
        }
        else if(el === 'hardware_store'){
            if(type.length  === 0)
                type += 'Quincaillerie';
            else
                type += ', Quincaillerie';
        }else if(el === 'home_goods_store'){
            if(type.length  === 0)
                type += 'Magasin spécialisé';
            else
                type += ', Magasin spécialisé';
        }
        else if(el === 'liquor_store'){
            if(type.length  === 0)
                type += 'Magasin d\'alcool';
            else
                type += ', Magasin d\'alcool';
        }else if(el === 'store'){
            if(type.length  === 0)
                type += 'Magasin';
            else
                type += ', Magasin';
        }
        else if(el === 'clothing_store'){
            if(type.length  === 0)
                type += 'Magasin de vêtements';
            else
                type += ', Magasin de vêtements';
        }
        else if(el === 'department_store'){
            if(type.length  === 0)
                type += 'Centre commercial';
            else
                type += ', Centre commercial';
        }
        else if(el === 'shoe_store'){
            if(type.length  === 0)
                type += 'Magasin de chaussure';
            else
                type += ', Magasin de chaussure';
        }
        else if(el === 'shopping_mall'){
            if(type.length  === 0)
                type += 'Petit magasin';
            else
                type += ', Petit magasin';
        }
        else if(el === 'furniture_store'){
            if(type.length  === 0)
                type += 'Magasin de fourniture';
            else
                type += ', Magasin de fourniture';
        }
        else if(el === 'bicycle_store'){
            if(type.length  === 0)
                type += 'Magasin de vélo';
            else
                type += ', Magasin de vélo';
        }
        else if(el === 'jewelry_store'){
            if(type.length  === 0)
                type += 'Bijouterie';
            else
                type += ', Bijouterie';
        }
        else if(el === 'florist'){
            if(type.length  === 0)
                type += 'Fleuriste';
            else
                type += ', Fleuriste';
        }
        else if(el === 'lawyer'){
            if(type.length  === 0)
                type += 'Avocat';
            else
                type += ', Avocat';
        }
        else if(el === 'accounting'){
            if(type.length  === 0)
                type += 'Expert-comptable';
            else
                type += ', Expert-comptable';
        }
        else if(el === 'finance'){
            if(type.length  === 0)
                type += 'Finance';
            else
                type += ', Finance';
        }
    });
    return type;
}
