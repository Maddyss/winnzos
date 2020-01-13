import { primary } from '/imports/constants/colors';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const PrestationSettings = {
  name : {
    type : String,
  },
  duration : {
    type : Number
  }
}

const AgendaSettings = {
  automaticValidation: {
    type: Boolean,
    defaultValue: false,
    label: 'Validation automatique des rendez-vous',
  },
  color: {
    type: String,
    defaultValue: primary,
    label: 'Couleur des rendez-vous',
  },
  timeFrame: {
    type: String,
    defaultValue: '1h',
    allowedValues: ['15m','30m', '1h', '2h', '3h'],
    label: 'Créneaux horaires',
  },
  officeHourStart: {
    type: Date,
    defaultValue: new Date(1970, 1, 1, 6),
    label: "Horraire d'ouverture",
  },
  officeHourEnd: {
    type: Date,
    defaultValue: new Date(1970, 1, 1, 18),
    label: 'Horraire de fermeture',
  },
  morningHourEnd: {
    optional:true,
    type: Date,
    defaultValue: null,
    label: 'Horraire de fermeture le midi',
  },
  afternoonHourStart: {
    optional:true,
    type: Date,
    defaultValue: null,
    label: "Horraire de réouverture l'après midi",
  },
  prestations: {
    type : [new SimpleSchema(PrestationSettings)],
    defaultValue : [],
    label : 'Prestations',
  }
};

export default AgendaSettings;
