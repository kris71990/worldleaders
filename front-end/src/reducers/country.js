export default (state = [], { type, payload }) => {
  switch (type) {
    case 'COUNTRY_GET':
      return payload;
    case 'COUNTRY_LIST_GET':
      return state;
    default:
      return state;
  }
}
