import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './countryForm.scss';

function CountryForm(props) {
  const [countryName, setCountryName] = useState('');
  const [countryNameDirty, setCountryNameDirty] = useState(false);
  const [countryNameError, setError] = useState('');

  const handleChange = (e) => {
    setCountryName(e.target.value);
    setCountryNameDirty(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { countries } = props;

    // if (countries.includes(this.state.countryName)) {
    //   this.setState({ countryNameDirty: true });
    // } else {
    return props.onComplete({ countryName })
      .then(() => {
        setCountryName('');
        setCountryNameDirty(false);
        setError('');
      });
  };

  return (
    <div className="country-container">
      <h4>{'Don\'t see a country? Add it here:'}</h4>
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
        { countryNameDirty ? 
            <p>{ countryNameError }</p>
          : null
        }
      </form>
    </div>
  );
}

CountryForm.propTypes = {
  onComplete: PropTypes.func,
  countries: PropTypes.array,
};

export default CountryForm;
