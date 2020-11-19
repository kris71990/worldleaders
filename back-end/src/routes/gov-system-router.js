'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import System from '../models/gov-system';
import Country from '../models/country';
import logger from '../lib/logger';
import data from '../../data.json';
import { parseFullGov, countSystems } from '../lib/parse-govs';
import { findHOGKeywords, findCOSKeywords } from '../lib/parse-leaders';
import parseElectionDates from '../lib/parse-elections';
import * as create from '../lib/create-data';

const jsonParser = json();
const govSystemRouter = new Router();

govSystemRouter.post('/system', jsonParser, (request, response, next) => {
  if (!request.body.countryId || !request.body.countryName) {
    return next(new HttpError(400, 'bad request - missing argument'));
  }
  if (Object.keys(request.body).length !== 2) return next(new HttpError(400, 'improper request'));

  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.findById(request.body.countryId)
    .then((country) => {
      if (country.countryName !== request.body.countryName) {
        throw new HttpError(400, 'bad request - incorrect country');
      } else if (country.hasLinkedSystem) {
        throw new HttpError(400, 'bad request - system already exists for this country');
      } else {
        const searchableCountry = request.body.countryName.replace(' ', '_').toLowerCase();
        const governmentInfo = data.countries[searchableCountry].data.government;

        const coordinatesLat = governmentInfo.capital.geographic_coordinates.latitude;
        const coordinatesLon = governmentInfo.capital.geographic_coordinates.longitude;
        const capitalCoordinates = create.createCoordinatesData(coordinatesLat, coordinatesLon);
        const capitalArray = create.createCapitalData(governmentInfo.capital.name);

        const parsedGov = parseFullGov(country.typeOfGovernment);
        const independenceData = create.createIndependenceData(governmentInfo.independence);
        const hogk = findHOGKeywords(governmentInfo.executive_branch.head_of_government);
        const cosk = findCOSKeywords(governmentInfo.executive_branch.chief_of_state ? governmentInfo.executive_branch.chief_of_state : governmentInfo.executive_branch.head_of_state);
        const allElectionDates = parseElectionDates(governmentInfo.executive_branch.elections_appointments, governmentInfo.legislative_branch.elections);

        return new System({
          countryId: request.body.countryId,
          countryName: request.body.countryName,
          fullName: governmentInfo.country_name.conventional_long_form,
          capital: capitalArray,
          capitalCoordinates,
          independence: independenceData,
          chiefOfStateFull: governmentInfo.executive_branch.chief_of_state ? governmentInfo.executive_branch.chief_of_state : governmentInfo.executive_branch.head_of_state,
          chiefOfStateKeywords: cosk,
          headOfGovernmentFull: governmentInfo.executive_branch.head_of_government,
          headOfGovernmentKeywords: hogk,
          electionDates: allElectionDates,
          electionsExec: governmentInfo.executive_branch.elections_appointments,
          electionResultsExec: governmentInfo.executive_branch.election_results,
          electionsLeg: governmentInfo.legislative_branch.elections,
          electionResultsLeg: governmentInfo.legislative_branch.election_results,
          typeOfGovernmentFull: country.typeOfGovernment,
          typeOfGovernment: parsedGov,
          lastUpdated: data.countries[searchableCountry].metadata.date,
        }).save()
          .then((system) => {
            logger.log(logger.INFO, 'POST /system successful, returning 201');

            country.hasLinkedSystem = true;
            country.save();
            return response.status(201).json(system);
          })
          .catch(() => {
            country.hasLinkedSystem = false;
            country.save();
            return next;
          });
      }
    })
    .catch(next);
});

govSystemRouter.get('/systems/all', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return System.find()
    .then((countries) => {
      const systems = countries.map(x => x.typeOfGovernment);
      const systemsObj = countSystems(systems);
      return response.json(systemsObj);
    })
    .catch(next);
});

govSystemRouter.get('/systems/elections', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return System.find()
    .then((countries) => {
      const electionDates = countries.map((x) => {
        return {
          country: x.countryName,
          id: x.countryId,
          electionDates: x.electionDates,
        };
      });
      return response.json(electionDates);
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
      return null;
    })
    .catch(() => Promise.reject())
    .then(() => {
      return System.findOne({ countryName: request.params.country })
        .then((system) => {
          if (!system) return next(new HttpError(400, 'no system found'));

          const dateDB = system.lastUpdated;
          const dateData = data.countries[system.countryName].metadata.date;
          
          if (dateDB !== dateData) {
            const coordinatesLat = governmentInfo.capital.geographic_coordinates.latitude;
            const coordinatesLon = governmentInfo.capital.geographic_coordinates.longitude;
            const capitalCoordinates = create.createCoordinatesData(coordinatesLat, coordinatesLon);
            
            if (capitalCoordinates[0]) capitalCoordinates[0] = capitalCoordinates[0].join(' ');
            if (capitalCoordinates[1]) capitalCoordinates[1] = capitalCoordinates[1].join(' ');
            
            const parsedGov = parseFullGov(govType);
            const independenceData = create.createIndependenceData(governmentInfo.independence);
            const hogk = findHOGKeywords(governmentInfo.executive_branch.head_of_government);
            const cosk = findCOSKeywords(governmentInfo.executive_branch.chief_of_state);
            const allElectionDates = parseElectionDates(governmentInfo.executive_branch.elections_appointments, governmentInfo.legislative_branch.elections);

            let hogChanged = false;
            let cosChanged = false;

            if (system.headOfGovernmentKeywords) {
              hogk[1].forEach((y) => {
                if (!system.headOfGovernmentKeywords[1].includes(y)) {
                  hogChanged = true;
                }
              });
            }

            if (system.chiefOfStateKeywords) {
              cosk[1].forEach((y) => {
                if (!system.chiefOfStateKeywords[1].includes(y)) {
                  cosChanged = true;
                }
              });
            }

            if (system.headOfGovernmentImg && hogChanged) {
              logger.log(logger.INFO, 'Head of Government changed, removing photo');
              system.headOfGovernmentImg = null;
            }

            if (system.chiefOfStateImg && cosChanged) {
              logger.log(logger.INFO, 'Chief of state changed, removing photo');
              system.chiefOfStateImg = null;
            }

            system.fullName = governmentInfo.country_name.conventional_long_form;
            system.capital = governmentInfo.capital.name;
            system.capitalCoordinates = [capitalCoordinates[0], capitalCoordinates[1]];
            system.independence = independenceData;
            system.chiefOfStateFull = governmentInfo.executive_branch.chief_of_state;
            system.chiefOfStateKeywords = cosk;
            system.headOfGovernmentFull = governmentInfo.executive_branch.head_of_government;
            system.headOfGovernmentKeywords = hogk;
            system.electionDates = allElectionDates;
            system.electionsExec = governmentInfo.executive_branch.elections_appointments;
            system.electionResultsExec = governmentInfo.executive_branch.election_results;
            system.electionsLeg = governmentInfo.legislative_branch.elections;
            system.electionResultsLeg = governmentInfo.legislative_branch.election_results;
            system.typeOfGovernmentFull = govType;
            system.typeOfGovernment = parsedGov;
            system.lastUpdated = data.countries[searchableCountry].metadata.date;
    
            system.save();
            
            logger.log(logger.INFO, `${system.countryName} updated with latest data`);
            return response.status(201).json(system);
          }
          logger.log(logger.INFO, `${system.countryName} already up to date`);
          return response.status(200).json(system);
        })
        .catch(next);
    })
    .catch(next);
});

export default govSystemRouter;
