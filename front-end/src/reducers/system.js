export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SYSTEM_GET':
      return payload;
    case 'SYSTEM_UPDATE': 
      return payload;
    case 'SYSTEMS_GET_ALL':
      return null;
    case 'COUNTRIES_FETCH':
      return null;
    case 'COUNTRY_LIST_GET':
      return null;
    default:
      return state;
  }
};
