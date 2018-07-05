import reducer from '../reducers/countries';

describe('Countries Reducer', () => {
  test('COUNTRIES_FETCH should fetch all countries', () => {
    const state = [];
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
      type: 'COUNTRIES_FETCH',
      payload: countryList, 
    };

    expect(reducer(state, action)).toEqual(countryList);
    expect(reducer(state, action)).toBeInstanceOf(Object);
  });

  test('COUNTRY_LIST_GET should return list of countries', () => {
    const state = [];
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

    expect(reducer(state, action)).toEqual(countryList);
    expect(reducer(state, action)).toBeInstanceOf(Object);
  });

  test('COUNTRY_CREATE should return a created country added to state', () => {
    const state = [{ countryName: 'iran', id: '123' }];
    const country = {
      countryName: 'lesotho',
      id: '123456',
    };

    const action = {
      type: 'COUNTRY_CREATE',
      payload: country,
    };

    expect(reducer(state, action)).toBeInstanceOf(Array);
    expect(reducer(state, action)).toHaveLength(2);
    expect(reducer(state, action)[0].countryName).toEqual('lesotho');
    expect(reducer(state, action)[1].countryName).toEqual('iran');
  }); 

  test('COUNTRY_UPDATE should return an update country', () => {
    const state = [
      { 
        countryName: 'lesotho', 
        _id: '1234', 
        typeOfGovernment: 'democracy',
      },
    ];

    const country = {
      countryName: 'lesotho',
      _id: '1234',
      typeOfGovernment: 'dictatorship',
    };

    const action = {
      type: 'COUNTRY_UPDATE',
      payload: country,
    };

    expect(reducer(state, action)).toBeInstanceOf(Array);
    expect(reducer(state, action)).toHaveLength(1);
    expect(reducer(state, action)[0].countryName).toEqual('lesotho');
    expect(reducer(state, action)[0].typeOfGovernment).toEqual('dictatorship');
  }); 

  test('COUNTRY_DELETE should remove country', () => {
    const state = [
      { 
        countryName: 'lesotho', 
        _id: '1234', 
        typeOfGovernment: 'democracy',
      },
      { 
        countryName: 'egypt', 
        _id: '55555', 
        typeOfGovernment: 'military junta',
      },
    ];

    const country = {
      _id: '1234',
    };

    const action = {
      type: 'COUNTRY_DELETE',
      payload: country,
    };

    expect(reducer(state, action)).toBeInstanceOf(Array);
    expect(reducer(state, action)).toHaveLength(1);
    expect(reducer(state, action)[0].countryName).toEqual('egypt');
    expect(reducer(state, action)[0].typeOfGovernment).toEqual('military junta');
  }); 

  test('DEFAULT returns state', () => {
    const state = {};
    const country = {
      countryName: 'latvia',
      id: '82973931',
    };
    const action = {
      type: 'COUNTRY_GET',
      payload: country,
    };

    expect(reducer(state, action)).toEqual({});
  });
});
