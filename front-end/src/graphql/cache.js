import { InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache({
  // typePolicies: {
  //   Mutation: {
  //     fields: {
  //       country: {
  //         keyArgs: false,
  //         merge(existing, incoming) {
  //           let launches = [];
  //           if (existing && existing.launches) {
  //             launches = launches.concat(existing.launches);
  //           }
  //           if (incoming && incoming.launches) {
  //             launches = launches.concat(incoming.launches);
  //           }
  //           return {
  //             ...incoming,
  //             launches
  //           };
  //         }
  //       }
  //     }
  //   }
  // }
});

export const countriesCache = makeVar([]);

export default cache;
