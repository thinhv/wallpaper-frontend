import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../config';
import { createUploadLink } from 'apollo-upload-client';

const client = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: config.GRAPHQL_ENDPOINT }),
  });

export default client;
