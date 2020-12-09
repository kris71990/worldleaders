import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COUNTRY } from '../../../graphql/mutations';

import { parseCountryName } from '../../../utils/parser';

import './countryForm.scss';

function CountryForm() {
  const [countryName, setCountryName] = useState('');
  const [countryNameDirty, setCountryNameDirty] = useState(false);
  const [countryNameError, setError] = useState('');
  const [countryAddSuccess, setSuccess] = useState('');

  const [addCountry, { data, error }] = useMutation(ADD_COUNTRY, { // eslint-disable-line
    variables: { countryName },
    onCompleted() {
      setCountryName('');
      setCountryNameDirty(false);
      setError('');
    },
    update(cache, { data: { createCountry } }) { // eslint-disable-line
      cache.modify({
        fields: {
          countries(existingCountries) {
            return [...existingCountries, createCountry];
          },
        },
      });
      setSuccess(`${parseCountryName(createCountry.countryName)} added`);
    },
    onError(error) { // eslint-disable-line
      setCountryNameDirty(true);
      setError(`Error: ${error.message}`);
      setSuccess('');
    },
  });

  const handleChange = (e) => {
    setCountryName(e.target.value);
    setCountryNameDirty(false);
    setSuccess('');
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
          <p id="error">{ countryNameError }</p>
        : null
      }
      { countryAddSuccess ? 
          <p id="success">{ countryAddSuccess }</p>
        : null
      }
    </div>
  );
}

export default CountryForm;
