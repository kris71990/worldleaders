'use strict';

import System from '../../models/gov-system';
import { createCountryMock } from './country-mock';

const createSystemMock = () => {
  const systemMock = {};
  return createCountryMock(false, true)
    .then((mock) => {
      systemMock.country = mock;
      return System.create(mock.country.countryName, mock.country._id)
        .then((created) => {
          systemMock.system = created;
          return systemMock;
        });
    });
};

const removeSystemMock = () => System.remove({});

export { createSystemMock, removeSystemMock };
