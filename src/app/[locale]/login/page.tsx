'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { auth, db } from '../../../firebase';
import FormError from '@/components/form-error';

export default function Login() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });

  //   // Cleanup del listener
  //   return () => unsubscribe();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const getUserData = async () => {
    try {
      // 1. Ottieni l'utente autenticato
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Nessun utente autenticato');
      }

      // 2. Recupera il documento dell'utente da Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Dati utente:', userData);
        console.log(userData);

        return userData;
      } else {
        console.log('Nessun dato trovato per questo utente');
        return null;
      }
    } catch (error) {
      console.error('Errore nel recupero dei dati utente:', error);
      throw error;
    }
  };

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  type LoginFormSchema = z.infer<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const logIn: SubmitHandler<LoginFormSchema> = async (data) => {
    console.log(data);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert(
          'Email not verified. Please check your inbox and verify your email before logging in.'
        );
        await signOut(auth);
        return;
      }
      redirect('/');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert('Something went wrong. Please try again later.');
      }
      console.error('Errore durante il login:', error);
    }
  };

  return (
    <div className='flex h-screen w-full flex-col justify-center mt-[-65px] items-center'>
      <form
        onSubmit={handleSubmit(logIn)}
        className='space-y-4 max-w-xs w-full'
      >
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Accedi al tuo account</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div>
              <Label>Email</Label>
              <Input {...register('email')} type='email' placeholder='Email' />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>
            <div>
              <Label>Cambia password</Label>
              <Input
                {...register('password')}
                type='password'
                placeholder='Password'
              />
              {errors.password && (
                <FormError>{errors.password.message}</FormError>
              )}
            </div>
            <Link
              href='/forgot-password'
              className='text-xs text-muted-foreground'
            >
              Password dimenticata?
            </Link>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? 'Loading...' : 'Login'}
            </Button>
            <Button
              variant='secondary'
              type='button'
              asChild
              className='w-full'
            >
              <Link href='/register'>Registrati</Link>
            </Button>

            {errors.root && <FormError>{errors.root.message}</FormError>}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
