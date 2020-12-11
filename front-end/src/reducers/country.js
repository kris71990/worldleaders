export default (state = {}, { type }) => {
  switch (type) {
    case 'COUNTRY_LIST_GET':
      return null;
    default:
      return state;
  }
};
