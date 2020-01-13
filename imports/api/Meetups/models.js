import { weekDaysAsNumbers } from '/imports/constants/weekDays';

export const meetupTypes = ['Evénement', 'Rendez-vous', 'Indisponibilité'];

export const DayOff = {
  dayOff: {
     type: Number,
     label: 'Jour non ouvré',
     allowedValues: weekDaysAsNumbers
     },
};

export const Meetup = {
  proId: {
    type: String, label: 'Professionel', index: true,
  },
  userId: {
    type: String, label: 'Utilisateur', index: true, optional: true,
  },
  start: {
    type: Date, label: 'Démarrage', index: true,
  },
  end: {
    type: Date, label: 'Fin', index: true, optional: true,
  },
  allDay: {
    type: Boolean, label: 'Toute la journée', defaultValue: false,
  },
  type: {
    type: String, label: 'Type', allowedValues: meetupTypes, defaultValue: meetupTypes[0],
  },
  recipient: {
    type: String, label: 'Destinataire', optional: true, max: 512,
  },
  title: {
    type: String, label: 'Titre', min: 2, max: 255,
  },
  description: {
    type: String, label: 'Description', optional: true, max: 4096,
  },
  validatedStatus: {
    type: Boolean, label: 'Validé', optional: true,
  },
  prestationName: {
    type: String, label: 'Prestation', optional: true,
  },
  isActive: {
    type: Boolean, label: 'Actif', defaultValue : true,
  },
  cancelationReason: {
    type: String, label: 'Raison du refus', optional :true,
  },
  phoneNumber: {
      type: String, label: 'Numéro de téléphone', optional :true,
  },
};
