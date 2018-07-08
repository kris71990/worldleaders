import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';
import rankings from './rankings';

export default combineReducers({ 
  countries, country, rankings,
});
