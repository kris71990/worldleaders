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

const createFakeMockSystem = (country, typeGov) => {
  let systemMock = null;
  return createFakeMock(country, typeGov)
    .then((mock) => {
      systemMock = mock;
    
      return new System({
        countryId: systemMock.country._id,
        countryName: systemMock.country.countryName,
        typeOfGovernment: systemMock.country.typeOfGovernment, 
      }).save()
        .then((created) => {
          systemMock.system = created;
          return systemMock;
        });
    });
};

const removeSystemMock = () => System.remove({});

export { createSystemMock, createFakeMockSystem, removeSystemMock };
