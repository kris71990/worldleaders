export default (state = [], { type, payload }) => {
  switch (type) {
    case 'COUNTRIES_FETCH':
      return payload;
    case 'COUNTRY_GET':
      return payload;
    case 'COUNTRY_CREATE':
      return payload;
    case 'COUNTRY_UPDATE':
      return state.map(country => (country._id === payload._id ? payload : country));
    case 'COUNTRY_DELETE':
      return state.filter(country => country._id !== payload._id);
    default:
      return state;
  }
}