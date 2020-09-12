import React from 'react';
import PropTypes from 'prop-types';

import * as parser from '../../utils/parser';

import './select-country.scss';

const SelectMenu = (props) => {
  const { 
    onClick, onChange, countries, value,
  } = props;

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
            ? countries.map((country) => {
              return (
                <option name={ country.countryName } value={ country.id } key={ country.id }>
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
