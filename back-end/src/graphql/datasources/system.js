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
      headOfGovernmentImg: system.headOfGovernmentFull,
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

  // get one system by country name
  getSystem(country) {
    return this.get(`/system/${country}`)
      .then((responseSystem) => {
        return this.systemReducer(responseSystem);
      });
  }

  // create system for new country
  postSystem({ countryId, countryName }) {
    return this.post('/system', { countryId, countryName })
      .then((newSystem) => {
        return this.systemReducer(newSystem);
      });
  }

  // get number of systems of a type
  // getSystemCount() {
  //   return this.get('/systems/all');
  // }

  // async getElections() {
  //   const response = await this.get('/systems/elections');
  //   return (
  //     Array.isArray(response)
  //       ? response.map(system => this.systemReducer(system))
  //       : []
  //   );
  // }
}
