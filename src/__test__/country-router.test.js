'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import Country from '../../src/models/country';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Test country-router', () => {
  beforeAll(startServer);
  afterEach(() => Country.remove({}));
  afterAll(stopServer);

  describe('POST to /countries', () => {
    test('POST under normal circumstances returns 201', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'afghanistan',
        })
        .then((response) => {
          expect(response.status).toEqual(201);
          expect(response.body.headOfState).toBeTruthy();
          expect(response.body.headOfGovernment).toBeTruthy();
          expect(response.body.typeOfGovernment).toBeTruthy();
        });
    });

    test('POST a country that does not exist returns 404', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'beni',
        })
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(404);
        });
    });

    test('POST a country that already exists returns 409', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'benin',
        })
        .then(() => {
          return superagent.post(`${API_URL}/countries`)
            .send({
              countryName: 'benin',
            });
        })
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(409);
        });
    });

    test('POST with improper arguments returns 400', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'ecuador',
          typeOfGovernment: 'democracy',
          headOfStae: 'Donald Trump',
        })
        .then(() => {})
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });
  });

  describe('GET from /countries/:id', () => {
    test('GET with correct id should return 200 and json', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'togo',
        })
        .then((response) => {
          return superagent.get(`${API_URL}/countries/${response.body._id}`)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.countryName).toEqual('togo');
              expect(res.body.typeOfGovernment).toBeTruthy();
            });
        });
    });

    test('GET with incorrect id should return 404', () => {
      return superagent.post(`${API_URL}/countries`)
        .send({
          countryName: 'togo',
        })
        .then(() => {
          return superagent.get(`${API_URL}/countries/1234`)
            .then(() => {})
            .catch((error) => {
              expect(error.status).toEqual(404);
              expect(error.body).toBeFalsy();
            });
        });
    });
  });
});
