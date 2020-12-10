import { InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache({

});

export const countriesCache = makeVar([]);

export default cache;
