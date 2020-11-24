'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Country from '../models/country';
import System from '../models/gov-system';
import logger from '../lib/logger';

import { leaderUrlValidator, flagUrlValidator } from '../lib/url-validator';

const jsonParser = json();
const photoRouter = new Router();

photoRouter.post('/photos/flags', jsonParser, (request, response, next) => {
  if (Object.keys(request.body).length !== 2) return next(new HttpError(400, 'improper request'));
  if (!request.body.flagUrl) return next(new HttpError(400, 'improper request'));
  if (!flagUrlValidator(request.body.flagUrl)) return next(new HttpError(400, 'improper url'));

  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

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
  if (Object.keys(request.body).length !== 2) return next(new HttpError(400, 'improper request'));
  if (!request.body.leaderUrl) return next(new HttpError(400, 'improper request'));
  if (!leaderUrlValidator(request.body.leaderUrl)) return next(new HttpError(400, 'improper url'));

  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

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

photoRouter.post('/photos/hos', jsonParser, (request, response, next) => {
  if (Object.keys(request.body).length !== 2) return next(new HttpError(400, 'improper request'));
  if (!request.body.leaderUrl) return next(new HttpError(400, 'improper request'));
  if (!leaderUrlValidator(request.body.leaderUrl)) return next(new HttpError(400, 'improper url'));

  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return System.findById(request.body.systemId)
    .then((system) => {
      system.chiefOfStateImg = request.body.leaderUrl;
      system.save();
      logger.log(logger.INFO, 'Return updated data with new leader img');
      return response.json(system);
    })
    .catch((error) => {
      return next(error);
    });
});

export default photoRouter;
