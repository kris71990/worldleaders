import superagent from 'superagent';
import * as routes from '../utils/routes';

const flagCreate = flag => ({
  type: 'FLAG_CREATE',
  payload: flag,
});

const flagCreateRequest = (flag, countryId) => (store) => {
  delete flag.flagUrlDirty;
  delete flag.flagUrlError;
  const { flagUrl } = flag;
  return superagent.post(`${API_URL}${routes.FLAG_ROUTE}`)
    .send({ flagUrl, countryId })
    .then((response) => {
      console.log(response);
      store.dispatch(flagCreate(response.body));
      return response;
    });
};

export { flagCreateRequest, flagCreate };
