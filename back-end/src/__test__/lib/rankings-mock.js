'use strict';

import Country from '../../models/country';

const createFakeGDPMock = (country, gdp) => {
  return new Country({
    countryName: country,
    gdpPPPRank: gdp,
  }).save();
};

const createFakePopulationMock = (country, pop) => {
  return new Country({
    countryName: country,
    populationRank: pop,
  }).save();
};

const createFakeAreaMock = (country, area) => {
  return new Country({
    countryName: country,
    areaRank: area,
  }).save();
};

const createFakeLanguageMock = (country, langArray) => {
  return new Country({
    countryName: country,
    languages: langArray,
  }).save();
};

const removeFakeMock = () => Country.remove({});

export { 
  createFakeGDPMock, 
  createFakePopulationMock,
  createFakeAreaMock,
  createFakeLanguageMock,
  removeFakeMock,
};
