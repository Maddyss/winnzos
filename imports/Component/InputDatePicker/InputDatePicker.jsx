import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { weekDaysAsStringsSundayFirst } from '/imports/constants/weekDays';
import { monthsAsStrings } from '/imports/constants/months';

const InputDatePicker = props => (
  <DatePicker
    dateFormat="DD/MM/YYYY"
    dayLabels={weekDaysAsStringsSundayFirst}
    monthLabels={monthsAsStrings}
    {...props}
  />
);

export default InputDatePicker;
