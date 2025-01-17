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
import { sendPasswordResetEmail } from '@firebase/auth';
import { auth } from '../../../firebase';

export default function ForgotPassword() {
  const [completed, setCompleted] = useState(false);
  const [email, setEmail] = useState('');

  const forgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        'Email per il recupero password inviata! Controlla la tua casella di posta.'
      );
    } catch (error: any) {
      console.error('Errore durante il recupero password:', error.message);
      if (error.code === 'auth/user-not-found') {
        alert('Nessun utente trovato con questa email.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Email non valida.');
      } else {
        alert('Qualcosa è andato storto. Riprova più tardi.');
      }
    }
  };
  return (
    <div className='flex h-screen w-full flex-col justify-center mt-[-65px] items-center'>
      <form
        onSubmit={(e) => forgotPassword(e)}
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
