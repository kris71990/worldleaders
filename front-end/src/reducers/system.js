export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SYSTEM_GET':
      return payload;
    case 'SYSTEM_UPDATE': 
      return payload;
    case 'SYSTEMS_GET_ALL':
      return null;
    default:
      return state;
  }
};
