import React, { PropTypes } from 'react';
import './EventAgenda.css';

const EventAgenda = ({ event }) => (
  <span className="wzEventAgenda">
    <strong>{event.title}</strong>
    {event.desc ? <em><br />{event.desc}</em> : null}
    <hr />
  </span>
);
EventAgenda.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventAgenda;
