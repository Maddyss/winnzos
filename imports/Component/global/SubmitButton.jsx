import React, { PropTypes } from 'react';
import classNames from 'classnames';

const SubmitButton = ({
  children = 'Sauver les modifications',
  onSubmit,
  disabled = false,
}) => (
  <button
    className={classNames('btn', disabled ? 'gray' : 'red')}
    style={disabled ? { cursor: 'not-allowed' } : {}}
    type="submit"
    onSubmit={disabled ? () => {} : onSubmit}
  >{children}</button>
);
SubmitButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SubmitButton;
