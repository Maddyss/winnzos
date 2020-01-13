import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import Orders from '/imports/api/orders/index.js';

import lodash from "lodash";

import crypto from "crypto";



class MercanetDataGenerator{

    formatMoney (amount){
        return Math.floor(amount*100);
    };

    mercanetEncode(data){
        return _.map(data,(i,j)=>j+"="+i).join("|");
    }

    parseMercanetData(data){
       return _.object(data.split('|').map(i=>i.split('=')));
    }

    mercanetSeal(data){
        var sha256 = crypto.createHash("sha256");
        sha256.update(data+Meteor.settings.private.mercanet.secretKey, "utf8");
        var result = sha256.digest("hex");
        return result;
    }

    getDataForOrder(orderId){
        check(orderId, String);

        var order = Orders.findOne({_id : orderId});
        if(!order){
            throw new Error('Order not found');
        }

        var data = {
            amount : this.formatMoney(order.totalTtc),
            currencyCode : 978,
            merchantId : Meteor.settings.private.mercanet.merchantId,
            normalReturnUrl : Meteor.settings.private.applicationUrl+"/home_pro/order_confirmation/?orderId="+orderId+"&clearCart=true",
            transactionReference : orderId,
            keyVersion :Meteor.settings.private.mercanet.keyVersion,
            automaticResponseUrl : Meteor.settings.private.mercanet.callBackUrl
        };

        let encodedData = this.mercanetEncode(data);
        let mercanetData = {
            data : encodedData,
            interfaceVersion : Meteor.settings.private.mercanet.interfaceVersion,
            seal : this.mercanetSeal(encodedData),
            paymentUrl : Meteor.settings.private.mercanet.paymentUrl
        };

        Orders.update(orderId,{$set : {mercanetSentData : mercanetData}});

        return mercanetData
    }

}


export default new MercanetDataGenerator();