import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';
import gdp from './gdp';

export default combineReducers({ 
  countries, country, gdp,
});
