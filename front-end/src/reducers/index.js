import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';

export default combineReducers({ 
  countries, country,
});
