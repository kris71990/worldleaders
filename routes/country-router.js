'use strict';

import { Router } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Country from '../models/country';
import logger from '../src/lib/logger';
import data from '../../data.json';

const jsonParser = json();
const countryRouter = new Router();

countryRouter.post('/countries', jsonParser, (request, response, next) => {
  return new Country({
    ...request.body,
  }).save()
    .then((country) => {
      logger.log(logger.INFO, 'POST /country successful, returning 201');
      return response.json(country);
    })
    .catch(next);
});


export default countryRouter;
