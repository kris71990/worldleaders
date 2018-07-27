'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createFakeMock, removeCountryMock } from './lib/country-mock';
import { createFakeMockSystem, removeSystemMock } from './lib/system-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('FLAG PHOTO ROUTER', () => {
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

describe('LEADER PHOTO ROUTER', () => {
  beforeAll(startServer);
  afterEach(removeCountryMock);
  afterEach(removeSystemMock);
  afterAll(stopServer);

  test('POST to /photos/hog should return updated country with hogUrl', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Malcolm_Turnbull.svg';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hog`)
          .send({ systemId: country.system._id, leaderUrl: url })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.headOfGovernmentImg).toEqual(url);
          });
      });
  });

  test('POST to /photos/hog should return 400 for bad url (no wikipedia)', () => {
    const url = 'www.australia.Malcolm_Turnbull.svg';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hog`)
          .send({ systemId: country.country._id, leaderUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/hos should return updated country with hogUrl', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elizabeth_II.svg';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hos`)
          .send({ systemId: country.system._id, leaderUrl: url })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.chiefOfStateImg).toEqual(url);
          });
      });
  });

  test('POST to /photos/hos should return 400 for bad url (no wikipedia)', () => {
    const url = 'www.australia.com/Elizabeth_II.svg';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hos`)
          .send({ systemId: country.country._id, leaderUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });
});
