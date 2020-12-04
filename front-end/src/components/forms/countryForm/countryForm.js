import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/client';
import ADD_COUNTRY from '../../../graphql/mutations';

import './countryForm.scss';

function CountryForm(props) {
  const [countryName, setCountryName] = useState('');
  const [countryNameDirty, setCountryNameDirty] = useState(false);
  const [countryNameError, setError] = useState('');

  const [addCountry, { data, error }] = useMutation(ADD_COUNTRY, { // eslint-disable-line
    variables: { countryName },
    onCompleted() {
      setCountryName('');
      setCountryNameDirty(false);
      setError('');
      props.history.push('/');
    },
    onError(error) { // eslint-disable-line
      setCountryNameDirty(true);
      setError(`Error: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setCountryName(e.target.value);
    setCountryNameDirty(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return addCountry(countryName);
  };

  return (
    <div className="country-container">
      <h4>{'Don\'t see a country? Add it here:'}</h4>
      { data && data.addCountry && !data.addCountry.success
        ? <p>{ data.addCountry.message }</p>
        :
          <form className="country-form" onSubmit={ handleSubmit }>
            <input
              className="country-name"
              name="countryName"
              placeholder="Enter a country"
              type="text"
              value={ countryName }
              onChange={ handleChange }
            />
            <button type="submit">Add</button>
          </form>
      }
      { countryNameDirty ? 
          <p>{ countryNameError }</p>
        : null
      }
    </div>
  );
}

CountryForm.propTypes = {
  history: PropTypes.object,
};

export default CountryForm;
