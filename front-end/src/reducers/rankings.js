export default (state = [], { type, payload }) => {
  switch (type) {
    case 'GDP_FETCH':
      return payload;
    case 'POPULATION_FETCH':
      return payload;
    case 'AREA_FETCH':
      return payload;
    case 'COUNTRY_LIST_GET':
      return null;
    default:
      return state;
  }
};