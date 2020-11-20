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

  systemTypesReducer(count) {
    return {
      dictatorship: count.dictatorship,
      communistState: count.communistState,
      parliamentaryDemocracy: count.parliamentaryDemocracy,
      presidentialDemocracy: count.presidentialDemocracy,
      democracy: count.democracy,
      parliamentaryRepublic: count.parliamentaryRepublic,
      presidentialRepublic: count.presidentialRepublic,
      constitutionalRepublic: count.constitutionalRepublic,
      theocraticRepublic: count.theocraticRepublic,
      republic: count.republic,
      parliamentaryMonarchy: count.parliamentaryMonarchy,
      constitutionalMonarchy: count.constitutionalMonarchy,
      presidentialFederation: count.presidentialFederation,
      federation: count.federation,
      unknown: count.unknown,
    };
  }

  // get one system by country name
  getSystem(country) {
    return this.get(`/system/${country}`)
      .then((responseSystem) => {
        return this.systemReducer(responseSystem);
      });
  }

  // get number of systems of a type
  getSystemCount() {
    return this.get('/systems/all')
      .then((responseSystems) => {
        console.log(responseSystems);
        return this.systemTypesReducer(responseSystems);
      });
  }

  // async getElections() {
  //   const response = await this.get('/systems/elections');
  //   return (
  //     Array.isArray(response)
  //       ? response.map(system => this.systemReducer(system))
  //       : []
  //   );
  // }
}
