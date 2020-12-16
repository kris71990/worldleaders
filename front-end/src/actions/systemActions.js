import superagent from 'superagent';

const systemsGetAll = systemsObj => ({
  type: 'SYSTEMS_GET_TYPES',
  payload: systemsObj,
});

const systemsGetTypesRequest = () => (store) => {
  return superagent.get(`${REST_API_URL}/systems/types`)
    .then((response) => {
      store.dispatch(systemsGetAll(response.body));
      return response;
    });
};

export { systemsGetAll, systemsGetTypesRequest };
