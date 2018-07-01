import superagent from 'superagent';
import * as routes from '../utils/routes';

/* backend routes - country router
    POST /countries
    GET /countries/all
    GET /countries/list
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

const countryListGet = countryList => ({
  type: 'COUNTRY_LIST_GET',
  payload: countryList,
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

const countryListGetRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.COUNTRY_ROUTE}/list`)
    .then((response) => {
      console.log(response);
      store.dispatch(countryListGet(response.body));
      return response;
    })
}

const countryGetRequest = country => (store) => {
  return superagent.get(`${API_URL}${routes.COUNTRY_ROUTE}/${country._id}`)
    .then((response) => {
      store.dispatch(countryGet(response.body));
      return response;
    }); 
}


const countryCreateRequest = country => (store) => {
  delete country.countryNameDirty;
  delete country.countryNameError;
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
  countryDeleteRequest,
  countryListGetRequest
};
