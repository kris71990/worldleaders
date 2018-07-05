'use strict';

import Country from '../../models/country';

const createFakeMock = (country, gdp) => {
  return new Country({
    countryName: country,
    gdpPPPRank: gdp,
  }).save();
};

const removeFakeMock = () => Country.remove({});

export { createFakeMock, removeFakeMock };
