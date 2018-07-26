'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Country from '../models/country';
import System from '../models/gov-system';
import logger from '../lib/logger';

const jsonParser = json();
const photoRouter = new Router();

photoRouter.post('/photos/flags', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  if (request.body.flagUrl.slice(0, 29) !== 'https://upload.wikimedia.org/' 
    || !request.body.flagUrl.includes('Flag_of_')) {
    throw new HttpError(400, 'improper url');
  }

  return Country.findById(request.body.countryId)
    .then((country) => {
      country.flagUrl = request.body.flagUrl;
      country.save();
      logger.log(logger.INFO, 'Return updated data with flag image');
      return response.json(country);
    })
    .catch((error) => {
      return next(error);
    });
});

photoRouter.post('/photos/hog', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  if (request.body.leaderUrl.slice(0, 29) !== 'https://upload.wikimedia.org/') {
    throw new HttpError(400, 'improper url');
  }

  return System.findById(request.body.systemId)
    .then((system) => {
      system.headOfGovernmentImg = request.body.leaderUrl;
      system.save();
      logger.log(logger.INFO, 'Return updated data with new leader img');
      return response.json(system);
    })
    .catch((error) => {
      return next(error);
    });
});

export default photoRouter;
