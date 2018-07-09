import superagent from 'superagent';
import * as routes from '../utils/routes';

const gdpFetch = countries => ({
  type: 'GDP_FETCH',
  payload: countries,
});

const populationFetch = countries => ({
  type: 'POPULATION_FETCH',
  payload: countries,
});

const areaFetch = countries => ({
  type: 'AREA_FETCH',
  payload: countries,
});

const languagePrevalenceFetch = countries => ({
  type: 'LANGUAGE_PREVALENCE_FETCH',
  payload: countries,
});

const gdpFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.GDP_ROUTE}`)
    .then((response) => {
      store.dispatch(gdpFetch(response.body));
      return response;
    }); 
};

const populationFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.POPULATION_ROUTE}`)
    .then((response) => {
      store.dispatch(populationFetch(response.body));
      return response;
    }); 
};

const areaFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.AREA_ROUTE}`)
    .then((response) => {
      store.dispatch(areaFetch(response.body));
      return response;
    }); 
};

const languagePrevalenceFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.LANGUAGE_PREVALENCE_ROUTE}`)
    .then((response) => {
      store.dispatch(areaFetch(response.body));
      return response;
    }); 
};

export { 
  gdpFetch, 
  gdpFetchRequest,
  populationFetch,
  populationFetchRequest,
  areaFetch,
  areaFetchRequest,
  languagePrevalenceFetch,
  languagePrevalenceFetchRequest,
};
