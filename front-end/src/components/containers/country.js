import React from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch } from 'react-router-dom';

import Country from '../country/country';

const CountryContainer = (props) => {
  const { path } = useRouteMatch();
  const countryId = props.location.state.selected;

  return (
    <div>
      <Route 
        path={`${path}/${countryId}`} 
        render={ props => ( // eslint-disable-line
          <Country { ...props }/>
        )}
      />
    </div>
  );
};

CountryContainer.propTypes = {
  selected: PropTypes.object,
  location: PropTypes.object,
  countryList: PropTypes.array,
};

export default CountryContainer;
