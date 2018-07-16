import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';
import rankings from './rankings';
import systems from './systems';
import system from './system';

export default combineReducers({ 
  countries, country, rankings, systems, system,
});
