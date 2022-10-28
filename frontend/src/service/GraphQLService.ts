import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import type { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types';
import type { OperationVariables } from '@apollo/client/core/types';
import gql from 'graphql-tag';
import type { QueryOptions } from '@apollo/client/core/watchQueryOptions';
import type { MutationOptions } from '@apollo/client/core';

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
    return await this.apolloClient
      .query({
        query: gql`
          ${query}
        `,
        variables,
        ...queryOptions,
      })
      .then(({ data, error, errors }) => {
        if (error) throw new Error(error.message);
        if (errors && errors.length > 0) throw new Error(errors[0].message);
        if (!data) throw new Error('Empty data');
        return data;
      })
      .catch((error) => {
        if (
          typeof error.graphQLErrors?.at(0)?.extensions?.response?.message !==
          'undefined'
        ) {
          throw new Error(
            error.graphQLErrors?.at(0)?.extensions?.response?.message,
          );
        }
        throw new Error(error.message);
      });
  }

  async mutation(
    mutation: string,
    variables: OperationVariables = {},
    mutationOptions: Partial<MutationOptions> = {},
  ) {
    return await this.apolloClient
      .mutate({
        mutation: gql`
          ${mutation}
        `,
        variables,
        ...mutationOptions,
      })
      .then(({ data, errors }) => {
        if (errors && errors.length > 0) throw new Error(errors[0].message);
        if (!data) throw new Error('Empty data');
        return data;
      })
      .catch((error) => {
        if (
          typeof error.graphQLErrors?.at(0)?.extensions?.response?.message !==
          'undefined'
        ) {
          throw new Error(
            error.graphQLErrors?.at(0)?.extensions?.response?.message,
          );
        }
        throw new Error(error.message);
      });
  }
}

const graphQLService = new GraphQLService(apolloClient);

export default graphQLService;
