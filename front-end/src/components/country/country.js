import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '../../graphql/queries/country';

import CountryBasic from '../country-basic/country-basic';
import CountryCulture from '../country-culture/country-culture';
import CountryEconomy from '../country-economy/country-economy';

import './country.scss';

function Country(props) {
  const [countryId, setCountryId] = useState(props.location.state.selected);
  const [country, setCountry] = useState({});
  const { countryList } = props.location.state;

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { id: countryId },
  });

  useEffect(() => {
    if (data) {
      setCountry(data);
      setCountryId(data.country._id);
    }
  }, [data]);
  
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className="country-info">
    { country && country.country
      ? <div>
          <CountryBasic selected={ country.country } existingCount={ countryList.length }/>
          <CountryCulture selected={ country.country }/>
          <CountryEconomy selected={ country.country } existingCount={ countryList.length }/>
        </div>
      : null
    }
    </div>
  );
}

Country.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  location: PropTypes.object,
  countryList: PropTypes.array,
};

export default Country;
