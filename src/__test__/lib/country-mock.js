'use strict';

import Country from '../../models/country';
import data from '../../../data.json';

const createCountryMock = (update, linked) => {
  const mock = {};
  mock.request = {
    countryName: 'benin',
  };

  return Country.create(mock.request.countryName)
    .then((created) => {
      mock.country = created;
      mock.country.lastUpdated = data.countries[mock.request.countryName].metadata.date;

      if (update) {
        created.lastUpdated = 'test';
        mock.country.lastUpdated = 'test';
      }

      if (linked) {
        created.hasLinkedSystem = true;
        mock.country.hasLinkedSystem = true;
      }

      created.save();
      return mock;
    });
};

const removeCountryMock = () => Country.remove({});

export { createCountryMock, removeCountryMock };

