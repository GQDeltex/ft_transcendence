import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import type { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types';
import type { OperationVariables } from '@apollo/client/core/types';
import gql from 'graphql-tag';
import type { QueryOptions } from '@apollo/client/core/watchQueryOptions';

const httpLink = createHttpLink({
  uri: `http://${import.meta.env.VITE_DOMAIN}:8080/graphql`,
  credentials: 'include',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

class GraphQLService {
  constructor(
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {}

  getApolloClient(): ApolloClient<NormalizedCacheObject> {
    return this.apolloClient;
  }

  async query(
    query: string,
    variables: OperationVariables = {},
    queryOptions: Partial<QueryOptions> = {},
  ) {
    const { data, error, errors } = await this.apolloClient.query({
      query: gql`
        ${query}
      `,
      variables,
      ...queryOptions,
    });
    if (error) throw new Error(error.message);
    if (errors && errors.length > 0) throw new Error(errors[0].message);
    if (!data) throw new Error('Empty data');
    return data;
  }
}

const graphQLService = new GraphQLService(apolloClient);

export default graphQLService;
