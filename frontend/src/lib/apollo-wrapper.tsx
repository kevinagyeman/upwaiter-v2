'use client';

import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',

    fetchOptions: {
      credentials: 'include',
    },
  });

  const cache = new NextSSRInMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          login: {
            merge(existing, incoming) {
              return incoming; // Usa direttamente i dati restituiti dalla mutazione
            },
          },
        },
      },
    },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
