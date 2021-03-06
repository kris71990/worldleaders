'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import countryParser from '../lib/country-parser-middleware';
import Country from '../models/country';
import System from '../models/gov-system';
import logger from '../lib/logger';
import data from '../../data.json';

import { flagUrlValidator } from '../lib/url-validator';

const jsonParser = json();
const countryRouter = new Router();

// returns posted country json - gql
countryRouter.post('/country', jsonParser, countryParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  const searchableCountry = request.body.countryName.replace(/([\s]+)/g, '_').toLowerCase();
  const countryExists = Object.keys(data.countries).filter(key => key === searchableCountry);
  if (countryExists.length === 0) throw new HttpError(404, 'country does not exist');

  const governmentInfo = data.countries[searchableCountry].data.government;
  const geographyInfo = data.countries[searchableCountry].data.geography;
  const peopleInfo = data.countries[searchableCountry].data.people;
  const economyInfo = data.countries[searchableCountry].data.economy;
  const govSys = governmentInfo.government_type;

  // if no border countries, assign value of empty array
  let bordering;
  if (!geographyInfo.land_boundaries.border_countries) {
    bordering = [];
  } else {
    bordering = geographyInfo.land_boundaries.border_countries.map(border => border.country);
  }

  return new Country({
    countryName: searchableCountry,
    location: geographyInfo.map_references,
    area: geographyInfo.area.total.value,
    areaRank: geographyInfo.area.global_rank,
    population: peopleInfo.population.total,
    populationRank: peopleInfo.population.global_rank,
    lifeExpectancy: peopleInfo.life_expectancy_at_birth.total_population.value,
    lifeExpectancyRank: peopleInfo.life_expectancy_at_birth.global_rank,
    gdpPPPRank: economyInfo.gdp.purchasing_power_parity.global_rank,
    borderCountries: bordering,
    naturalResources: geographyInfo.natural_resources.resources,
    ethnicities: peopleInfo.ethnic_groups.ethnicity,
    languages: peopleInfo.languages.language,
    religions: peopleInfo.religions.religion,
    exports: economyInfo.exports.commodities.by_commodity,
    exportPartners: economyInfo.exports.partners.by_country,
    imports: economyInfo.imports.commodities.by_commodity,
    importPartners: economyInfo.imports.partners.by_country,
    typeOfGovernment: govSys,
    hasLinkedSystem: false,
    lastUpdated: data.countries[searchableCountry].metadata.date,
  }).save()
    .then((country) => {
      logger.log(logger.INFO, 'POST /country successful, returning 201');
      return response.status(201).json(country);
    })
    .catch(next);
});

// returns all countries in application database - gql
countryRouter.get('/countries/db', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.find()
    .then((countries) => {
      logger.log(logger.INFO, 'GET /country/db successful, getting all countries, returning 200');
      return response.json(countries);
    })
    .catch(next);
});

// REST - returns all countries in cia database
countryRouter.get('/countries/cia', (request, response) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  const countries = Object.keys(data.countries);
  const filteredCountries = countries.filter((country) => {
    if (data.countries[country].data.geography.area.global_rank) {
      if (!data.countries[country].data.people || !data.countries[country].data.economy) {
        return null;
      }
      return country;
    }
    return null;
  });
  
  return response.json(filteredCountries);
});

// returns request country json - gql
countryRouter.get('/country/:id', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.findById(request.params.id)
    .then((country) => {
      logger.log(logger.INFO, 'GET /country/:id successful, returning 200');
      return response.json(country);
    })
    .catch(next);
});

// returns updated country json - gql
countryRouter.put('/country/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);
  
  return Country.findById(request.params.id)
    .then((country) => {
      const dateDB = country.lastUpdated;
      const dateData = data.countries[country.countryName].metadata.date;
      
      if (dateDB !== dateData) {
        const peopleInfo = data.countries[country.countryName].data.people;
        const economyInfo = data.countries[country.countryName].data.economy;

        country.population = peopleInfo.population.total;
        country.populationRank = peopleInfo.population.global_rank;
        country.lifeExpectancy = peopleInfo.life_expectancy_at_birth.total_population.value;
        country.lifeExpectancyRank = economyInfo.gdp.purchasing_power_parity.global_rank;
        country.ethnicities = peopleInfo.ethnic_groups.ethnicity;
        country.languages = peopleInfo.languages.language;
        country.religions = peopleInfo.religions.religion;
        country.lastUpdated = data.countries[country.countryName].metadata.date;

        country.save();
        
        logger.log(logger.INFO, `${country.countryName} updated with latest data`);
        return response.status(201).json(country);
      }
      logger.log(logger.INFO, `${country.countryName} already up to date`);
      return response.status(200).json(country);
    })
    .catch(next);
});

countryRouter.put('/country-flag/:id', jsonParser, (request, response, next) => {
  if (!request.body.flagUrl || !request.params.id) return next(new HttpError(400, 'improper request'));
  if (!flagUrlValidator(request.body.flagUrl)) return next(new HttpError(400, 'improper url'));
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.findById(request.params.id)
    .then((country) => {
      country.flagUrl = request.body.flagUrl;
      country.save();
      logger.log(logger.INFO, 'Return updated data with flag image');
      return response.status(200).json(country);
    })
    .catch((error) => {
      return next(error);
    });
});

// removes country if it no longer exists in the world - gql
countryRouter.delete('/country/:id', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.findById(request.params.id)
    .then((country) => {
      const countryExists = Object.keys(data.countries).filter(key => key === country.countryName);

      if (countryExists.length === 1) {
        return next(new HttpError(400, 'Cannot delete existing country'));
      }

      return Country.findByIdAndRemove(request.params.id)
        .then((countryToDelete) => {
          return System.findOneAndRemove({ countryId: countryToDelete._id })
            .then((system) => {
              if (!system) {
                logger.log(logger.INFO, `Delete ${countryToDelete.countryName} successful, returning 204`);
                return response.status(204).send('Country Deleted');
              }
              logger.log(logger.INFO, `Delete ${countryToDelete.countryName} and system successful, returning 204`);
              return response.status(204).send('Country Deleted');
            });
        })
        .catch(next);
    })
    .catch(() => {
      return next(new HttpError(400, 'bad request'));
    });
});

export default countryRouter;
