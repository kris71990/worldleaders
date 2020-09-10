import superagent from 'superagent';

const electionsGetAll = electionsObj => ({
  type: 'ELECTIONS_GET_ALL',
  payload: electionsObj,
});

const electionsGetAllRequest = () => (store) => {
  return superagent.get(`${API_URL}/systems-elections`)
    .then((response) => {
      store.dispatch(electionsGetAll(response.body));
      return response;
    });
};


export default electionsGetAllRequest;
