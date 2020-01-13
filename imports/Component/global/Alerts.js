import { Bert } from 'meteor/themeteorchef:bert';

const commonSettings = { style: 'growl-top-right' };

export const alertSuccess = ({ title }) =>
  Bert.alert(Object.assign(
    { type: 'success', icon: 'fa-check' },
    commonSettings,
    { title, message: '' }));

export const alertDanger = ({ title = 'Erreur serveur', message }) =>
Bert.alert(Object.assign(
  { type: 'danger', icon: 'fa-exclamation-triangle' },
  commonSettings,
  { title, message }));
