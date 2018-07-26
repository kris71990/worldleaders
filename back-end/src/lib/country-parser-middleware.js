'use strict';

import logger from './logger';

export default (request, response, next) => {
  logger.log(logger.INFO, `Requested country to add: ${request.body.countryName}`);
  const country = request.body.countryName.toLowerCase();

  const startsWithTheRx = /((the )+[a-z]+)/g;
  // const endsWithIslandsRx = /([a-z ]+(islands)$)/g;

  if (country.match(startsWithTheRx) || country === 'bahamas') {
    logger.log(logger.INFO, 'Altering country request (starts with the)');

    if (country === 'bahamas') {
      request.body = { countryName: `${country}_the` };
      return next();
    }
    request.body = { countryName: `${country.slice(4)}_the` };
    return next();
  }

  return next();
};
