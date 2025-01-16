'use client';

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { set } from 'date-fns';
const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export default function ForgotPassword() {
  const [completed, setCompleted] = useState(false);
  const [mutateFunction, { data, loading, error }] = useMutation(
    FORGOT_PASSWORD_MUTATION
  );
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutateFunction({
      variables: {
        email,
      },
    });
    setCompleted(true);
  }

  return (
    <div className='flex h-screen w-full flex-col justify-center mt-[-65px] items-center'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='space-y-4 max-w-xs w-full'
      >
        <Card>
          <CardHeader>
            <CardTitle>Password Dimenticata</CardTitle>
            <CardDescription>Inserisci la tua email</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Email</Label>
            <Input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
          <CardFooter className='flex gap-4'>
            <Button type='submit' className='w-full'>
              Invia Email
            </Button>
            {completed && (
              <>Se la mail esiste ti abbiamo inviato una email al tuo account</>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
