import React, { PropTypes } from 'react';
import classNames from 'classnames';

const PortletTabs = ({ title, items }) => (
  <div className="portlet light">
    <div className="portlet-title tabbable-line">
      <div className="caption caption-md">
        <span className="caption-subject font-blue-madison bold uppercase">{title}</span>
      </div>
      <ul className="nav nav-tabs">
        {
          items.map((i, idx) =>
            <li
              key={`tabtitle_${idx + 1}`}
              className={idx === 0 ? 'active' : null}
            >
              <a href={`#tab_${idx + 1}`} data-toggle="tab">{i.title}</a>
            </li>
          )
        }
      </ul>
    </div>
    <div className="portlet-body">
      <div className="tab-content">
        {
          items.map((i, idx) =>
            <div
              key={`tabcontent_${idx + 1}`}
              id={`tab_${idx + 1}`}
              className={classNames('tab-pane', { active: idx === 0 })}
            >
              {i.component}
            </div>
          )
        }
      </div>
    </div>
  </div>
);
PortletTabs.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default PortletTabs;
