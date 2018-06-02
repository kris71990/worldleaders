'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import System from '../models/gov-system';
import Country from '../models/country';
import logger from '../../src/lib/logger';
import data from '../../data.json';

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
      } else if (country.hasLinkedSystem) {
        throw new HttpError(400, 'bad request - system already exists for this country');
      } else {
        country.hasLinkedSystem = true;
        country.save();

        const searchableCountry = request.body.countryName.replace(' ', '_').toLowerCase();
        const governmentInfo = data.countries[searchableCountry].data.government;
        const coordinatesLat = governmentInfo.capital.geographic_coordinates.latitude;
        const coordinatesLon = governmentInfo.capital.geographic_coordinates.longitude;

        const latArr = [1, 2, 3];
        const lonArr = [1, 2, 3];
        Object.keys(coordinatesLat).forEach((x) => {
          if (x === 'degrees') {
            latArr[0] = coordinatesLat[x];
            lonArr[0] = coordinatesLon[x];
          }
          if (x === 'minutes') {
            latArr[1] = coordinatesLat[x];
            lonArr[1] = coordinatesLon[x];
          }
          if (x === 'hemisphere') {
            latArr[2] = coordinatesLat[x];
            lonArr[2] = coordinatesLon[x];
          }
        });

        return new System({
          country: request.body.country,
          countryName: request.body.countryName,
          fullName: governmentInfo.country_name.conventional_long_form,
          capital: governmentInfo.capital.name,
          capitalCoordinates: [latArr.join(' '), lonArr.join(' ')],
          independence: `${governmentInfo.independence.date} ${governmentInfo.independence.note}`,
          chiefOfState: governmentInfo.executive_branch.chief_of_state,
          headOfGovernment: governmentInfo.executive_branch.head_of_government,
          electionsExec: governmentInfo.executive_branch.elections_appointments,
          electionResultsExec: governmentInfo.executive_branch.election_results,
          electionsLeg: governmentInfo.legislative_branch.elections_appointments,
          electionResultsLeg: governmentInfo.legislative_branch.election_results,
          typeOfGovernment: country.typeOfGovernment,
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
