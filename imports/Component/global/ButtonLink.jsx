import React, { PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

const ButtonLink = ({ children, routeName }) => (
  <a
    className="btn red"
    href={FlowRouter.path(routeName)}
  >{children}</a>
);
ButtonLink.propTypes = {
  children: PropTypes.any.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default ButtonLink;
