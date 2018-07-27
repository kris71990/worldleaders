'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createFakeMock, removeCountryMock } from './lib/country-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('PHOTO ROUTER', () => {
  beforeAll(startServer);
  afterEach(removeCountryMock);
  afterAll(stopServer);

  test('POST to /photos/flags should return updated country with flagUrl', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg';

    return createFakeMock('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, flagUrl: url })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.flagUrl).toEqual(url);
          });
      });
  });

  test('POST to /photos/flags should return 400 for bad url (no wikipedia)', () => {
    const url = 'www.australia.Flag_of_Benin.svg';

    return createFakeMock('benin')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, flagUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/flags should return 400 for bad url (wrong format)', () => {
    const url = 'https://upload.wikimedia.org/australia.svg';

    return createFakeMock('japan')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, flagUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });
});
