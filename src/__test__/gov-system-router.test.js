'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createCountryMock, removeCountryMock } from './lib/country-mock';
import { createSystemMock, removeSystemMock } from './lib/system-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

/* 
Tests for the following (7):
  - POST /system (201, 404, 400 x 3)
  - GET /system/:country (201, 404)
  - PUT /system/:country (200, 201)
*/

describe('Test system-router', () => {
  beforeAll(startServer);
  afterEach(removeCountryMock);
  afterEach(removeSystemMock);
  afterAll(stopServer);

  describe('POST to /system', () => {
    test('POST under normal circumstances returns 201', () => {
      let mock = null;
      return createCountryMock()
        .then((countryResponse) => {
          mock = countryResponse;
          return superagent.post(`${API_URL}/system`)
            .send({
              countryId: mock.country._id,
              countryName: mock.country.countryName,
            })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body._id).toBeTruthy();
              expect(response.body.countryId).toEqual(mock.country._id.toString());
              expect(response.body.countryName).toEqual(mock.country.countryName);
              expect(response.body.capitalCoordinates).toBeTruthy();
              expect(response.body.chiefOfState).toBeTruthy();
              expect(response.body.electionsLeg).toBeTruthy();
              expect(response.body.electionResultsExec).toBeTruthy();
              expect(response.body.fullName).toBeTruthy();
            });
        });
    });

    test('POST a system with wrong country id returns 404', () => {
      let mock = null;
      return createCountryMock()
        .then((countryResponse) => {
          mock = countryResponse;
          return superagent.post(`${API_URL}/system`)
            .send({
              countryId: 1234,
              countryName: mock.country.countryName,
            })
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(404);
            });   
        });
    });

    test('POST a system with wrong country returns 400', () => {
      let mock = null;
      return createCountryMock()
        .then((countryResponse) => {
          mock = countryResponse;
          return superagent.post(`${API_URL}/system`)
            .send({
              countryId: mock.country._id,
              countryName: 'togo',
            })
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(400);
            });   
        });
    });

    test('POST a system without specifying country', () => {
      let mock = null;
      return createCountryMock()
        .then((countryResponse) => {
          mock = countryResponse;
          return superagent.post(`${API_URL}/system`)
            .send({
              countryId: mock.country._id,
            })
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(400);
            });   
        });
    });

    test('POST a system without any parameters', () => {
      return createCountryMock()
        .then(() => {
          return superagent.post(`${API_URL}/system`)
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(400);
            });   
        });
    });

    test('POST a system that already exists returns 400', () => {
      return createSystemMock()
        .then((mock) => {
          return superagent.post(`${API_URL}/system`)
            .send({
              countryId: mock.country.country._id,
              countryName: mock.country.country.countryName,
            })
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(400);
            });   
        });
    });
  });

  describe('GET from /system/:country', () => {
    test('GET under normal circumstances should return 201 and system', () => {
      return createSystemMock()
        .then((sysResponse) => {
          return superagent.get(`${API_URL}/system/${sysResponse.system.countryName}`)
            .send({
              countryName: 'benin',
            })
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toEqual(sysResponse.system._id.toString());
              expect(response.body.countryName).toEqual(sysResponse.system.countryName);
              expect(response.body.countryId).toEqual(sysResponse.system.countryId.toString());
              expect(response.body.capitalCoordinates).toBeInstanceOf(Array);
            });
        });
    });

    test('GET a system that doesn\'t exist', () => {
      return superagent.get(`${API_URL}/system/togo`)
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(404);
        });
    });
  });

  describe('PUT to /system/:country', () => {
    test('PUT with old lastUpdated date should return updated data', () => {
      return createSystemMock(true)
        .then((response) => {
          console.log(response);
          expect(response.system.lastUpdated).toEqual('test');
          return superagent.put(`${API_URL}/system/${response.country.request.countryName}`)
            .then((res) => {
              expect(res.status).toEqual(201);
              expect(res.body).toBeTruthy();
              expect(res.body.lastUpdated).not.toEqual('test');
              expect(res.body.lastUpdated).toEqual(response.country.country.lastUpdated.toString());
            });
        });
    });

    test('PUT with current lastUpdated date should return same data', () => {
      return createSystemMock()
        .then((response) => {
          return superagent.put(`${API_URL}/system/${response.country.request.countryName}`)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.lastUpdated).toEqual(response.system.lastUpdated);
            });
        });
    });
  });
});
