import superagent from 'superagent';
import * as routes from '../utils/routes';

const systemsGetAll = systemsObj => ({
  type: 'SYSTEMS_GET_ALL',
  payload: systemsObj,
});

const systemGet = system => ({
  type: 'SYSTEM_GET',
  payload: system,
});

const systemCreate = country => ({
  type: 'SYSTEM_CREATE',
  payload: country,
});

const systemsGetAllRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.SYSTEMS_ROUTE}`)
    .then((response) => {
      store.dispatch(systemsGetAll(response.body));
      return response;
    });
};

const systemGetRequest = country => (store) => {
  return superagent.get(`${API_URL}${routes.SYSTEM_ROUTE}-${country}`)
    .then((response) => {
      store.dispatch(systemGet(response.body));
      return response;
    }); 
};

const systemCreateRequest = (countryId, countryName) => (store) => {
  console.log(countryId);
  console.log(countryName);
  return superagent.post(`${API_URL}${routes.SYSTEM_ROUTE}`)
    .send({ countryId })
    .send({ countryName })
    .then((response) => {
      store.dispatch(systemCreate(response.body));
      return response;
    });
};

export { 
  systemsGetAll, 
  systemsGetAllRequest, 
  systemGetRequest, 
  systemGet, 
  systemCreateRequest,
  systemCreate,
};
