export default (state = [], { type, payload }) => {
  switch (type) {
    case 'LANGUAGE_PREVALENCE_FETCH':
      return payload;
    case 'COUNTRY_LIST_GET':
      return null;
    default:
      return state;
  }
};
