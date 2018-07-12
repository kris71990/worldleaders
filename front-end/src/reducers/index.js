import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';
import rankings from './rankings';
import systems from './systems';

export default combineReducers({ 
  countries, country, rankings, systems,
});
