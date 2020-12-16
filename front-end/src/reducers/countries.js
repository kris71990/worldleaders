const defaultState = {
  countries: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'COUNTRY_LIST_GET':
      return Object.assign({}, state, { countries: payload });
    case 'COUNTRY_DELETE':
      return state.filter(country => country._id !== payload._id);
    default:
      return state;
  }
};
