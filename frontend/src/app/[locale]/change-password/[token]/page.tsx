'use client';

import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

export default function ChangePassword() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const token = pathname.split('/')[3];
  const [mutateFunction, { data, loading, error }] = useMutation(
    CHANGE_PASSWORD_MUTATION
  );
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutateFunction({
      variables: {
        newPassword: password,
        token,
      },
    });
  }

  return (
    <div className='flex h-screen w-full flex-col justify-center mt-[-65px] items-center'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='space-y-4 max-w-xs w-full'
      >
        <Label>Cambia password</Label>
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Cambia password</Button>
      </form>
    </div>
  );
}
