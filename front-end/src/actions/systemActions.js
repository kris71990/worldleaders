import superagent from 'superagent';
import * as routes from '../utils/routes';

const systemsGetAll = systemsObj => ({
  type: 'SYSTEMS_GET_ALL',
  payload: systemsObj,
});

const systemUpdate = system => ({
  type: 'SYSTEM_UPDATE',
  payload: system,
});

const systemsGetTypesRequest = () => (store) => {
  return superagent.get(`${REST_API_URL}/systems/types`)
    .then((response) => {
      store.dispatch(systemsGetAll(response.body));
      return response;
    });
};


const systemUpdateRequest = country => (store) => {
  return superagent.put(`${API_URL}${routes.SYSTEM_ROUTE}/${country.countryName}`)
    .send(country)
    .then((response) => {
      store.dispatch(systemUpdate(response.body));
      return response;
    });
};

export { 
  systemsGetAll, 
  systemsGetTypesRequest, 
  systemUpdateRequest,
  systemUpdate,
};
