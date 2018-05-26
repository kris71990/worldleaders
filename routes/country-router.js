'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Country from '../models/country';
import logger from '../src/lib/logger';
import data from '../../data.json';

const jsonParser = json();
const countryRouter = new Router();

countryRouter.post('/countries', jsonParser, (request, response, next) => {
  const countryExists = Object.keys(data.countries).filter(key => key === request.body.countryName.toLowerCase());

  if (countryExists.length === 0) throw new HttpError(404, 'country does not exist');

  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);
  const countryInfo = data.countries[request.body.countryName].data.government;

  return new Country({
    countryName: request.body.countryName,
    headOfState: countryInfo.executive_branch.chief_of_state,
    headOfGovernment: countryInfo.executive_branch.head_of_government,
    typeOfGovernment: countryInfo.government_type,
  }).save()
    .then((country) => {
      logger.log(logger.INFO, 'POST /country successful, returning 201');
      return response.json(country);
    })
    .catch(next);
});

export default countryRouter;
