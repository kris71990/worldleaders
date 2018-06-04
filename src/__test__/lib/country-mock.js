'use strict';

import Country from '../../models/country';

const createCountryMock = () => {
  const mock = {};
  mock.request = {
    countryName: 'benin',
  };

  return Country.create(mock.request.countryName)
    .then((created) => {
      mock.country = created;
      mock.lastUpdated = 'test';
      return mock;
    });
};

const removeCountryMock = () => Country.remove({});

export { createCountryMock, removeCountryMock };

