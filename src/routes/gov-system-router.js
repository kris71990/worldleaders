'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
// import HttpError from 'http-errors';
import System from '../models/gov-system';
import logger from '../../src/lib/logger';
// import data from '../../data.json';

const jsonParser = json();
const govSystemRouter = new Router();

govSystemRouter.post('/system', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);
  console.log(request.body.country);

  return new System({
    country: request.body.country,
  }).save()
    .then((system) => {
      logger.log(logger.INFO, 'POST /system successful, returning 201');
      return response.status(201).json(system);
    })
    .catch(next);
});

export default govSystemRouter;
