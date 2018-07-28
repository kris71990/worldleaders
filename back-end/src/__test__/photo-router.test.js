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

    return createFakeMock('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, flagUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/flags should return 400 for bad file type', () => {
    const url = 'https://upload.wikimedia.org/Flag_of_Australia.com';

    return createFakeMock('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, flagUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/flags should return 400 for missing argument', () => {
    return createFakeMock('japan')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, arg2: 'blah' })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/flags with no arguments returns 400', () => {
    return superagent.post(`${API_URL}/photos/flags`)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });

  test('POST to /photos/flags with wrong arguments returns 400', () => {
    return superagent.post(`${API_URL}/photos/flags`)
      .send({ arg1: 'blah', arg2: 'blah' })
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });

  test('POST to /photos/flags with too many arguments returns 400', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Thailand.svg';

    return createFakeMock('thailand')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/flags`)
          .send({ countryId: country.country._id, flagUrl: url, arg3: 'blah' })
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

  test('POST to /photos/hog should return 400 for bad file type', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Malcolm_Turnbull.com';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hog`)
          .send({ systemId: country.country._id, leaderUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/hog should return 400 for missing argument', () => {
    return createFakeMockSystem('japan')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hog`)
          .send({ systemId: country.country._id, arg2: 'blah' })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/hog with no arguments returns 400', () => {
    return superagent.post(`${API_URL}/photos/hog`)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });

  test('POST to /photos/hog with wrong arguments returns 400', () => {
    return superagent.post(`${API_URL}/photos/hog`)
      .send({ arg1: 'blah', arg2: 'blah' })
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });

  test('POST to /photos/hog with too many arguments returns 400', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Malcolm_Turnbull.svg';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hog`)
          .send({ systemId: country.country._id, flagUrl: url, arg3: 'blah' })
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

  test('POST to /photos/hos should return 400 for bad file type', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elizabeth_II.com';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hos`)
          .send({ systemId: country.country._id, leaderUrl: url })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/hos should return 400 for missing argument', () => {
    return createFakeMockSystem('japan')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hos`)
          .send({ systemId: country.country._id, arg2: 'blah' })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });

  test('POST to /photos/hos with no arguments returns 400', () => {
    return superagent.post(`${API_URL}/photos/hos`)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });

  test('POST to /photos/hos with wrong arguments returns 400', () => {
    return superagent.post(`${API_URL}/photos/hos`)
      .send({ arg1: 'blah', arg2: 'blah' })
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });

  test('POST to /photos/hos with too many arguments returns 400', () => {
    const url = 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elizabeth_II.svg';

    return createFakeMockSystem('australia')
      .then((country) => {
        return superagent.post(`${API_URL}/photos/hog`)
          .send({ systemId: country.country._id, flagUrl: url, arg3: 'blah' })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });
  });
});
