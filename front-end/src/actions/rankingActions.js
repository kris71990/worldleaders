import superagent from 'superagent';
import * as routes from '../utils/routes';

const languagePrevalenceFetch = countries => ({
  type: 'LANGUAGE_PREVALENCE_FETCH',
  payload: countries,
});


const languagePrevalenceFetchRequest = () => (store) => {
  return superagent.get(`${REST_API_URL}${routes.LANGUAGE_PREVALENCE_ROUTE}`)
    .then((response) => {
      store.dispatch(languagePrevalenceFetch(response.body));
      return response;
    }); 
};

export { languagePrevalenceFetch, languagePrevalenceFetchRequest };
