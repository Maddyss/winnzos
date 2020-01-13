
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'

import pricingManager from '/imports/api/utils/pricingManager.js';

const subscriptionModes = {
    free:"free",
    comfort:"comfort",
    premium:"premium",
}

class ShoppingCartItem{
    constructor(data = {}){
        this.id = data.id || {};
        this.priceHt = data.priceHt || 0;
        this.description = data.description  || "";
        this.name = data.name  || "";
        this.priceTtc = data.priceTtc  || 0;
        this.duration = data.duration  || 0;
        this.option = data.option;

        this.priceHt = this.priceHt*1;
        this.priceTtc = this.priceTtc*1;
        this.duration = this.duration*1;
    }

    toString(){
        return `${this.name}`;
    }
}

class ShoppingCart{
    constructor(data = {}){
        this.items = (data.items || [] ).map(i=>new ShoppingCartItem(i));
        this.promotionCode = data.promotionCode;
    }
    _addItem(data){
        var index= this.items.findIndex(i=>i.id === data.id);
        if(index=== -1){
            this.items.push(new ShoppingCartItem(data));
        }else{
            this.items[index] = data;
        }
    }
    _removeItem(id){
        var index= this.items.findIndex(i=>i.id === id);
        if(index!==undefined){
            this.items.splice(index,1);
        }
    }
    _getItems(){
        return this.items;
    }
    _clear(){
        this.items = [];
    }

    _addPromotionCode({_id, code,discountPercent}){
        this.promotionCode = {_id, code,discountPercent};
    }

    _getPromotionCode(){
        return this.promotionCode;
    }

    _getTotals(){
        return pricingManager.computeOrderOrShoppingCartPrices(this.items,this.promotionCode);
    }

    _removePromotionCode(){
        delete this.promotionCode;
    }
}

class ShoppingCartService {

    constructor(){
        this.key = 'ShoppingCartSession';
        Session.setDefaultPersistent(this.key, new ShoppingCart());
    }

    _getCurrentShoppingCart(){
        return new ShoppingCart(Session.get(this.key));
    }


    addItem(data){
        var current = this._getCurrentShoppingCart();
        current._addItem(data);
        Session.setPersistent(this.key,current);
    }

    getItems(){
        var current = this._getCurrentShoppingCart();
        return current._getItems();
    }

    getPromotionCode(){
        var current = this._getCurrentShoppingCart();
        return current._getPromotionCode();
    }

    removeItem(id){
        var current = this._getCurrentShoppingCart();
        current._removeItem(id);
        Session.setPersistent(this.key,current);
    }

    clear() {
        var current = this._getCurrentShoppingCart();
        current._clear();
        Session.setPersistent(this.key,current);
    }

    addPromotionCode(code){
        var current = this._getCurrentShoppingCart();
        current._addPromotionCode(code);
        Session.setPersistent(this.key,current);
    }

    getTotals(){
        var current = this._getCurrentShoppingCart();
        return current._getTotals();
    }

    removePromotionCode(){
        var current = this._getCurrentShoppingCart();
        current._removePromotionCode();
        Session.setPersistent(this.key,current);
    }
}

let shoppingCartService = new ShoppingCartService();

if(window){
    window.shoppingCartService = shoppingCartService;
}

export default shoppingCartService;