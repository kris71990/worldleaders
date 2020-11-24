'use strict';

import { Router } from 'express';
import Country from '../models/country';
import logger from '../lib/logger';

const rankingsRouter = new Router();

// REST - return array of languages spoken in the world, from most to least
// other rankings routes refactored to country gql api
rankingsRouter.get('/rankings-language-prevalence', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.find()
    .then((countries) => {
      logger.log(logger.INFO, 'GET /countries-languages, preparing to sort');

      const countryLanguages = countries.map((x) => {
        return x.languages.map((y) => {
          return y.name;
        });
      });

      const langs = [];
      countryLanguages.forEach((x) => {
        x.forEach((y) => {
          langs.push(y);
        });
      });

      const reduced = langs.reduce((all, z) => {
        if (z.toLowerCase().includes('english')) z = 'English';
        if (z.toLowerCase().includes('arabic')) z = 'Arabic';
        if (z.toLowerCase().includes('spanish')) z = 'Spanish';
        if (z.toLowerCase().includes('armenian')) z = 'Armenian';

        if (z in all) {
          all[z] += 1;
        } else {
          all[z] = 1;
        }
        return all;
      }, {});

      const sorted = Object.keys(reduced).map((key) => {
        return [key, reduced[key]];
      });

      const reallySorted = sorted.sort((x, y) => {
        return x[1] > y[1];
      });

      logger.log(logger.INFO, 'Returning object of most spoken languages in order');
      return response.json(reallySorted.reverse());
    })
    .catch(next);
});

export default rankingsRouter;
