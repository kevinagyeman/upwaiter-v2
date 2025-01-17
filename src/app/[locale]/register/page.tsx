'use client';

import FormError from '@/components/form-error';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from '@firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { auth, db } from '../../../firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Register() {
  const registerFormSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      isCompany: z.boolean(),
      companyName: z.string().min(1).optional(),
      vatNumber: z.string().min(1).optional(),
    })
    .refine(
      (data) => {
        if (data.isCompany) {
          // Se l'utente è un'azienda, i campi azienda sono obbligatori
          return data.companyName && data.vatNumber;
        }
        return true;
      },
      {
        message: 'Company fields are required when registering as a company',
        path: ['companyName', 'vatNumber'], // error paths
      }
    );

  type RegisterFormSchema = z.infer<typeof registerFormSchema>;

  const [showCompanyFields, setShowCompanyFields] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const registerForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const { user } = userCredential;

      if (data.isCompany) {
        await setDoc(doc(db, 'companies', user.uid), {
          email: user.email,
          companyId: user.uid,
          createdAt: Timestamp.fromDate(new Date()),
        });
      } else {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          userId: user.uid,
          createdAt: Timestamp.fromDate(new Date()),
        });
      }

      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      alert('Registration successful. Verification email sent.');
      alert('Ti abbiamo inviato un email per confermare il tuo account.');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Errore durante la registrazione. Riprova.');
    }
  };

  return (
    <>
      <div className='flex h-screen w-full flex-col justify-center mt-[-65px] items-center'>
        <form
          onSubmit={handleSubmit(registerForm)}
          className='space-y-4 max-w-xs w-full'
        >
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register to your account</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div>
                <Label>Email</Label>
                <Input
                  {...register('email')}
                  type='email'
                  placeholder='Email'
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
              </div>
              <div>
                <Label>Scegli una password</Label>
                <Input
                  {...register('password')}
                  type='password'
                  placeholder='Password'
                />
                {errors.password && (
                  <FormError>{errors.password.message}</FormError>
                )}
                <Link
                  href='/forgot-password'
                  className='text-xs text-muted-foreground'
                >
                  Password dimenticata?
                </Link>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='isCompany'
                  {...register('isCompany')}
                  onChange={() => setShowCompanyFields(!showCompanyFields)}
                />
                <label
                  htmlFor='isCompany'
                  className='text-sm font-medium leading-none'
                >
                  Sono un'azienda
                </label>
              </div>
              {showCompanyFields && (
                <>
                  <div>
                    <Label>Nome azienda</Label>
                    <Input
                      {...register('companyName')}
                      type='text'
                      placeholder='Nome azienda'
                    />
                    {errors.companyName && (
                      <FormError>{errors.companyName.message}</FormError>
                    )}
                  </div>
                  <div>
                    <Label>Partita IVA</Label>
                    <Input
                      {...register('vatNumber')}
                      type='text'
                      placeholder='Partita IVA'
                    />
                    {errors.vatNumber && (
                      <FormError>{errors.vatNumber.message}</FormError>
                    )}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
              <Button type='submit' disabled={isSubmitting} className='w-full'>
                {isSubmitting ? 'Loading...' : 'Register'}
              </Button>
              <Button
                variant='secondary'
                type='button'
                asChild
                className='w-full'
              >
                <Link href='/login'>Login</Link>
              </Button>
              {errors.root && <FormError>{errors.root.message}</FormError>}
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
