export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SYSTEMS_GET_ALL':
      return payload;
    case 'COUNTRY_LIST_GET':
      return null;
    default: 
      return state;
  }
};
