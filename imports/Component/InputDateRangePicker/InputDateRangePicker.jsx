import React, { PropTypes } from 'react';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import pick from 'lodash/pick';
import moment from 'moment';
import 'moment/locale/fr';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
import { weekDaysAsShortStringsSundayFirst } from '/imports/constants/weekDays';
import { monthsAsStrings } from '/imports/constants/months';

const formatDate = 'DD/MM/YYYY';

moment.locale('fr');

const dateFormater = (startDate, endDate) => {
  if (isNull(startDate) ||
    isUndefined(startDate) ||
    isNull(endDate) ||
    isUndefined(endDate)
  ) {
    return '';
  }
  return `${startDate.format(formatDate)} - ${endDate.format(formatDate)}`;
};

const InputDateRangePicker = ({ startDate, endDate, onChange }) => (
  <DateRangePicker
    applyClass="red"
    autoApply
    autoUpdateInput
    locale={{
      format: formatDate,
      separator: ' - ',
      applyLabel: 'Appliquer',
      cancelLabel: 'Annuler',
      fromLabel: 'À partir',
      toLabel: "Jusqu'à",
      customRangeLabel: 'Custom',
      weekLabel: 'S',
      daysOfWeek: weekDaysAsShortStringsSundayFirst,
      monthNames: monthsAsStrings,
      firstDay: 1,
    }}
    onApply={(e, picker) => onChange(pick(picker, ['startDate', 'endDate']))}
  >
    <input
      type="text"
      readOnly
      className="form-control"
      name="daterange"
      placeholder="Sélectionner la période à  désactiver"
      value={dateFormater(startDate, endDate)}
    />
  </DateRangePicker>
);
InputDateRangePicker.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
export default InputDateRangePicker;
