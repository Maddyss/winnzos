/**
 * Created by root on 29/08/16.
 */

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import '/imports/stylesheet/front/articles.css';

export default class CGCOMMERCANTS extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className="content cookies">
                <div className="section-heading">
                    <h2 className="heading-1 with-lines">Les Conditions générales Commerçants</h2>
                    <p>applicables à compter du 16/10/2016</p>
                </div>
                <div className="container">
                    <h3 className="article_surbrillance">ARTICLE 1.	PARTIES</h3>
                    <p className="article_paragraphe">Les présentes conditions générales sont applicables entre Winnzos, SAS, capital social : 1 000 €, RCS de RCS de La Roche-sur-Yon : 821 353 117, siège social : 3 allée Yacine Kateb, 79000 Niort, France, téléphone : +33972589029, email : contact@winnzos.fr, n° de TVA intracommunautaire : FR 82 821353117, ci-après « Winnzos.fr » et toute personne, physique ou morale, de droit privé ou de droit public, Commerçant de santé, inscrite sur le Site, ci-après le « Commerçant ».</p>
                    <h4 className="article_surbrillance">ARTICLE 2.	DEFINITIONS</h4>
                    <ul>
                        <li>« Abonnement » : droit d’accès temporaire aux Services.</li>
                        <li>« Donnée » : information de toute nature publiée par un Commerçant sur le Site.</li>
                        <li>« Utilisateur » : toute personne, physique ou morale, de droit privé ou de droit public, inscrite sur le Site afin de prendre rendez-vous avec un Commerçant.</li>
                        <li>« Internaute » : toute personne, physique ou morale, de droit privé ou de droit public, se connectant au Site.</li>
                        <li>« Commerçant » : toute personne, physique ou morale, de droit privé ou de droit public, Commerçant de santé, inscrite sur le Site pour y être référencé.</li>
                        <li>« Service » : service proposé par Winnzos.fr sur le Site consistant en le référencement du Commerçant sur le Site et la mise à disposition de différents outils. </li>
                        <li>« Site » : site internet accessible à l’URL www.Winnzos.fr, ainsi que les sous-sites, sites miroirs, portails et variations d’URL y afférant.</li>
                    </ul>
                    <h4 className="article_surbrillance">ARTICLE 3.	CHAMP D’APPLICATION</h4>
                    <p className="article_paragraphe">Le Site est d'accès libre et gratuit à tout Internaute. La navigation sur le Site suppose l'acceptation par tout Internaute des présentes conditions générales. La simple connexion au Site, par quelque moyen que ce soit, notamment par l'intermédiaire d'un robot ou d'un navigateur, emportera acceptation pleine et entière des présentes conditions générales.
                        Lors de l’inscription sur le Site, cette acceptation sera confirmée par le fait de cocher la case correspondant à la phrase suivante : « Je reconnais avoir lu et accepté les conditions générales d'utilisation et les conditions générales Commerçants ». L'Internaute reconnait du même fait en avoir pris pleinement connaissance et les accepter sans restriction.
                        Le fait de cocher la case susvisée sera réputé avoir la même valeur qu'une signature manuscrite de la part de l’Internaute. L'Internaute reconnait la valeur de preuve des systèmes d'enregistrement automatique de Winnzos.fr et, sauf pour lui d'apporter preuve contraire, il renonce à les contester en cas de litige.
                        Les présentes conditions générales sont applicables aux relations entre les parties à l’exclusion de toutes autres conditions, et notamment celles de l’Internaute.
                        L'acceptation des présentes conditions générales suppose de la part des Internautes qu'ils jouissent de la capacité juridique nécessaire pour cela, ou à défaut qu'ils en aient l'autorisation d'un tuteur ou d'un curateur s'ils sont incapables, de leur représentant légal s'ils sont mineurs, ou encore qu'ils soient titulaires d'un mandat s'ils agissent pour le compte d'une personne morale.
                    </p>
                    <h4 className="article_surbrillance">ARTICLE 4.	DESCRIPTION DES SERVICES</h4>
                    <h3 className="conclusion">Objet du Site</h3>
                    <p className="article_paragraphe">Le Site a pour objet de permettre aux Utilisateurs de trouver un Commerçant et de prendre rendez-vous avec ce Commerçant et aux Commerçants d’être référencés sur le Site et d’utiliser les Services.</p>
                    <h3 className="conclusion">Services</h3>
                    <p className="article_paragraphe">Le Commerçant ayant souscrit un Abonnement peut utiliser un certain nombre de Services proposés sur le Site, en fonction de l’Abonnement choisi. Le Commerçant aura notamment accès à :</p>
                    <ul>
                        <li>Un Service support permettant l’accès à un service de chat instantané ou de téléphone privilégié auprès du service clientèle de Winnzos.fr</li>
                        <li>Un Service de référencement, permettant au Commerçant d’apparaitre dans l’annuaire du Site</li>
                        <li>Un Service de prise de rendez-vous permettant au Commerçant de publier ses créneaux de disponibilité afin d’effectuer des rendez-vous avec les Utilisateurs </li>
                        <li>Un Service de contact instantané permettant au Commerçant de dialoguer en ligne avec un Utilisateur </li>
                        <li>Un Service formation permettant au Commerçant de se former aux outils logiciels de Winnzos.fr</li>
                    </ul>
                    <p className="article_paragraphe">La liste des Services n’est pas exhaustive et pourra faire l’objet d’ajout ou de suppression à la discrétion de Winnzos.fr. Chaque Service bénéficie d’une description complète sur le Site.</p>
                    <h3 className="conclusion">Prise de rendez-vous</h3>
                    <p className="article_paragraphe">Afin de prendre un rendez-vous, l’Utilisateur choisit un Commerçant dans l’annuaire du Site et envoi une demande de rendez-vous à l’aide du formulaire prévu à cet effet sur le Site. Lorsque le Commerçant reçoit cette demande, il s’engage à y répondre sous 24h ouvrées, soit en confirmant la date et l’horaire du rendez-vous, soit en en proposant un autre à l’Utilisateur en cas d’indisponibilité.</p>
                    <h4 className="article_surbrillance">ARTICLE 5.	OBLIGATIONS DU COMMERCANT</h4>
                    <h3 className="conclusion">Choix d’un Abonnement</h3>
                    <p className="article_paragraphe">L’accès au Site est gratuit, cependant, pour bénéficier de certains Services, le Commerçant devra souscrire à un Abonnement. Pour ce faire, le Commerçant devra remplir le formulaire prévu à cet effet sur le Site. </p>
                    <h3 className="conclusion">Validation du choix</h3>
                    <p className="article_paragraphe">Dans le cadre de la souscription d’un Abonnement, le Commerçant devra renseigner ses informations de facturation. Le Commerçant aura alors la faculté de vérifier l’Abonnement choisi, ainsi que son prix éventuel et sa durée. Si sa commande lui convient, il pourra la valider en cliquant sur le bouton prévu à cet effet sur le Site.</p>
                    <h3 className="conclusion">Paiement par le Commerçant</h3>
                    <p className="article_paragraphe">
                        Une fois la commande validée, les Commerçants seront invités à effectuer leur paiement en étant redirigés à cet effet sur l'interface de paiement sécurisée comportant la mention « commande avec obligation de paiement » ou toute formule analogue.
                    </p>
                    <h3 className="conclusion">Confirmation de la commande par Winnzos.fr</h3>
                    <p className="article_paragraphe">
                        Une fois le paiement effectivement reçu par Winnzos.fr, ce dernier s'engage à en accuser réception au Commerçant par voie électronique, dans un délai maximal de 24 heures. Dans le même délai, Winnzos.fr s'engage à adresser au Commerçant un courrier électronique récapitulatif de la commande et lui en confirmant le traitement, reprenant toutes les informations y afférant.
                    </p>
                    <h3 className="conclusion">Durée de l’Abonnement</h3>
                    <p className="article_paragraphe">L’Abonnement prend effet à compter de l’encaissement par Winnzos.fr du paiement correspondant du Commerçant.
                        La durée de l’Abonnement est celle mentionnée sur le Site au moment de la commande.
                        L’Abonnement est conclu pour une durée déterminée.

                    </p>
                    <h3 className="conclusion">Résiliation anticipée de l’Abonnement par Winnzos.fr</h3>
                    <p className="article_paragraphe">En cas de manquement du Commerçant à l’une quelconque des stipulations des présentes conditions générales, Winnzos.fr pourra résilier l’Abonnement de plein droit et sans intervention du juge. La résiliation de l’Abonnement au tort du Commerçant est sans préjudice des éventuels dommages-intérêts auxquels Winnzos.fr pourrait prétendre du fait du manquement du Commerçant</p>
                    <h3 className="conclusion">Charte de publication des Données</h3>
                    <p className="article_paragraphe">Le Commerçant s’engage en particulier à ne pas publier de Données sur le Site pouvant :</p>
                    <ul>
                        <li>porter atteinte ou avoir de propos contraires à l'ordre public, aux bonnes mœurs ou pouvant heurter la sensibilité des mineurs</li>
                        <li>porter atteinte de quelque manière que ce soit aux droits à la réputation, à la vie privée, au droit ou à l'image d’un tiers</li>
                        <li>être dénigrant, diffamatoire, porter atteinte à l'image, à la réputation d'une marque ou d'une quelconque personne physique ou morale, de quelque manière que ce soit</li>
                        <li>avoir de propos à caractère pornographique ou pédophile</li>
                        <li>porter atteinte à la sécurité ou à l'intégrité d'un Etat ou d'un territoire, quel qu'il soit</li>
                        <li>permettre à des tiers de se procurer des logiciels piratés, des numéros de série de logiciels ou tout logiciel pouvant nuire ou porter atteinte, de quelque manière que ce soit, aux droits ou aux biens des tiers</li>
                        <li>porter atteinte aux droits de propriété intellectuelle de quelque personne que ce soit</li>
                        <li>inciter à la haine, à la violence, au suicide, au racisme, à l'antisémitisme, à la xénophobie, à l'homophobie, faire l'apologie des crimes de guerre ou des crimes contre l'humanité</li>
                        <li>inciter à commettre un crime, un délit ou un acte de terrorisme</li>
                        <li>inciter à la discrimination d'une personne ou d'un groupe de personnes en raison de son appartenance à une ethnie, à une religion, à une race, ou du fait de son orientation sexuelle ou de son handicap</li>
                        <li>conseiller une pratique douteuse ou frauduleuse</li>
                    </ul>
                    <p>
                        Tout traitement, transmission, publication, diffusion ou représentation des Données par le Commerçant est effectué sous sa seule et entière responsabilité. Le Commerçant s'engage à ne pas entraver ou perturber le Site et les serveurs de Winnzos.fr et à se conformer aux conditions requises, aux procédures, aux règles générales qui lui sont communiquées par Winnzos.fr pour la publication des Données.
                        Tout usage illégal ou de manière générale non autorisé du Site entrainera la suppression immédiate du compte du Commerçant, sans préjudice des éventuels dommages-intérêts auxquels Winnzos.fr pourrait prétendre.
                        Le Commerçant garantit en conséquence Winnzos.fr contre tout dommage susceptible de lui être causé du fait de son utilisation du Site, en ce compris les éventuels frais d’avocat et de procédure, et s’engage à ce titre à intervenir à toute instance judiciaire engagée à son encontre du fait de son utilisation du Site.
                    </p>
                    <h3 className="conclusion">Déclarations du Commerçant</h3>
                    <p className="article_paragraphe">Le Commerçant assure avoir pris connaissance, préalablement à la signature du présent contrat, des caractéristiques techniques du Site et des prestations proposées par Winnzos.fr.
                        En conséquence, le Commerçant reconnait que ses besoins et les services proposés par Winnzos.fr sont en adéquation, qu’il a connaissance du contenu et des conditions d’exécution desdits services et qu’il a souscrit aux prestations fournies par Winnzos.fr en connaissance de cause et en disposant de toutes les informations nécessaires lui permettant de produire un consentement libre et éclairé.
                    </p>
                    <h3 className="conclusion">Autorisations</h3>
                    <p className="article_paragraphe">Le Commerçant est seul responsable des autorisations et déclarations relatives à la mise en place du Projet. Le Commerçant déclare qu’il dispose des droits et autorisations nécessaires à cette fin. Le cas échéant, le Commerçant déclare avoir effectué au préalable toute démarche nécessaire, telle que demandes d’autorisations et déclarations administratives. </p>
                    <p className="article_paragraphe">Le défaut de telles déclarations et autorisations ne pourra en aucun cas remettre en cause la validité du présent contrat. Le Commerçant restera notamment tenu de régler à Winnzos.fr les services commandés.</p>
                    <p className="article_paragraphe">Le Commerçant garantit Winnzos.fr contre tout recours qui serait entrepris à son encontre en cas de défaut de telles déclarations et autorisations. Il s’engage à ce titre à rembourser intégralement à Winnzos.fr tous les frais supportés en raison du défaut de déclarations et/ou d’autorisations.</p>
                    <h4 className="article_surbrillance">ARTICLE 6.	PRIX - PAIEMENT</h4>
                    <h3 className="conclusion">Prix</h3>
                    <p className="article_paragraphe">Les prix applicables sont ceux affichés sur le Site au jour de la commande. Ces prix peuvent être modifiés à tout moment par Winnzos.fr. Les prix affichés ne sont valables qu'au jour de la commande et ne portent pas effet pour l'avenir.
                       </p><p  className="article_paragraphe"> Les prix indiqués sur le Site sont entendus en euros, toutes taxes comprises, hors frais de livraison.
                    </p>
                    <h3 className="conclusion">Modalité de paiement</h3>
                    <p className="article_paragraphe">Le Commerçant peut effectuer son règlement par carte bancaire, Paypal, virement bancaire ou chèque bancaire. Les paiements par carte bancaire se font au moyen de transactions sécurisées fournies par BNP Paribas (Mercanet).
                    </p><p  className="article_paragraphe"> Dans le cadre des paiements par carte bancaire, Winnzos.fr n'a accès à aucune donnée relative aux moyens de paiement du Commerçant. Le paiement est effectué directement entre les mains de l'établissement bancaire.
                    <p  className="article_paragraphe">En cas de paiement par chèque ou virement bancaire, les délais de d’activation de l’Abonnement ne commencent à courir qu'à compter de la date de l’encaissement du paiement par Winnzos.fr.</p></p>
                    <h3 className="conclusion">Facturation</h3>
                    <p className="article_paragraphe">Winnzos.fr adressera ou mettra à disposition du Commerçant une facture par voie électronique après chaque paiement. Le Commerçant accepte expressément de recevoir les factures par voie électronique.</p>
                    <h3 className="conclusion">Défaut de paiement</h3>
                    <p className="article_paragraphe">Les dates de paiement convenues ne peuvent être retardées sous quelque prétexte que ce soit, y compris en cas de litige.</p>
                    <p className="article_paragraphe">Toute somme non payée à l’échéance donnera lieu, de plein droit et sans mise en demeure, à l’application de pénalités de retard calculées sur la base d’un taux égal à 3 fois le taux d’intérêt légal, sans que cette pénalité nuise à l’exigibilité des sommes dues en principal.</p>
                    <p className="article_paragraphe">En outre, tout retard de paiement aura pour conséquence la facturation au Commerçant défaillant de frais de recouvrement d'un montant de 40 euros, l’exigibilité immédiate de toutes les sommes restant dues quels que soient les délais convenus, majorées d’une indemnité de 20 % du montant à titre de clause pénale, ainsi que la possibilité de résilier le contrat unilatéralement au tort du Commerçant.</p>
                    <h4 className="article_surbrillance">ARTICLE 7.	ESPACE PERSONNEL</h4>
                    <h3 className="conclusion">Création de l’espace personnel</h3>
                    <p className="article_paragraphe">La création d'un espace personnel est un préalable indispensable à toute inscription d'un Commerçant sur le Site. A cette fin, le Commerçant sera invité à fournir un certain nombre d'informations personnelles. Certaines de ces informations sont réputées indispensables à la création de l'espace personnel. Le refus par un Commerçant de fournir lesdites informations aura pour effet d'empêcher la création de l'espace personnel ainsi que, incidemment, la souscription de l’Abonnement. </p>
                    <p className="article_paragraphe">Lors de la création de l'espace personnel, le Commerçant est invité à choisir un mot de passe. Ce mot de passe constitue la garantie de la confidentialité des informations contenues dans l’espace personnel. Le Commerçant s'interdit donc de le transmettre ou de le communiquer à un tiers. A défaut, Winnzos.fr ne pourra être tenu pour responsable des accès non autorisés à l’espace personnel d'un Commerçant.</p>
                    <p className="article_paragraphe">Le Commerçant s’engage à procéder à une vérification régulière des données qui le concernent et à procéder en ligne, depuis son espace personnel, aux actualisations et modifications nécessaires.</p>
                    <h3 className="conclusion">Contenu de l’espace personnel</h3>
                    <h3 className="conclusion">Généralité</h3>
                    <p className="article_paragraphe">L’espace personnel permet au Commerçant de gérer ses Services, de consulter ses statistiques et son historique ainsi que son calendrier de rendez-vous sur le Site.</p>
                    <p className="article_paragraphe">Les pages relatives aux espaces personnels sont librement imprimables par le titulaire du compte en question, mais ne constituent nullement une preuve admissible par un tribunal. Elles n'ont qu'un caractère informatif destiné à assurer une gestion efficace de ses commandes par le Commerçant.</p>
                    <p className="article_paragraphe">Winnzos.fr s'engage à conserver de façon sécurisée tous les éléments contractuels dont la conservation est requise par la loi ou la réglementation en vigueur.</p>
                    <h3 className="conclusion">Publication d'un profil public </h3>
                    <p className="article_paragraphe">Les Commerçants se voient offrir la faculté de se constituer un profil public sur le Site. Dans ce cadre, les Commerçants pourront renseigner un certain nombre d'informations personnelles les concernant. Tous les profils publics seront soumis à validation préalable de Winnzos.fr ou de son équipe de modérateurs avant leur première mise en ligne. </p>
                    <p className="article_paragraphe">Il est expressément entendu que le Commerçant, en décidant de souscrire aux services offerts par Winnzos.fr et en complétant la fiche relative à son profil public, reconnaît que ces données, et notamment sa photographie, sont susceptibles d'être publiées sur le Site et diffusées à ce titre auprès des autres Commerçants et Internautes. Le simple fait de fournir ces informations et de compléter les champs de la fiche de création du profil public emportera manifestation expresse de la volonté du Commerçant de publier lesdites informations sur le Site.</p>
                    <p className="article_paragraphe">Les Commerçants disposeront de la faculté de faire cesser la diffusion de leur profil public. Ils devront, pour cela, demander la suppression de leur compte Commerçant et la résiliation des services, en suivant la procédure prévue à cet effet. La suspension de la diffusion du profil public sera effective dans un délai maximal de 3 jours ouvrés à compter de la réception de la demande par Winnzos.fr.</p>
                    <h3 className="conclusion">Messagerie interne</h3>
                    <p className="article_paragraphe">Il est mis à disposition des Commerçants et Utilisateurs un service de messagerie privée interne. Ce système est réservé aux Commerçants et aux Utilisateurs et le secret des correspondances lui est applicable. </p>
                    <p className="article_paragraphe">Le contenu des boites de réception et d'envoi ne fait l'objet d'aucune garantie de conservation de la part de Winnzos.fr et il appartient aux Commerçants de sauvegarder lesdits contenus. La perte de ces contenus, quelle qu'en soit la cause, ne pourra constituer un dommage pour le Commerçant qui ne pourra prétendre à aucune indemnité de ce fait.</p>
                    <p className="article_paragraphe">Tout Commerçant qui sera victime d'abus (spams, publicités non souhaitées ou autre) pourra en informer Winnzos.fr qui prendra toutes mesures utiles. </p>
                    <h3 className="conclusion">Annuaire</h3>
                    <p className="article_paragraphe">Les Commerçants ont la possibilité de se faire référencer sur le Site. Les Commerçants souhaitant s'inscrire sur l’annuaire devront préalablement se constituer un espace personnel. Ils s'engagent à être, le cas échéant, parfaitement en règle de toutes les inscriptions et démarches auxquelles ils sont astreints en leur qualité de Commerçant.</p>
                    <p className="article_paragraphe">A ce titre, ils s'engagent à être en mesure de justifier à tout moment de :</p>
                    <ul>
                        <li>leur immatriculation au RCS ou au répertoire des métiers, le cas échéant</li>
                        <li>la souscription à une assurance responsabilité civile Commerçantle obligatoire, le cas échéant</li>
                        <li>la souscription à une assurance de garantie de responsabilité décennale, le cas échéant</li>
                        <li>la régularité des contrats de travail pour tous leurs salariés et préposés, le cas échéant </li>
                        <li>la régularité et le paiement de toutes les taxes et cotisations auxquelles ils sont assujettis</li>
                    </ul>
                    <p className="article_paragraphe">Winnzos.fr se réserve le droit de modérer ou refuser le référencement d'un Commerçant sur le Site sans que cela ne puisse constituer un dommage pour ledit Commerçant. Chacune des parties peut décider de la résiliation de ladite formule, le Commerçant par courrier électronique adressé à Winnzos.fr, Winnzos.fr en procédant à la clôture du compte par tous moyens sans avoir à justifier d'un quelconque motif ni du respect d'un quelconque formalisme.</p>
                    <h3 className="conclusion">Suppression de l’espace personnel</h3>
                    <p className="article_paragraphe">Winnzos.fr se réserve le droit de supprimer le compte de tout Commerçant qui contrevient aux présentes conditions générales, notamment lorsque le Commerçant fournit des informations inexactes, incomplètes, mensongères ou frauduleuses, ainsi que lorsque l’espace personnel d’un Commerçant sera resté inactif depuis au moins une année. Ladite suppression ne sera pas susceptible de constituer une faute de Winnzos.fr ou un dommage pour le Commerçant exclu, qui ne pourra prétendre à aucune indemnité de ce fait.</p>
                    <p className="article_paragraphe">Cette exclusion est sans préjudice de la possibilité, pour Winnzos.fr, d'entreprendre des poursuites d'ordre judiciaire à l'encontre du Commerçant, lorsque les faits l'auront justifié.</p>
                    <h4 className="article_surbrillance">ARTICLE 8.	RESPONSABILITE DE WINNZOS.FR</h4>
                    <h3 className="conclusion">Nature des obligations de Winnzos.fr</h3>
                    <p className="article_paragraphe">Winnzos.fr agit dans le cadre des présentes en qualité de prestataire technique totalement neutre mettant à disposition une plateforme électronique en ligne. Winnzos.fr n’est tenu que par une obligation de moyen concernant les Services de mises à disposition d’une plateforme électronique en ligne.</p>
                    <p className="article_paragraphe">Winnzos.fr ne joue aucun rôle actif qui lui permette d’avoir une connaissance ou un contrôle des Données transmises ou stockées. Il incombe au Commerçant d’exécuter lui-même ses engagements envers l’Utilisateur.</p>
                    <p className="article_paragraphe">En conséquence, Winnzos.fr n’est pas partie aux contrats conclus entre un Utilisateur et un Commerçant. Winnzos.fr n’est pas tenue par les obligations du Commerçant à l’égard de l’Utilisateur ni à celles de l’Utilisateur envers le Commerçant. Winnzos.fr ne garantit ni la réalisation ni la bonne exécution des rendez-vous prise entre l’Utilisateur et le Commerçant sur le Site. Winnzos.fr ne saurait être tenu pour responsable de l’absence ou du retard d’un Utilisateur et/ou d’un Commerçant lors d’un rendez-vous ni des frais médicaux facturés par le Commerçant lors de ce rendez-vous.</p>
                    <p className="article_paragraphe">Winnzos.fr n’est pas responsable des dommages que les Utilisateurs causeraient aux biens ou à la personne d’un Commerçant.</p>
                    <p className="article_paragraphe">Winnzos.fr ne saurait être tenu responsable en cas de blessure d’un Commerçant ou d’un Utilisateur ou de perte ou de destruction d’un objet personnel d’un Commerçant ou d’un Utilisateur dans le cadre d’un rendez-vous.</p>
                    <p className="article_paragraphe">Winnzos.fr ne garantit en aucun cas la qualité, la quantité ou la sécurité des services proposés par les Commerçants.</p>
                    <p className="article_paragraphe">En règle générale, Winnzos.fr ne saurait être tenu responsable pour tout litige ayant lieu entre le Commerçant et l’Utilisateur.</p>
                    <h3 className="conclusion">Force majeure - Faute du Commerçant</h3>
                    <p className="article_paragraphe">Winnzos.fr n'engagera pas sa responsabilité en cas de force majeure ou de faute du Commerçant, telles que définies au présent article :</p>
                    <h3 className="conclusion">Force majeure</h3>
                    <p className="article_paragraphe">Au sens des présentes conditions générales, sera considéré comme un cas de force majeure opposable au Commerçant tout empêchement, limitation ou dérangement du Service du fait d'incendie, d'épidémie, d'explosion, de tremblement de terre, de fluctuations de la bande passante, de manquement imputable au fournisseur d'accès, de défaillance des réseaux de transmission, d'effondrement des installations, d'utilisation illicite ou frauduleuse des mots de passe, codes ou références fournis au Commerçant, de piratage informatique, d'une faille de sécurité imputable à l'hébergeur du Site ou aux développeurs, d'inondation, de panne d'électricité, de guerre, d'embargo, de loi, d'injonction, de demande ou d'exigence de tout gouvernement, de réquisition, de grève, de boycott, ou autres circonstances hors du contrôle raisonnable de Winnzos.fr. Dans de telles circonstances, Winnzos.fr sera dispensé de l'exécution de ses obligations dans la limite de cet empêchement, de cette limitation ou de ce dérangement.</p>
                    <h3 className="conclusion">Faute du Commerçant</h3>
                    <p className="article_paragraphe">Au sens des présentes Conditions générales, sera considéré comme une faute du Commerçant opposable à ce dernier toute mauvaise utilisation du Service, faute, négligence, omission ou défaillance de sa part ou de celle de ses préposés, non-respect des conseils donnés par Winnzos.fr sur son Site, toute divulgation ou utilisation illicite du mot de passe, des codes et références du Commerçant, ainsi que le renseignement d’informations erronées ou l’absence de mise à jour de telles informations dans son espace personnel. Sera également considérée comme une faute du Commerçant la mise en œuvre de tout procédé technique, tels que des robots, ou des requêtes automatiques, dont la mise en œuvre contreviendrait à la lettre ou à l’esprit des présentes conditions générales de vente.</p>
                    <h3 className="conclusion">Problèmes techniques - Liens hypertextes</h3>
                    <p className="article_paragraphe">En cas d'impossibilité d'accès au Site, en raison de problèmes techniques de toutes natures, le Commerçant ne pourra se prévaloir d'un dommage et ne pourra prétendre à aucune indemnité. L'indisponibilité, même prolongée et sans aucune durée limitative, d'un ou plusieurs services en ligne, ne peut être constitutive d'un préjudice pour les Commerçants et ne peut aucunement donner lieu à l'octroi de dommages et intérêts de la part de Winnzos.fr. </p>
                    <p className="article_paragraphe">Les liens hypertextes présents sur le Site peuvent renvoyer sur d'autres sites internet. La responsabilité de Winnzos.fr ne saurait être engagée si le contenu de ces sites contrevient aux législations en vigueur. De même la responsabilité de Winnzos.fr ne saurait être engagée si la visite, par l'Internaute, de l'un de ces sites, lui causait un préjudice. </p>
                    <h3 className="conclusion">Dommages-intérêts à la charge de Winnzos.fr</h3>
                    <p className="article_paragraphe">A défaut de dispositions légales ou règlementaires contraires, la responsabilité de Winnzos.fr est limitée au préjudice direct, personnel et certain subi par le Commerçant et lié à la défaillance en cause. Winnzos.fr ne pourra en aucun cas être tenu responsable des dommages indirects tels que, notamment les pertes de données, les préjudices commerciaux, les pertes de commandes, les atteintes à l'image de marque, les troubles commerciaux et les pertes de bénéfices ou de clients. De même et dans les mêmes limites, le montant des dommages et intérêts mis à la charge de Winnzos.fr ne pourra en tout état de cause excéder le prix de l’Abonnement souscrit.</p>
                    <h3 className="conclusion">Responsabilité en qualité d'hébergeur</h3>
                    <p className="article_paragraphe">Les Données publiées sur le Site par le Commerçant le sont sous sa propre responsabilité.
                        Dans ce cadre, Winnzos.fr bénéficiera du statut d'hébergeur des données au sens de l'article 6-I-2 de la Loi pour la confiance dans l'économie numérique du 21 juin 2004. Conformément à l'alinéa 3 du même article, Winnzos.fr ne pourra voir sa responsabilité civile ou pénale engagée à raison de ces Données, à moins que, dès le moment où il a eu connaissance de l'activité ou de l'information illicite, il n'ait agi promptement pour retirer ces informations ou en rendre l'accès impossible.
                    </p>
                    <h4 className="article_surbrillance">ARTICLE 9.	DISPOSITIONS GENERALES</h4>
                    <h3 className="conclusion">Droit applicable</h3>
                    <p className="article_paragraphe">Les présentes conditions générales sont soumises à l'application du droit français. </p>
                    <h3 className="conclusion">Modifications des présentes conditions générales</h3>
                    <p className="article_paragraphe">Les présentes conditions générales peuvent être modifiées à tout moment par Winnzos.fr. Les conditions générales applicables au Commerçant sont celles en vigueur au jour de sa commande ou de sa connexion sur le présent Site, toute nouvelle connexion à l'espace personnel emportant acceptation le cas échéant des nouvelles conditions générales. </p>
                    <h3 className="conclusion">Litiges</h3>
                    <p className="article_paragraphe">En vertu de l’ordonnance n°2015-1033 du 20 août 2015, tous litiges qui pourraient survenir dans le cadre de l'exécution des présentes conditions générales et dont la solution n’aura pu être trouvée préalablement à l’amiable entre les parties devra être soumis à MEDIACONF : www.mediaconf.fr.   </p>
                    <p className="article_paragraphe">Tout litige relatif au présent contrat ou en relation avec celui-ci sera tranché par voie d’arbitrage conformément au règlement de l’Institut digital d’arbitrage et de médiation : www.fast-arbitre.com.</p>
                    <h3 className="conclusion">Entièreté</h3>
                    <p className="article_paragraphe">La nullité d'une des clauses du présent contrat n'entrainera pas la nullité des autres clauses du contrat ou du contrat dans sa globalité, qui garderont leur plein effet et portée. Dans une telle hypothèse, les parties devront dans la mesure du possible remplacer la stipulation annulée par une stipulation valable correspondant à l'esprit et à l'objet des présentes.</p>
                    <h3 className="conclusion">Non-renonciation</h3>
                    <p className="article_paragraphe">L'absence d'exercice par Winnzos.fr des droits qui lui sont reconnus par les présentes ne pourra en aucun cas être interprétée comme une renonciation à faire valoir lesdits droits.</p>
                    <h3 className="conclusion">Langues des présentes conditions générales</h3>
                    <p className="article_paragraphe">Les présentes conditions générales sont proposées en français.</p>
                </div>
            </div>
        )
    }

}