import React from "react";

export default function(props) {
    var order = props.order;
    switch (order.status) {
        case 'paid':
            return <span className="label label-success">Payée</span>
            break;
        case 'rejected':
            return <span className="label label-danger">Paiement refusé</span>
            break;
        case 'pending':
            return <span className="label label-default">En attente de paiement</span>
            break;
        case 'creating':
            return <span className="label label-default">Crée</span>
            break;
        default:
            return <span className="label label-default">???</span>
            break;
    }
}