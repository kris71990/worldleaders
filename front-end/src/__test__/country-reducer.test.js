import reducer from '../reducers/country';

describe('Country Reducer', () => {
  test('COUNTRY_GET should get a country', () => {
    const state = {};
    const country = {
      countryName: 'latvia',
      id: '82973931',
    };
    const action = {
      type: 'COUNTRY_GET',
      payload: country,
    };

    expect(reducer(state, action)).toEqual(country);
    expect(reducer(state, action)).toBeInstanceOf(Object);
  });

  test('FLAG_CREATE should get a country', () => {
    const state = {};
    const country = {
      countryName: 'latvia',
      id: '82973931',
    };
    const action = {
      type: 'FLAG_CREATE',
      payload: country,
    };

    expect(reducer(state, action)).toEqual(country);
    expect(reducer(state, action)).toBeInstanceOf(Object);
  });

  test('COUNTRY_LIST_GET should return null', () => {
    const state = {};
    const countryList = [
      {
        countryName: 'russia',
        id: '1234',
      },
      {
        countryName: 'syria',
        id: '2333',
      },
    ];

    const action = {
      type: 'COUNTRY_LIST_GET',
      payload: countryList, 
    };

    expect(reducer(state, action)).toBeNull();
  });

  test('DEFAULT returns state', () => {
    const state = {};
    const country = {
      countryName: 'latvia',
      id: '82973931',
    };
    const action = {
      type: 'COUNTRY_CREATE',
      payload: country,
    };

    expect(reducer(state, action)).toEqual({});
  });
});
