import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';
import { Match } from 'meteor/check';
import { DocHead } from 'meteor/kadira:dochead';
import { Accounts } from 'meteor/accounts-base';

//seo
import { configSEO } from './utils/seo';
import { concordanceRegion, concordanceActivites } from './utils/seo';

// structure de base
import HeaderLogin from '/client/views/header/headerLogin.jsx';
import HeaderFront from '/client/views/header/headerFront.jsx';
import ImageSource from '/client/views/global/imageSource.jsx';
import HeaderPro from '/client/views/header/headerPro.jsx';
import HeaderIframe from '/client/views/header/HeaderIframe.jsx';



// views
import PageProfileSettings from './../../client/views/profile/profile_user.jsx';
import UserSettings from '/client/views/front/settings.jsx';
import Contact  from './../../client/views/global/contact';
import Information  from './../../client/views/global/informations';
import DashBoard from '../../client/views/admin/dashboard.jsx';
import Applications from '../../client/views/admin/Applications/Applications.jsx';
import Agenda from '../../client/views/admin/Agenda/Agenda.jsx';
import Login from '../../client/views/profile/login.jsx';
import Register from '../../client/views/profile/register.jsx';
import Home from '../../client/views/front/home.jsx';
import ResultatDom from '../../client/views/front/resultat.jsx';
import FicheProDom from '../../client/views/front/fichePro.jsx';
import Chat from '../../client/views/front/chat/chatclient.jsx';
import ResetPassword from '/imports/Component/global/resetpassword.jsx';
import OffrePro  from './../../client/views/front/offrePro';
import Dematerialisation  from '/imports/Component/home/articles/dematerialisation';
import CommingSoon  from '/imports/Component/global/commingsoon.jsx';
import ParrainagePage from '../../client/views/front/Parrainage';
import Cookies from '../../client/views/global/cookies';
import FichePro from '/imports/Component/FichePro/FichePro.jsx';
import CGCommercants from '../../client/views/global/cgCommercants';
import Cgu from '../../client/views/global/cgu';
import Mlmu from '../../client/views/global/mlmu';
import InfoRendezVous from '../../client/views/admin/Applications/components/RendezVous/InfoRendezVous';
import InfoChat from '../../client/views/admin/Applications/components/chatInstant/InfoChatInstant';
import InfoPDF from '../../client/views/admin/Applications/components/creationPDF/InfoPDF';
import InfoMarketing from '../../client/views/admin/Applications/components/emailMarketing/InfoEmailMarketing';
import InfoEmployee from '../../client/views/admin/Applications/components/employeemanagement/InfoEmploye';
import InfoPro from '/imports/Component/resultPro/infoPro.jsx';
import Idee from '/client/views/global/idee';
import Visibility from '/client/views/global/visibilite';
import Suivi from '/client/views/global/accompagnement';
import Client from '/client/views/global/client';
import Other from '/client/views/global/other';
import Stats from '/client/views/global/stats';
import ListeCommune from '/client/views/referencement/RefRegion';
import ListeActivite from '/client/views/referencement/RefActiviteCommune';
import ConversationBot from '/client/views/front/WinnBotClient/convWinnBot';
import RendezVousClient from '/imports/Component/resultPro/RendezVousClient.jsx';
import Iwinn from '/imports/Component/global/iwinn.jsx';


const exposed = FlowRouter.group();

exposed.route('/page_login', {
  name: 'Connection',
  action() {
    DocHead.setTitle('Connection Winnzos');
    const metaUrl = { name: 'url', content: 'https://www.winnzos.fr/page_login' };
    DocHead.addMeta(metaUrl);
    mount(HeaderLogin, { content: <Login /> });
  },
});

exposed.route('/register', {
  name: 'Inscription',
  action() {
    DocHead.setTitle('Inscription Winnzos');
    const metaUrl = { name: 'url', content: 'https://www.winnzos.fr/register' };
    DocHead.addMeta(metaUrl);
    mount(HeaderLogin, { content: <Register /> });
  },
});

exposed.route('/', {
  action() {
    configSEO('', 'Winnzos : un annuaire d\'entreprise de proximité qui répond à vos questions !',
        "Vous cherchez un coiffeur, un boulanger, un artisan ou un coach sportif prêt de chez vous. Retrouvez toutes ces entreprises de services sur Winnzos.fr. C'est gratuit et vous obtenez une réponse immédiate. N'attendez venez découvrir l'annuaire Winnzos.", "/front/logo-winnzos.png" );
    mount(HeaderFront, { content: <Home /> });
  },
});

