import { InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       countries: {
  //         keyArgs: false,
  //         merge(existing, incoming) {
  //           console.log(existing);
  //           console.log(incoming);
  //           let countriesUpdated = [];
  //           if (existing) {
  //             countriesUpdated = countriesUpdated.concat(existing);
  //           }
  //           if (incoming) {
  //             countriesUpdated = countriesUpdated.concat(incoming);
  //           }
  //           return countriesUpdated;
  //         },
  //       },
  //     },
  //   },
  // },
});

export const countriesCache = makeVar([]);

export default cache;
