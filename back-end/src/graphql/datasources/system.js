import { RESTDataSource } from 'apollo-datasource-rest';

export default class SystemAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.PORT}`;
  }

  systemReducer(system) {
    return {
      _id: system._id,
      countryId: system.countryId,
      countryName: system.countryName,
      capital: system.capital,
      capitalCoordinates: system.capitalCoordinates,
      independence: system.independence,
      fullName: system.fullName,
      chiefOfStateFull: system.chiefOfStateFull,
      headOfGovernmentFull: system.headOfGovernmentFull,
      chiefOfStateKeywords: system.chiefOfStateKeywords,
      headOfGovernmentKeywords: system.headOfGovernmentKeywords,
      chiefOfStateImg: system.chiefOfStateImg,
      headOfGovernmentImg: system.headOfGovernmentImg,
      electionDates: system.electionDates,
      electionsExec: system.electionsExec,
      electionResultsExec: system.electionResultsExec,
      electionsLeg: system.electionsLeg,
      electionResultsLeg: system.electionResultsLeg,
      typeOfGovernment: system.typeOfGovernment,
      typeOfGovernmentFull: system.typeOfGovernmentFull,
      lastUpdated: system.lastUpdated,
    };
  }

  // create system for new country
  postSystem({ countryId, countryName }) {
    return this.post('/system', { countryId, countryName })
      .then((newSystem) => {
        return this.systemReducer(newSystem);
      });
  }

  // get one system by country name
  getSystem(country) {
    return this.get(`/system/${country}`)
      .then((responseSystem) => {
        return this.systemReducer(responseSystem);
      });
  }

  getSystems() {
    return this.get('/systems/all')
      .then((responseSystems) => {
        return (
          Array.isArray(responseSystems) 
            ? responseSystems.map(system => this.systemReducer(system))
            : []
        );
      });
  }

  putSystem(country) {
    return this.put(`/system/${country}`)
      .then((responseSystem) => {
        return this.systemReducer(responseSystem);
      });
  }

  putLeader({ id, leaderUrl, leaderType }) {
    return this.put(`/system-leader/${id}`, { leaderUrl, leaderType })
      .then((responseSystem) => {
        return this.systemReducer(responseSystem);
      });
  }
}
