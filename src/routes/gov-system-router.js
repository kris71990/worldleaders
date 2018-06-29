'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import System from '../models/gov-system';
import Country from '../models/country';
import logger from '../../src/lib/logger';
import data from '../../data.json';
// import getData from '../lib/get-data';

const jsonParser = json();
const govSystemRouter = new Router();

govSystemRouter.post('/system', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);
  
  if (!request.body.countryId || !request.body.countryName) {
    throw new HttpError(400, 'bad request - missing argument');
  }

  Country.findById(request.body.countryId)
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
          countryId: request.body.countryId,
          countryName: request.body.countryName,
          fullName: governmentInfo.country_name.conventional_long_form,
          capital: governmentInfo.capital.name,
          capitalCoordinates: [latArr.join(' '), lonArr.join(' ')],
          independence: `${governmentInfo.independence.date} ${governmentInfo.independence.note}`,
          chiefOfState: governmentInfo.executive_branch.chief_of_state,
          headOfGovernment: governmentInfo.executive_branch.head_of_government,
          electionsExec: governmentInfo.executive_branch.elections_appointments,
          electionResultsExec: governmentInfo.executive_branch.election_results,
          electionsLeg: governmentInfo.legislative_branch.elections,
          electionResultsLeg: governmentInfo.legislative_branch.election_results,
          typeOfGovernment: country.typeOfGovernment,
          lastUpdated: data.countries[searchableCountry].metadata.date,
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

govSystemRouter.get('/system/:country', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return System.find({ countryName: request.params.country })
    .then((system) => {
      if (system.length === 0) {
        logger.log(logger.INFO, 'GET - returning 404 status, no country found');
        return next(new HttpError(404, 'country not found'));
      }
      logger.log(logger.INFO, 'GET /system/:country successful, returning 200');
      return response.json(system[0]);
    })
    .catch(next);
});

govSystemRouter.put('/system/:country', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  const searchableCountry = request.params.country.replace(' ', '_').toLowerCase();
  const governmentInfo = data.countries[searchableCountry].data.government;

  let govType;
  return Country.find({ countryName: request.params.country })
    .then((country) => {
      govType = country[0].typeOfGovernment;
    })
    .then(() => {
      return System.findOneAndUpdate({ countryName: request.params.country })
        .then((system) => {
          const dateDB = system.lastUpdated;
          const dateData = data.countries[system.countryName].metadata.date;
          
          if (dateDB !== dateData) {
            system.fullName = governmentInfo.country_name.conventional_long_form;
            system.capital = governmentInfo.capital.name;
            system.independence = `${governmentInfo.independence.date} ${governmentInfo.independence.note}`;
            system.chiefOfState = governmentInfo.executive_branch.chief_of_state;
            system.headOfGovernment = governmentInfo.executive_branch.head_of_government;
            system.electionsExec = governmentInfo.executive_branch.elections_appointments;
            system.electionResultsExec = governmentInfo.executive_branch.election_results;
            system.electionsLeg = governmentInfo.legislative_branch.elections;
            system.electionResultsLeg = governmentInfo.legislative_branch.election_results;
            system.typeOfGovernment = govType;
            system.lastUpdated = data.countries[searchableCountry].metadata.date;
    
            system.save();
            
            logger.log(logger.INFO, `${system.countryName} updated with latest data`);
            return response.status(201).json(system);
          }
          logger.log(logger.INFO, `${system.countryName} already up to date`);
          return response.status(200).json(system);
        })
        .catch(next);
    });
});

export default govSystemRouter;
