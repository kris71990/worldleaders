'use strict';

import Country from '../../models/country';
import data from '../../../data.json';

const createCountryMock = ({ country, update, linked }) => {
  const mock = {};
  mock.request = {
    countryName: country,
  };

  return Country.create(mock.request.countryName)
    .then((created) => {
      mock.country = created;
      mock.country.lastUpdated = data.countries[mock.request.countryName].metadata.date;
      mock.country.typeOfGovernment = 'presidential republic';

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

const createFakeMock = (country, typeGov) => {
  const mock = {};
  mock.request = {
    countryName: country,
    typeOfGovernment: typeGov,
  };

  return new Country({
    countryName: mock.request.countryName,
    typeOfGovernment: mock.request.typeOfGovernment,
  }).save()
    .then((created) => {
      mock.country = created;
      return mock;
    });
};

const removeCountryMock = () => Country.remove({});

export { createCountryMock, createFakeMock, removeCountryMock };

