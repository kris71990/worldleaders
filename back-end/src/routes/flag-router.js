'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Country from '../models/country';
import logger from '../lib/logger';

const jsonParser = json();
const flagRouter = new Router();

flagRouter.post('/flags', jsonParser, (request, response, next) => {
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

export default flagRouter;
