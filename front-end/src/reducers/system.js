export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'LEADER_PHOTO_CREATE':
      return payload;
    case 'SYSTEMS_GET_TYPES':
      return null;
    case 'COUNTRY_LIST_GET':
      return null;
    default:
      return state;
  }
};
