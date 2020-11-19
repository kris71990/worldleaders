import { RESTDataSource } from 'apollo-datasource-rest';

export default class SystemAPI extends RESTDataSource {
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
      electionDates: {
        exec: {
          next: system.electionDates.exec.next,
          last: system.electionDates.exec.last,
        },
        leg: {
          next: system.electionDates.leg.next,
          last: system.electionDates.leg.last,
        },
      },
      electionsExec: system.electionsExec,
      electionResultsExec: system.electionResultsExec,
      electionsLeg: system.electionsLeg,
      electionResultsLeg: system.electionResultsLeg,
      typeOfGovernment: system.typeOfGovernment,
      typeOfGovernmentFull: system.typeOfGovernmentFull,
      lastUpdated: system.lastUpdated,
    };
  }

  getAllSystems() {
    return this.get('/systems/all')
      .then((response) => {
        return (
          Array.isArray(response) 
            ? response.map(system => this.systemReducer(system))
            : []
        );
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

  // async getSystem({ country }) {
  //   const response = await this.get('/country', { countryName: country });
  //   return this.systemReducer(response[0]);
  // }
}
