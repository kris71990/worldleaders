'use strict';

import System from '../../models/gov-system';
import { createCountryMock, createFakeMock } from './country-mock';
import data from '../../../data.json';

const createSystemMock = (update) => {
  const systemMock = {};
  return createCountryMock(!update, true)
    .then((mock) => {
      systemMock.country = mock;

      return System.create(mock.country.countryName, mock.country._id)
        .then((created) => {
          systemMock.system = created;
          systemMock.system.lastUpdated = data.countries[systemMock.country.country.countryName].metadata.date;
          
          if (update) {
            created.lastUpdated = 'test';
            systemMock.system.lastUpdated = 'test';
          } else {
            created.lastUpdated = data.countries[systemMock.country.country.countryName].metadata.date;
          }

          created.save();
          systemMock.system = created;
          return systemMock;
        });
    });
};

const createFakeMockSystem = (country) => {
  const systemMock = {};
  return createFakeMock(country)
    .then((mock) => {
      systemMock.country = mock;
    
      return System.create(mock.country.countryName, mock.country._id)
        .then((created) => {
          systemMock.system = created;
          return mock;
        });
    });
};

const removeSystemMock = () => System.remove({});

export { createSystemMock, createFakeMockSystem, removeSystemMock };
