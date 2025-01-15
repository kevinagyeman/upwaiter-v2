'use client';

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        message
      }
      user {
        id
        username
      }
    }
  }
`;

export default function Login() {
  const [mutateFunction, { data, loading, error }] =
    useMutation(REGISTER_MUTATION);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutateFunction({
      variables: {
        username: username,
        password: password,
      },
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
