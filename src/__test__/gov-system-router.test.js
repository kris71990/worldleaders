'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import System from '../../src/models/gov-system';
import { createCountryMock, removeCountryMock } from './lib/country-mock';

const API_URL = `http://localhost:${process.env.PORT}`;


// travis build breaking when posting to multiple endpoints asynchronously, change by saving to mongo first, and then posting


describe('Test system-router', () => {
  beforeAll(startServer);
  afterEach(removeCountryMock);
  afterEach(() => System.remove({}));
  afterAll(stopServer);

  describe('POST to /system', () => {
    test('POST under normal circumstances returns 201', () => {
      let mock = null;
      return createCountryMock()
        .then((countryResponse) => {
          mock = countryResponse;
          return superagent.post(`${API_URL}/system`)
            .send({
              country: mock.country._id,
              countryName: mock.country.countryName,
            })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body._id).toBeTruthy();
              expect(response.body.country).toEqual(mock.country._id.toString());
              expect(response.body.countryName).toEqual(mock.country.countryName);
            });
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
            country: 1234,
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
            country: mock.country._id,
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
            country: mock.country._id,
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
});
