export default (state = [], { type, payload }) => {
  switch (type) {
    case 'ELECTIONS_GET_ALL':
      return payload;
    default: 
      return state;
  }
};
