'use strict';

import System from '../../models/gov-system';
import { createCountryMock } from './country-mock';

const createSystemMock = () => {
  const systemMock = {};
  return createCountryMock()
    .then((response) => {
      return System.create(response.country.countryName, response.country._id)
        .then((created) => {
          systemMock.system = created;
          return systemMock;
        });
    });
};

const removeSystemMock = () => System.remove({});

export { createSystemMock, removeSystemMock };
