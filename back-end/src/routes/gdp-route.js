'use strict';

import { Router } from 'express';
import Country from '../models/country';
import logger from '../../src/lib/logger';

const gdpRouter = new Router();

gdpRouter.get('/rankings-gdp', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.find()
    .then((countries) => {
      logger.log(logger.INFO, 'GET /countries/gdp, preparing to sort');

      const sorted = countries.sort((x, y) => {
        return x.gdpPPPRank - y.gdpPPPRank;
      });
      const filtered = sorted.map((x) => {
        return { countryName: x.countryName, id: x.id, gdpPPPRank: x.gdpPPPRank };
      });
      
      logger.log(logger.INFO, 'Returning countries in order of GDP PPP');
      return response.json(filtered);
    })
    .catch(next);
});

export default gdpRouter;
