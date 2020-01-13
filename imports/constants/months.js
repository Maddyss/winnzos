import moment from 'moment';
import 'moment/locale/fr';
import capitalize from 'lodash/capitalize';

moment.locale('fr');

export const monthsAsNumbers = Array.from(Array(12).keys(), i => i);

export const monthsAsStrings = monthsAsNumbers.map(m =>
  capitalize(moment().startOf('month').month(m).format('MMMM'))
);
