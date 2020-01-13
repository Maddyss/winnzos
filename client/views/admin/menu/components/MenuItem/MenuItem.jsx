import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

const MenuItem = ({ path, title, icon, isVisible }) => {
  const routerState = FlowRouter.current();
  const isActive = path === routerState.path;
  if(isVisible===false){
    return <div></div>;
  }

  return (
    <li className={classNames('nav-item', isActive ? 'start active' : null)}>
      <a
        href={path}
        className="nav-link nav-toggle"
      >
        <i className={icon} />
        <span className="title">{title}</span>
        <span className="selected" />
      </a>
    </li>
  );
};
MenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isVisible : PropTypes.bool
};

export default MenuItem;