exposed.route('/annuaire/:regionId/plan', {
    name: 'Liste des résultats',
    action(params, queryParams) {
        check(parseInt(params.regionId), Match.Integer);
        let NameRegion = concordanceRegion(parseInt(params.regionId));
        configSEO(`/annuaire/${params.regionId}`, `${NameRegion} trouvez un professionnel`,
            `Trouvez un coiffeur ou un boulanger ou encore un coach sportif dans la région ${NameRegion} et prenez rendez-vous ou contactez là. Simplement récupérez adresse et numéro de téléphone de l'entreprise de votre choix. Réponse immédiate.`, "/front/logo-winnzos.png");
        mount(HeaderFront, {content: <ListeCommune regionId={params.regionId}/>});
    }
});

exposed.route('/annuaire/:regionId/:nomVille/activite', {
    name: 'Liste des résultats',
    action(params, queryParams) {
        check(parseInt(params.regionId), Match.Integer);
        check(params.nomVille, String);
        let NameRegion = params.nomVille;
        configSEO(`/annuaire/${params.regionId}/${params.nomVille}/activite`, `Trouvez une entreprise sur la commune de ${params.nomVille}`,
            `Retrouvez toutes les activités sur la commune de ${params.nomVille}. Ou simplement récupérez adresse et numéro de téléphone des entreprises.`, "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <ListeActivite regionId={params.regionId} nomVille={params.nomVille} /> });
    },
});


exposed.route('/annuaire/:regionId', {
    name: 'Liste des résultats',
    action(params, queryParams) {
        check(parseInt(params.regionId), Match.Integer);
        let NameRegion = concordanceRegion(parseInt(params.regionId));
        configSEO(`/annuaire/${params.regionId}`, `${NameRegion} trouvez le service adéquat`,
            `Trouvez un coiffeur ou un boulanger ou encore un coach sportif dans la région ${NameRegion} et prenez rendez-vous ou contactez là. Simplement récupérez adresse et numéro de téléphone de l'entreprise de votre choix. Réponse immédiate.`, "/front/logo-winnzos.png");
        mount(HeaderFront, {content: <ResultatDom regionId={params.regionId} activite={queryParams.activite}/>});
    }
});

exposed.route('/annuaire/:regionId/:nomVille/:activiteId', {
    name: 'Liste des résultats',
    action(params, queryParams) {
        check(parseInt(params.regionId), Match.Integer);
        check(params.nomVille, String);
        check(params.activiteId, String);
        let NameRegion = params.nomVille;
        let NomActivite = concordanceActivites(params.activiteId);
        configSEO(`/annuaire/${params.regionId}/${params.nomVille}/${params.activiteId}`, `${NomActivite.title} ${NameRegion} ${NomActivite.title2}`,
            `${NomActivite.description} ${NameRegion} ${NomActivite.description2}. Ou simplement récupérez adresse et numéro de téléphone des entreprises.`, "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <ResultatDom regionId={params.regionId} activite={params.activiteId} nomVille={params.nomVille} /> });
    },
});

exposed.route('/annuaire/:regionId/:nomVille', {
    name: 'Liste des résultats',
    action(params, queryParams) {
        check(parseInt(params.regionId), Match.Integer);
        check(params.nomVille, String);
        let NameRegion = params.nomVille;
        let NomActivite = concordanceActivites('Autre');
        configSEO(`/annuaire/${params.regionId}/${params.nomVille}/${params.activiteId}`, `${NomActivite.title} ${NameRegion}`,
            `${NomActivite.description} ${NameRegion} ${NomActivite.description2}. Ou Simplement récupérez adresse et numéro de téléphone des entreprises.`, "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <ResultatDom regionId={params.regionId} activite={params.activiteId} nomVille={params.nomVille} /> });
    },
});


exposed.route('/articles/dematerialisation', {
    name: 'Winnzos - Actualités économiques, financières',
    action(params) {
        configSEO(`/articles/dematerialisation`, `La dématérialisation sources d'économies `,
            `86 pourcent c’est le pourcentage des Français favorables à la dématérialisation des documents. Winnzos vous permet de diminuer vos coûts papier et de vous simplifiez la vie. Venez découvrir l'importance de dématérialiser vos actions. `, "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <Dematerialisation /> });
    },
});

exposed.route('/parrainage', {
    name: 'Parrainez vos entreprises pour simplifier vos démarches. ',
    action(params) {
        configSEO(`/parrainage`, `Parrainez vos entreprises pour simplifier vos démarches. `,
            `Winnzos vous permet de trouver les entreprises proche de chez vous et prendre rendez-vous directement en ligne. Donnez-nous le nom de votre entreprise (coiffeur, boulanger, médecin, coach sportif ...), nous nous occupons du reste !`, "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <ParrainagePage /> });
    },
});

exposed.route('/pro/:proName', {
  name: ':proName',
  action(params, queryParams) {
    check(params.proName, String);
    configSEO(`/pro/${params.proName}`, `${params.proName}`,
        `L'entreprise ${params.proName} vous attend ! Trouvez son adresse, numéro de téléphone et actualitées sur l'entreprise ${params.proName}. Plus encore prise de rendez-vous, demande de devis ou simple question. Gratuit et immédiat. `, "/front/logo-winnzos.png" );
      if(!queryParams.pro)
          queryParams.pro = '';
      if(!queryParams.utile)
          queryParams.utile = '';
      mount(HeaderFront, {
          content: <FicheProDom proName={params.proName} pro={queryParams.pro} proId={queryParams.utile}><InfoPro /> </FicheProDom>,
      });
  },
});

exposed.route('/pro/chat/:proName', {
    name: ':proName',
    action(params, queryParams) {
        check(params.proName, String);
        configSEO(`/pro/chat/${params.proName}`, `Communiquez avec l'entreprise ${params.proName}`,
            `L'entreprise ${params.proName} vous attend ! Elle répond à vos questions en direct.`, "/front/logo-winnzos.png" );

        if(!queryParams.proId)
            queryParams.proId = '';

        mount(HeaderFront, {
            content: <FicheProDom><Chat proName={params.proName} proId={queryParams.proId} /> </FicheProDom>,
        });
    },
});


exposed.route('/contact', {
  name: 'Contactez-nous - Winnzos',
  action() {
    configSEO(`/contact`, `Contactez-nous - Winnzos`,
        `Partenariat, Demande de devis, candidature, demande de renseignements, Winnzos vous répond.`, "/front/logo-winnzos.png" );
    mount(HeaderFront, { content: <Contact /> });
  },
});

exposed.route('/winnzos-pro', {
  name: 'Winnzos Pro',
  action() {
    configSEO(`/winnzos-pro`, `Winnzos Pro : Découvrez les offres exclusives !`,
        `Connectez-vous avec vos clients comme jamais ! Des applications adaptées - Prise de rendez-vous - Contact - Email marketing - Réalisation de devis - Réalisation de Facture - Statistiques. Un ensemble d'outil pour développer vos ventes, fidéliser vos clients et accroitre votre activité.`, "/front/logo-winnzos.png" );
    mount(HeaderPro, { content: <OffrePro /> });
  },
});

exposed.route( '/verify-email/:token', {
    name: 'verify-email',
    action( params ) {
        Accounts.verifyEmail( params.token, ( error ) =>{
            if ( error ) {
                Bert.alert( error.reason, 'danger' );
            } else {
                FlowRouter.go( '/' );
                Bert.alert( 'Votre Email est vérifié merci !', 'success' );
            }
        });
    }
});

exposed.route( '/reset-password/:token', {
    name: 'reset-motpasse',
    action( params ) {
        DocHead.setTitle('Récupération du mot de passe Winnzos');
        const metaUrl = { name: 'url', content: 'https://www.winnzos.fr/lostPassword' };
        DocHead.addMeta(metaUrl);
        mount(HeaderFront, {content: <ResetPassword token={params.token} />});
    }
});

exposed.route('/cookies', {
    action() {
        configSEO('/cookies', 'Winnzos : informations sur les cookies !',
            'Retrouver en détails toutes les informations sur l\'utilisation des cookies.', "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <Cookies /> });
    },
});

exposed.route('/cgcommercants', {
    action() {
        configSEO('/cgcommercants', 'Winnzos : condition générale commercant ',
            '', "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <CGCommercants /> });
    },
});


exposed.route('/condG', {
    action() {
        configSEO('/condG', 'Winnzos : condition générale',
            '', "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <Cgu /> });
    },
});


exposed.route('/mentionL', {
    action() {
        configSEO('/mentionL', 'Winnzos : mention légale',
            '', "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <Mlmu /> });
    },
});

exposed.route('/rendezvous', {
    action() {
        configSEO('/rendezvous', 'Winnzos : Prise de rendez-vous en ligne en quelques clics',
            'Une application de prise de rendez-vous en ligne en quelques clics disponible 24h/24. Essai gratuit. Découvrez la prise de rendez-vous en ligne !', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <InfoRendezVous info={true} /> });
    },
});

exposed.route('/devisFacture', {
    action() {
        configSEO('/devisFacture', 'Winnzos : Réalisez un Devis ou une Facture en ligne',
            'Réalisez rapidement vos Devis ou vos Factures en ligne en quelques clics disponible 24h/24. Essai gratuit. Découvrez l\'application Devis, Facture en ligne !', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <InfoPDF info={true} /> });
    },
});

exposed.route('/chatInstant', {
    action() {
        configSEO('/chatInstant', 'Winnzos : Joignez instantanément, et gratuitement un professionnel',
            'Restez joignable à tout moment et offrez un service client simple et rapide à vos clients. Découvrez l\'application contact en ligne !', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <InfoChat info={true} /> });
    },
});

exposed.route('/emailMarketing', {
    action() {
        configSEO('/emailMarketing', 'Winnzos : Réalisez des campagnes Marketing facilement',
            'Réalisez en quelques secondes des campagnes Marketing et augmentez vos ventes. Découvrez l\'application campagnes Marketing en ligne !', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <InfoMarketing info={true} /> });
    },
});

exposed.route('/employee', {
    action() {
        configSEO('/employee', 'Winnzos : Gérez la visibilité de tous vos employés',
            'Communiquez sur votre entreprise et vos employés et dynamisez votre visibilité sur internet.', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <InfoEmployee info={true} /> });
    },
});
exposed.route('/settings', {
    action() {
        configSEO('/settings', 'Winnzos : vos paramètres',"", "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <UserSettings /> });
    },
});

exposed.route('/idee', {
    action() {
        configSEO('/idee', 'Winnzos : Améliorez votre visibilité sur internet',
            "Prise de RDV en ligne 24h/24 et 7j/7. Organisez, améliorez et pilotez plus efficacement votre entreprise au quotidienen ligne en France sur Winnzos. Winnzos est un annuaire complet qui vous permet de gérez éfficacement vos tâches quotidienne sans effort et d'améliorez votre relation client.", "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Idee /> });
    },
});


exposed.route('/visibilite', {
    action() {
        configSEO('/visibilite', 'Créons ensemble votre identitée',
            '', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Visibility /> });
    },
});

exposed.route('/client', {
    action() {
        configSEO('/client', 'Winnzos : Gérez la visibilité de tous vos employés',
            'Communiquez sur votre entreprise et vos employés et dynamisez votre visibilité sur internet.', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Client /> });
    },
});

exposed.route('/accompagnement', {
    action() {
        configSEO('/accompagnement', 'Winnzos : Gérez la visibilité de tous vos employés',
            'Communiquez sur votre entreprise et vos employés et dynamisez votre visibilité sur internet.', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Suivi /> });
    },
});

exposed.route('/statistiques', {
    action() {
        configSEO('/idee', 'Winnzos : Gérez la visibilité de tous vos employés',
            'Communiquez sur votre entreprise et vos employés et dynamisez votre visibilité sur internet.', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Stats /> });
    },
});

exposed.route('/iwinn', {
    action() {
        configSEO('/iwinn', 'iWinn : un chatbot qui s\'occupe de votre service client comme un pro' ,
            'iWinn s\'intègre sur votre page Facebook pour répondre immédiatement à vos clients.' , "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Iwinn /> });
    },
});


exposed.route('/autres', {
    action() {
        configSEO('/idee', 'Winnzos : Gérez la visibilité de tous vos employés',
            'Communiquez sur votre entreprise et vos employés et dynamisez votre visibilité sur internet.', "/front/logo-winnzos.png" );
        mount(HeaderPro, { content: <Other /> });
    },
});

/*
exposed.route('/WinnBot', {
    action() {
        configSEO('/idee', 'Retrouvez WinnBot un Agent disponnible 24h/24 et 7j/7',
            'Communiquez sur votre entreprise et vos employés et dynamisez votre visibilité sur internet.', "/front/logo-winnzos.png" );
        mount(HeaderFront, { content: <ConversationBot /> });
    },
});*/

exposed.route('/rdv/:proName', {
    name: ':proName',
    action(params, queryParams) {
        check(params.proName, String);
        configSEO(`/pro/${params.proName}`, `${params.proName}`,
            `L'entreprise ${params.proName} vous attend ! Trouvez son adresse, numéro de téléphone et actualitées sur l'entreprise ${params.proName}. Plus encore prise de rendez-vous, demande de devis ou simple question. Gratuit et immédiat. `, "/front/logo-winnzos.png" );
        if(!queryParams.pro)
            queryParams.pro = '';
        if(!queryParams.utile)
            queryParams.utile = '';
        mount(HeaderIframe, { content:<RendezVousClient proName={params.proName} pro={queryParams.pro} proId={queryParams.utile} ><InfoPro /> </RendezVousClient>});
    },
});