import moment from 'moment';
import 'moment/locale/fr';
import capitalize from 'lodash/capitalize';

moment.locale('fr');

export const weekDaysAsNumbers = Array.from(Array(7).keys(), idx => idx + 1);

export const weekDaysAsStrings = weekDaysAsNumbers.map(d => moment().isoWeekday(d).format('dddd'));

export const weekDaysAsShortStrings = weekDaysAsNumbers.map(d => moment().isoWeekday(d).format('ddd'));

export const weekDaysAsStringsSundayFirst = [
  weekDaysAsStrings.slice(-1), ...weekDaysAsStrings.slice(0, -1),
];

export const weekDaysAsShortStringsSundayFirst = [
  weekDaysAsShortStrings.slice(-1), ...weekDaysAsShortStrings.slice(0, -1),
];

export const weekDayNumberToString = (day, isCapitalize = true) => {
  const weekDay = weekDaysAsStrings[day - 1];
  if (isCapitalize) {
    return capitalize(weekDay);
  }
  return weekDay;
};

export const weekDayStringToNumber = (day) => {
  return weekDaysAsStrings.map(i=>i.toLowerCase()).indexOf(day.toLowerCase())+1;
};
