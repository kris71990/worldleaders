export default (state = [], { type, payload }) => {
  switch (type) {
    case 'COUNTRY_GET':
      return payload;
    case 'COUNTRY_LIST_GET':
      return null;
    default:
      return state;
  }
}
