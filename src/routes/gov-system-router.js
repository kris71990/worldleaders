'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import System from '../models/gov-system';
import Country from '../models/country';
import logger from '../../src/lib/logger';
// import data from '../../data.json';

const jsonParser = json();
const govSystemRouter = new Router();

govSystemRouter.post('/system', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);
  
  if (!request.body.country || !request.body.countryName) {
    throw new HttpError(400, 'bad request - missing argument');
  }

  Country.findById(request.body.country)
    .then((country) => {
      if (country.countryName !== request.body.countryName) {
        throw new HttpError(400, 'bad request - incorrect country');
      } else {
        return new System({
          country: request.body.country,
          countryName: request.body.countryName,
        }).save()
          .then((system) => {
            logger.log(logger.INFO, 'POST /system successful, returning 201');
            return response.status(201).json(system);
          })
          .catch(next);
      }
    })
    .catch(next);
});

export default govSystemRouter;
