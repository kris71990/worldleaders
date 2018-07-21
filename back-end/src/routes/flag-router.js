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

  console.log(request);
  return null;
});

export default flagRouter;
