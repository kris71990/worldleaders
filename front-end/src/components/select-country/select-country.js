import React from 'react';
import PropTypes from 'prop-types';

import * as parser from '../../utils/parser';

import './select-country.scss';

const SelectMenu = (props) => {
  const { 
    onClick, onChange, countries, value,
  } = props;

  const alphabetize = () => {
    return countries.slice().sort((a, b) => {
      return a.countryName.localeCompare(b.countryName);
    });
  };

  return (
    <div>
      <h2>Choose a country</h2>
      <div className="country-list">
        <select 
          className="country-select" 
          value={ value }
          onChange={ onChange }>

          <option value="empty">Select</option>
          { countries
            ? alphabetize().map((country) => {
              return (
                <option name={ country.countryName } value={ country._id } key={ country._id }>
                  { parser.parseCountryName(country.countryName) }
                </option>
              );
            })
            : null
          }
        </select>
        <button onClick={ onClick }>Find</button>
      </div>
    </div>
  );
};

SelectMenu.propTypes = {
  countries: PropTypes.array,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SelectMenu;
