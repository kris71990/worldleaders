'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createFakeGDPMock, createFakePopulationMock, createFakeAreaMock, removeFakeMock } from './lib/rankings-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('RANKINGS ROUTER', () => {
  beforeAll(startServer);
  afterEach(removeFakeMock);
  afterAll(stopServer);

  test('GET from /rankings-gdp should return ordered array of countries in descending order of gdpPPPRank', () => {
    createFakeGDPMock('benin', '124');
    createFakeGDPMock('togo', '55');
    createFakeGDPMock('australia', '8');
    createFakeGDPMock('russia', '33');

    return superagent.get(`${API_URL}/rankings-gdp`)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(4);
        expect(response.body[0].countryName).toEqual('australia');
        expect(response.body[1].countryName).toEqual('russia');
        expect(response.body[2].countryName).toEqual('togo');
        expect(response.body[3].countryName).toEqual('benin');
      });
  });

  test('GET from /rankings-population should return ordered array of countries in descending order of population', () => {
    createFakePopulationMock('iceland', '164');
    createFakePopulationMock('denmark', '99');
    createFakePopulationMock('luxembourg', '180');
    createFakePopulationMock('china', '1');

    return superagent.get(`${API_URL}/rankings-population`)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(4);
        expect(response.body[0].countryName).toEqual('china');
        expect(response.body[1].countryName).toEqual('denmark');
        expect(response.body[2].countryName).toEqual('iceland');
        expect(response.body[3].countryName).toEqual('luxembourg');
      });
  });

  test('GET from /rankings-area should return ordered array of countries in descending order of population', () => {
    createFakeAreaMock('japan', '80');
    createFakeAreaMock('canada', '2');
    createFakeAreaMock('el salvador', '130');
    createFakeAreaMock('russia', '1');

    return superagent.get(`${API_URL}/rankings-area`)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(4);
        expect(response.body[0].countryName).toEqual('russia');
        expect(response.body[1].countryName).toEqual('canada');
        expect(response.body[2].countryName).toEqual('japan');
        expect(response.body[3].countryName).toEqual('el salvador');
      });
  });
});
