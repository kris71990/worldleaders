import superagent from 'superagent';
import * as routes from '../utils/routes';

const gdpFetch = countries => ({
  type: 'GDP_FETCH',
  payload: countries,
});

const gdpFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.COUNTRY_ROUTE}/gdp`)
    .then((response) => {
      store.dispatch(gdpFetch(response.body));
      return response;
    }); 
};

export { gdpFetch, gdpFetchRequest };
