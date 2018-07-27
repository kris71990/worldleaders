import superagent from 'superagent';
import * as routes from '../utils/routes';

const flagCreate = country => ({
  type: 'FLAG_CREATE',
  payload: country,
});

const leaderPhotoCreate = country => ({
  type: 'LEADER_PHOTO_CREATE',
  payload: country,
});

const flagCreateRequest = (flag, countryId) => (store) => {
  delete flag.flagUrlDirty;
  delete flag.flagUrlError;
  const { flagUrl } = flag;

  return superagent.post(`${API_URL}/photos${routes.FLAG_ROUTE}`)
    .send({ flagUrl, countryId })
    .then((response) => {
      store.dispatch(flagCreate(response.body));
      return response;
    });
};

const headOfGovernmentPhotoCreateRequest = (leader, systemId) => (store) => {
  delete leader.leaderUrlDirty;
  delete leader.leaderUrlError;
  const { leaderUrl } = leader;

  return superagent.post(`${API_URL}/photos/hog`)
    .send({ leaderUrl, systemId })
    .then((response) => {
      store.dispatch(leaderPhotoCreate(response.body));
      return response;
    });
};

const headOfStatePhotoCreateRequest = (leader, systemId) => (store) => {
  delete leader.leaderUrlDirty;
  delete leader.leaderUrlError;
  const { leaderUrl } = leader;

  return superagent.post(`${API_URL}/photos/hos`)
    .send({ leaderUrl, systemId })
    .then((response) => {
      store.dispatch(leaderPhotoCreate(response.body));
      return response;
    });
};

export { 
  flagCreateRequest, 
  flagCreate, 
  headOfGovernmentPhotoCreateRequest, 
  headOfStatePhotoCreateRequest,
  leaderPhotoCreate, 
};
