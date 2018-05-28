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
          console.log(countryResponse.body._id);
          return superagent.post(`${API_URL}/system`)
            .send({
              country: countryResponse.body._id,
            })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body._id).toBeTruthy();
              expect(response.body.country).toEqual(countryResponse.body._id);
            });
        });
    });
  });

  // test.only('POST a system with wrong id returns 404', () => {
  //   return superagent.post(`${API_URL}/countries`) 
  //     .send({
  //       countryName: 'benin',
  //     })
  //     .then((countryResponse) => {
  //       console.log(countryResponse.body._id);
  //       return superagent.post(`${API_URL}/system`)
  //         .send({
  //           country: mongoose.Types.ObjectId(),
  //         })
  //         .then(() => {})
  //         .catch((error) => {
  //           expect(error.status).toEqual(404);
  //         });   
  //     });
  // });
});
