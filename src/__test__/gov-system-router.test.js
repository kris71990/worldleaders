'use strict';

import superagent from 'superagent';
import mongoose from 'mongoose';
import { startServer, stopServer } from '../lib/server';
import Country from '../../src/models/country';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Test system-router', () => {
  beforeAll(startServer);
  afterEach(() => Country.remove({}));
  afterAll(stopServer);

  describe('POST to /system', () => {
    test('POST under normal circumstances returns 201', () => {
      return superagent.post(`${API_URL}/countries`) 
        .send({
          countryName: 'benin',
        })
        .then((countryResponse) => {
          return superagent.post(`${API_URL}/system`)
            .send({
              country: countryResponse.body._id,
              countryName: countryResponse.body.countryName,
            })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body._id).toBeTruthy();
              expect(response.body.country).toEqual(countryResponse.body._id);
              expect(response.body.countryName).toEqual(countryResponse.body.countryName);
            });
        });
    });
  });

  test('POST a system with wrong country id returns 404', () => {
    return superagent.post(`${API_URL}/countries`) 
      .send({
        countryName: 'benin',
      })
      .then((countryResponse) => {
        return superagent.post(`${API_URL}/system`)
          .send({
            country: 1234,
            countryName: countryResponse.body.countryName,
          })
          .then(() => {})
          .catch((error) => {
            expect(error.status).toEqual(404);
          });   
      });
  });

  test('POST a system with wrong country returns 400', () => {
    return superagent.post(`${API_URL}/countries`) 
      .send({
        countryName: 'benin',
      })
      .then((countryResponse) => {
        return superagent.post(`${API_URL}/system`)
          .send({
            country: countryResponse.body._id,
            countryName: 'togo',
          })
          .then(() => {})
          .catch((error) => {
            expect(error.status).toEqual(400);
          });   
      });
  });

  test('POST a system without specifying country', () => {
    return superagent.post(`${API_URL}/countries`) 
      .send({
        countryName: 'benin',
      })
      .then((countryResponse) => {
        return superagent.post(`${API_URL}/system`)
          .send({
            country: countryResponse.body._id,
          })
          .then(() => {})
          .catch((error) => {
            expect(error.status).toEqual(400);
          });   
      });
  });

  test('POST a system without any parameters', () => {
    return superagent.post(`${API_URL}/countries`) 
      .send({
        countryName: 'benin',
      })
      .then(() => {
        return superagent.post(`${API_URL}/system`)
          .then(() => {})
          .catch((error) => {
            expect(error.status).toEqual(400);
          });   
      });
  });
});
