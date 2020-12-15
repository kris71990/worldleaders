import React from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch } from 'react-router-dom';

import System from '../system/system';

const SystemContainer = (props) => {
  const { path } = useRouteMatch();
  const { selected } = props.location.state;

  return (
    <div>
      <Route 
        path={`${path}/${selected.countryName}`} 
        render={ props => ( // eslint-disable-line
          <System { ...props }/>
        )}
      />
    </div>
  );
};

SystemContainer.propTypes = {
  selected: PropTypes.object,
  location: PropTypes.object,
};

export default SystemContainer;
