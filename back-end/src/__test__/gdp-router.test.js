'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createFakeMock, removeFakeMock } from './lib/gdp-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('GDP ROUTER', () => {
  beforeAll(startServer);
  afterEach(removeFakeMock);
  afterAll(stopServer);

  test('GET from /countries/gdp should return ordered array of countries in descending order of gdpPPPRank', () => {
    createFakeMock('benin', '124');
    createFakeMock('togo', '55');
    createFakeMock('australia', '8');
    createFakeMock('russia', '33');

    return superagent.get(`${API_URL}/countries/gdp`)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(4);
        expect(response.body[0].countryName).toEqual('australia');
        expect(response.body[1].countryName).toEqual('russia');
        expect(response.body[2].countryName).toEqual('togo');
        expect(response.body[3].countryName).toEqual('benin');
      });
  });
});
