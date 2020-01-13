import React from 'react';
import { Clearfix } from 'react-bootstrap';

import OfficeHours from './components/OfficeHours/OfficeHours.jsx';
import DaysOff from './components/DaysOff/DaysOff.jsx';
import SingleDayOff from './components/SingleDayOff/SingleDayOff.jsx';
import SingleDaysOffList from './components/SingleDayOff/SingleDaysOffList.jsx';
import OffPeriod from './components/OffPeriod/OffPeriod.jsx';
import OffPeriodList from './components/OffPeriod/OffPeriodList.jsx';
import PublicHolydays from './components/PublicHolydays/PublicHolydays.jsx';
import "./TimeInfo.scss";

const TimeInfo = () => (
  <div>
    <OfficeHours />
    <Clearfix />
    <hr />
    <DaysOff />
    <Clearfix />
    <hr />
    <div className="col-sm-4">
      <SingleDayOff />
    </div>
    <div className="col-sm-8 border-left">
      <SingleDaysOffList />
    </div>
    <Clearfix />
    <hr />
    <div className="col-sm-4">
      <OffPeriod />
    </div>
    <div className="col-sm-8 border-left">
      <OffPeriodList />
    </div>
    <Clearfix />
    <hr />
    <PublicHolydays />
    <Clearfix />
  </div>
);
export default TimeInfo;
