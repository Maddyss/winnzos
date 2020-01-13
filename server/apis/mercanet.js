import {Meteor} from 'meteor/meteor';
import querystring from "querystring";

import mercanetDataGenerator from '/imports/api/mercanet/mercanet-data-generator.js';

import Orders from '/imports/api/orders/index.js';
import {applyOrderAfterPayment} from '/imports/api/orders/server/methods.js';

export default function(){
    "use strict";

    console.log("Starting mercanet apis");

    WebApp.connectHandlers.use("/mercanet/callback", function(req, res, next) {

        var body = "";
        req.on('data', Meteor.bindEnvironment(function (data) {
            body += data;
        }));

        req.on('end', Meteor.bindEnvironment(function () {
            var decodedBody = querystring.parse(body);

            let data = decodedBody.Data;
            let seal = decodedBody.Seal;

            var response = mercanetDataGenerator.parseMercanetData(data);

            var orderId = response.transactionReference;
            check(orderId,String);
            var order = Orders.findOne(orderId);
            if(order && (response.amount/100).toFixed(2) === order.totalTtc.toFixed(2)){

                let modifier = {
                    mercanetResponseData : response,
                };

                if(response.responseCode === '00'){
                    console.log("Mercanet payment received");
                    modifier.status = 'paid';

                    try{
                        applyOrderAfterPayment(order);

                        Meteor.defer(()=>Meteor.call('emailOrderConfirmation',order));
                    }catch(e){
                        console.log(e);
                    }

                }else if(response.responseCode === '05'){
                    console.log("Mercanet payment rejected");
                    modifier.status = 'rejected';

                    Meteor.defer(()=>Meteor.call('emailOrderPaymentRejected',order));
                }else{
                    console.log("Unknown mercanet response code : "+response.responseCode);
                }
                console.log(modifier);
                Orders.update(orderId,{$set : modifier});
            }

            res.writeHead(200);
            res.end("Success");
        }));
    });
}