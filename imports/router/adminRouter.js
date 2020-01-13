import React from 'react';
import {mount} from 'react-mounter';
import {DocHead} from 'meteor/kadira:dochead';
import {userPro} from './utils/groupedRoutes';
// Layout
import Header from '../../client/views/header/header.jsx';
// Views
import PageProfileSettings from '../../client/views/profile/profile_user.jsx';
import DashBoard from '../../client/views/admin/dashboard.jsx';
import Applications from '../../client/views/admin/Applications/Applications.jsx';
import Agenda from '../../client/views/admin/Agenda/Agenda.jsx';
import PreOrder from '../../client/views/admin/paiement/preOrder';
import EmployeeManagement from '../../client/views/admin/employeemanagement/employeemanagement.jsx';
import ChatInstant from '../../client/views/admin/chatinstant/chatinstant.jsx';
import InfoRendezVous from '../../client/views/admin/Applications/components/RendezVous/InfoRendezVous';
import InfoChat from '../../client/views/admin/Applications/components/chatInstant/InfoChatInstant';
import InfoPDF from '../../client/views/admin/Applications/components/creationPDF/InfoPDF';
import InfoMarketing from '../../client/views/admin/Applications/components/emailMarketing/InfoEmailMarketing';
import InfoEmployee from '../../client/views/admin/Applications/components/employeemanagement/InfoEmploye';
import ShoppingCartPage from '../../client/views/admin/shoppingcart/shoppingcartpage.jsx';
import OrdersListPage from '../../client/views/admin/orders/orderslistpage';
import OrderConfirmation from '../../client/views/admin/paiement/confirmation.jsx';
import MyOffer from '../../client/views/admin/offer/myoffer.jsx';
import Essentiels from '../../client/views/admin/Essentiels/essentiels';
import InfoSurMesure from '../../client/views/admin/Applications/components/surMesure/infoSurMesure';


import NotFound from '/imports/Component/global/404.jsx';

// Static routes
[
    {
        url: '/page_user_profile', name: 'Votre compte',
        title: 'Votre compte Winnzos', component: PageProfileSettings,
    },
    {
        url: '/home_pro', name: 'DashBoard',
        title: 'Tableau de bord Winnzos', component: DashBoard,
    },
    {
        url: '/home_pro/applications', name: 'Applications',
        title: 'Winnzos Store', component: Applications,
    },
    {
        url: '/home_pro/employee', name: 'Rendez-Vous',
        title: 'Informations Applications Rendez-Vous', component: InfoEmployee,
    },
    {
        url: '/home_pro/emailMarketing', name: 'Email Marketing',
        title: 'Informations Applications Email Marketing. Réaliser des campagnes réussi.', component: InfoMarketing,
    },
    {
        url: '/home_pro/chatInstant', name: 'Conversations',
        title: 'Informations Applications réponder immédiatement au question client.', component: InfoChat,
    },
    {
        url: '/home_pro/devisFacture', name: 'Facture Devis',
        title: 'Informations Applications réaliser des devis et facture simplement.', component: InfoPDF,
    },
    {
        url: '/home_pro/rendezvous', name: 'Rendez-Vous',
        title: 'Informations Applications Rendez-Vous', component: InfoRendezVous,
    },
    {
        url: '/home_pro/surMesure', name: 'Projet',
        title: 'Parler nous de votre projet !', component: InfoSurMesure,
    },
    {
        url: '/home_pro/agenda', name: 'Agenda',
        title: 'Vos rendez-vous Winnzos', component: Agenda,
    },
    {
        url: '/home_pro/paiement', name: 'Paiement',
        title: 'Winnzos paiement', component: PreOrder,
    },
    {
        url: '/home_pro/my-offer', name: 'MyOffer',
        title: 'Mon abonnement', component: MyOffer,
    },
    {
        url: '/home_pro/employeemanagement', name: 'EmployeeManagement',
        title: 'Gestion des Employés', component: EmployeeManagement,
    },
    {
        url: '/home_pro/shoppingcart/', name: 'ShoppingCartPage',
        title: 'Panier', component: ShoppingCartPage,
    },
    //   {
    //       url: '/home_pro/orderdetail/:orderId', name: 'OrderDetailPage',
    //       title: 'Détail Commande', component: OrderDetailPage ,
    //   },
    {
        url: '/home_pro/order_confirmation', name: 'OrderConfirmation',
        title: 'Confirmation de commande', component: OrderConfirmation,
        validator: (params, query) => !!query.orderId
    },
    {
        url: '/home_pro/order_list', name: 'OrdersListPage',
        title: 'Vos commandes', component: OrdersListPage,
    },
    {
        url: '/home_pro/chat', name: 'ChatInstant',
        title: 'Communication en Temps Réel', component: ChatInstant,
        validator: (params) => true,
    },
    {
        url: '/home_pro/essentiels', name: 'Essentiels',
        title: 'Besoin essentiels d\'un commercant', component: Essentiels,
        validator: (params) => true,
    },
].forEach(r => userPro.route(r.url, {
    name: r.name,
    action(params, query) {
        DocHead.setTitle(r.title);
        const metaUrl = {name: 'url', content: `https://www.winnzos.fr${r.url}`};
        DocHead.addMeta(metaUrl);
        var Component = r.component;
        if (r.validator && !r.validator(params, query)) {
            console.log("Paramètres invalides", params);
            mount(Header, {content: <NotFound />});
        } else {
            mount(Header, {content: <Component params={params} query={query}/>});
        }
    },
}));
