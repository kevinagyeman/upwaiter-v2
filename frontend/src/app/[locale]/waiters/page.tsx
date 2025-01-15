'use client';

import { gql, useQuery } from '@apollo/client';
import React from 'react';

const WAITERS_QUERY = gql`
  query {
    users {
      email
    }
  }
`;
export default function Waiters() {
  const { error, data } = useQuery(WAITERS_QUERY);
  const waiters = data?.users;

  return (
    <>
      {!waiters ? (
        <div>Loading...</div>
      ) : (
        <div>
          {waiters.map((waiter: any) => (
            <p>{waiter.email}</p>
          ))}
        </div>
      )}
    </>
  );
}
