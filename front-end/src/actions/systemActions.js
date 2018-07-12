import superagent from 'superagent';
import * as routes from '../utils/routes';

const systemsGetAll = systemsObj => ({
  type: 'SYSTEMS_GET_ALL',
  payload: systemsObj,
});

const systemsGetAllRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.SYSTEMS_ROUTE}`)
    .then((response) => {
      store.dispatch(systemsGetAll(response.body));
      return response;
    });
};

export { systemsGetAll, systemsGetAllRequest };
