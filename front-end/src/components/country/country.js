import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import CountryBasic from '../country-basic/country-basic';
import CountryCulture from '../country-culture/country-culture';
import CountryEconomy from '../country-economy/country-economy';

import * as countryActions from '../../actions/countryActions';
import { GET_COUNTRY } from '../../graphql/queries';
// import * as routes from '../../utils/routes';
import './country.scss';

function Country(props) {
  const [country, setCountry] = useState(props.location.state);

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { id: country.selected },
  });

  useEffect(() => {
    if (data) setCountry(data);
  }, [data]);
  
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className="country-info">
    {
      country 
        ? <div>
            <CountryBasic selected={ country } existingCount={ 1 }/>
            <CountryCulture selected={ country }/>
            <CountryEconomy selected={ country } existingCount={ 1 }/>
          </div>
        : null
    }
    </div>
  );
}

Country.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  existing: PropTypes.array,
  location: PropTypes.object,
  countryGet: PropTypes.func,
  countriesGetExisting: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selected: state.country,
    existing: state.countries.existing,
  };
};

const mapDispatchToProps = dispatch => ({
  countryGet: country => dispatch(countryActions.countryGetRequest(country.selected)),
  countriesGetExisting: () => dispatch(countryActions.countriesExistingFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
