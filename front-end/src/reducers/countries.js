const defaultState = {
  countries: [],
  existing: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'COUNTRIES_EXIST':
      return Object.assign({}, state, { existing: payload });
    case 'COUNTRIES_FETCH':
      return Object.assign({}, state, { countries: payload });
    case 'COUNTRY_LIST_GET':
      return Object.assign({}, state, { countries: payload });
    case 'COUNTRY_CREATE': {
      const destructuredPayload = { 
        countryName: payload.countryName, 
        id: payload._id,
      };
      return [destructuredPayload, ...state];
    }
    case 'COUNTRY_UPDATE':
      return state.map(country => (country._id === payload._id ? payload : country));
    case 'COUNTRY_DELETE':
      return state.filter(country => country._id !== payload._id);
    default:
      return state;
  }
};
