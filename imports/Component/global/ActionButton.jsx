import React, { PropTypes } from 'react';

const ActionButton = ({ children, onClick }) => (
  <button
    className="btn red"
    onClick={onClick}
  >{children}</button>
);
ActionButton.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
