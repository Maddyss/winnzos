import { Meteor } from 'meteor/meteor';

const Entreprise = new Mongo.Collection('enterprise');
const Notification = new Mongo.Collection('notification');
const FichePro = new Mongo.Collection('fichePro');
const ListeRegion = new Mongo.Collection('listeRegion');
const SuiviAchat = new Mongo.Collection('suiviAchat');
const CommuneParRegion = new Mongo.Collection('CommuneParRegion');

Notification.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

Notification.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Entreprise.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

Entreprise.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

FichePro.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

FichePro.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

CommuneParRegion.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

CommuneParRegion.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});


export { FichePro };
export { Notification };
export { Entreprise };
export { ListeRegion };
export { SuiviAchat };
export { CommuneParRegion };
