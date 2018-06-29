import superagent from 'superagent';
import routes from '../utils/routes';

/* backend routes - country router
    POST /countries
    GET /countries/all
    GET /countries/:id
    PUT /countries/:id
    DELETE /countries/:id
*/

// regular actions
const countriesFetch = countries => ({
  type: 'COUNTRIES_FETCH',
  payload: countries,
});

const countryGet = country => ({
  type: 'COUNTRY_GET',
  payload: country,
});

const countryCreate = country => ({
  type: 'COUNTRY_CREATE',
  payload: country,
});

const countryUpdate = country => ({
  type: 'COUNTRY_UPDATE',
  payload: country,
});

const countryDelete = country => ({
  type: 'COUNTRY_DELETE',
  payload: country,
});

// async actions that call backend API
const countriesFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.COUNTRY_ROUTE}/all`)
    .then((response) => {
      store.dispatch(countriesFetch(response.body));
      return response;
    }); 
}

const countryGetRequest = country => (store) => {
  return superagent.get(`${API_URL}${routes.COUNTRY_ROUTE}/${country._id}`)
    .then((response) => {
      store.dispatch(countryGet(response.body));
      return response;
    }); 
}

const countryCreateRequest = country => (store) => {
  return superagent.post(`${API_URL}${routes.COUNTRY_ROUTE}`)
    .send(country)
    .then((response) => {
      store.dispatch(countryCreate(response.body));
      return response;
    });
}

const countryUpdateRequest = country => (store) => {
  return superagent.put(`${API_URL}${routes.COUNTRY_ROUTE}/${country._id}`)
    .send(country)
    .then((response) => {
      store.dispatch(countryUpdate(response.body));
      return response;
    });
}

const countryDeleteRequest = country => (store) => {
  return superagent.post(`${API_URL}${routes.COUNTRY_ROUTE}/${country._id}`)
    .then((response) => {
      store.dispatch(countryDelete(country));
      return response;
    });
}

export { 
  countriesFetchRequest, 
  countryGetRequest, 
  countryCreateRequest, 
  countryUpdateRequest, 
  countryDeleteRequest 
};
