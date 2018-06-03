'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Country from '../models/country';
import logger from '../../src/lib/logger';
import data from '../../data.json';

const jsonParser = json();
const countryRouter = new Router();

countryRouter.post('/countries', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  const searchableCountry = request.body.countryName.replace(' ', '_').toLowerCase();

  if (Object.keys(request.body).length > 1) throw new HttpError(400, 'improper request');

  const countryExists = Object.keys(data.countries).filter(key => key === searchableCountry);
  if (countryExists.length === 0) throw new HttpError(404, 'country does not exist');

  const governmentInfo = data.countries[searchableCountry].data.government;
  const geographyInfo = data.countries[searchableCountry].data.geography;
  const peopleInfo = data.countries[searchableCountry].data.people;
  const economyInfo = data.countries[searchableCountry].data.economy;

  // const countryList = data.countries;
  // const keys = Object.keys(countryList);
  // const systems = [];

  // trying to parse the long and unpredictable strings of the government_type to make it more uniform for the government system model

  // try {
  //   for (let i = 0; i < keys.length; i++) {
  //     if (countryList[keys[i]].data.government.government_type) {
  //       systems.push(countryList[keys[i]].data.government.government_type);
  //     }
  //   }
  //   const democracies = systems.filter(country => country.includes('democracy')).map((x) => {
  //     const split = x.split(' ');
  //     return split;
  //   }).map((y) => {
  //     let index = 0;
  //     y.forEach((z, i) => {
  //       if (z.includes('democracy')) {
  //         index = i + 1;
  //         return index;
  //       }  
  //     }, 0);
  //     return y.slice(0, index);
  //   });
  //   // const dictatorships = systems.filter(country => country.includes('dictatorship'));
  // } catch (error) {
  //   throw new HttpError(400, 'error in for loop');
  // }


  const govSys = governmentInfo.government_type;
  let sys;

  if (govSys.indexOf('dictatorship') > -1) {
    sys = 'dictatorship';
  } else if (govSys.indexOf('democracy') > -1 || govSys.indexOf('democracy;') > -1) {
    sys = 'democracy';
  } else if (govSys.indexOf('republic') > -1) {
    sys = 'republic';
  } else {
    sys = 'unknown';
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
    borderCountries: geographyInfo.land_boundaries.border_countries.map(border => border.country),
    naturalResources: geographyInfo.natural_resources.resources,
    ethnicities: peopleInfo.ethnic_groups.ethnicity,
    languages: peopleInfo.languages.language,
    religions: peopleInfo.religions.religion,
    exports: economyInfo.exports.commodities.by_commodity,
    exportPartners: economyInfo.exports.partners.by_country,
    imports: economyInfo.imports.commodities.by_commodity,
    importPartners: economyInfo.imports.partners.by_country,
    typeOfGovernment: sys,
    hasLinkedSystem: false,
  }).save()
    .then((country) => {
      logger.log(logger.INFO, 'POST /country successful, returning 201');
      return response.status(201).json(country);
    })
    .catch(next);
});

countryRouter.get('/countries/:id', (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);

  return Country.findById(request.params.id)
    .then((country) => {
      logger.log(logger.INFO, 'GET /country/:id successful, returning 200');
      return response.json(country);
    })
    .catch(next);
});

export default countryRouter;
