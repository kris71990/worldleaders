import superagent from 'superagent';

const countryListGet = countryList => ({
  type: 'COUNTRY_LIST_GET',
  payload: countryList,
});

const countryListGetRequest = () => (store) => {
  return superagent.get(`${REST_API_URL}/countries/cia`)
    .then((response) => {
      store.dispatch(countryListGet(response.body));
      return response;
    });
};

export { countryListGet, countryListGetRequest };
