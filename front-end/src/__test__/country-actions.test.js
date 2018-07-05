import * as countryActions from '../actions/countryActions';

describe('Country Actions', () => {
  test('COUNTRIES_FETCH should return action with type COUNTRIES_FETCH', () => {
    const countries = [
      {
        countryName: 'russia',
        id: '1234',
      },
      {
        countryName: 'syria',
        id: '2333',
      },
    ];

    expect(countryActions.countriesFetch(countries)).toEqual({
      type: 'COUNTRIES_FETCH',
      payload: countries,
    });
  });

  test('COUNTRY_GET should return action with type COUNTRY_GET', () => {
    const country = {
      countryName: 'japan',
      id: '99999',
    };

    expect(countryActions.countryGet(country)).toEqual({
      type: 'COUNTRY_GET',
      payload: country,
    });
  });

  test('COUNTRY_LIST_GET should return action with type COUNTRY_LIST_GET', () => {
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

    expect(countryActions.countryListGet(countryList)).toEqual({
      type: 'COUNTRY_LIST_GET',
      payload: countryList,
    });
  });

  test('COUNTRY_CREATE should return action with type COUNTRY_CREATE', () => {
    const country = {
      countryName: 'japan',
      id: '99999',
    };

    expect(countryActions.countryCreate(country)).toEqual({
      type: 'COUNTRY_CREATE',
      payload: country,
    });
  });

  test('COUNTRY_UPDATE should return action with type COUNTRY_UPDATE', () => {
    const country = {
      countryName: 'japan',
      id: '99999',
    };

    expect(countryActions.countryUpdate(country)).toEqual({
      type: 'COUNTRY_UPDATE',
      payload: country,
    });
  });

  test('COUNTRY_DELETE should return action with type COUNTRY_DELETE', () => {
    const country = {
      countryName: 'japan',
      id: '99999',
    };

    expect(countryActions.countryDelete(country)).toEqual({
      type: 'COUNTRY_DELETE',
      payload: country,
    });
  });
});
