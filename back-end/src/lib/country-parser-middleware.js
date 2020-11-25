'use strict';

import HttpError from 'http-errors';
import logger from './logger';

export default (request, response, next) => {
  console.log(request.body);
  if (!request.body.countryName) return next(new HttpError(400, 'improper request'));
  if (Object.keys(request.body).length !== 1) return next(new HttpError(400, 'improper request'));

  logger.log(logger.INFO, `Requested country to add: ${request.body.countryName}`);
  const country = request.body.countryName.toLowerCase();

  const startsWithTheRx = /(^(the )+[a-z]+)/g;

  if (country.match(startsWithTheRx) 
      || country === 'bahamas'
      || country === 'gambia') {
    logger.log(logger.INFO, 'Altering country request (starts with the)');

    if (country === 'bahamas') {
      request.body = { countryName: `${country}_the` };
      return next();
    }

    if (country.includes('netherlands')) {
      request.body = { countryName: 'netherlands' };
      return next();
    }

    request.body = { countryName: `${country.slice(4)}_the` };
    return next();
  }

  if (country.includes('congo')) {
    logger.log(logger.INFO, 'Altering country request (congo)');
    if (country.includes('democratic')) {
      request.body = { countryName: 'congo_democratic_republic_of_the' };
      return next();
    } 
    request.body = { countryName: 'congo_republic_of_the' };
    return next();
  }

  if (country === 'ivory coast' || country.includes('cote')) {
    logger.log(logger.INFO, 'Altering country request (ivory coast)');
    request.body = { countryName: "cote_d'_ivoire" };
    return next();
  }

  if (country === 'czech republic') {
    logger.log(logger.INFO, 'Altering country request (czech republic)');
    request.body = { countryName: 'czechia' };
    return next();
  }

  if (country.includes('korea')) {
    logger.log(logger.INFO, 'Altering country request (korea)');
    if (country.includes('north')) {
      request.body = { countryName: 'korea_north' };
      return next();
    }
    if (country.includes('south')) {
      request.body = { countryName: 'korea_south' };
      return next();
    }
  }

  return next();
};
