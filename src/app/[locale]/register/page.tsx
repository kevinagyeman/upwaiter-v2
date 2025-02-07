'use client';

import FormError from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import { createCompany } from '@/services/company.services';
import { createWaiter } from '@/services/waiter.services';
import { useUserStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Register() {
  const app = useStackApp();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: createCompany,
  //   onSuccess: () => {
  //     console.log('Azienda creata con successo!');
  //     queryClient.invalidateQueries({ queryKey: ['companies'] });
  //   },
  //   onError: (error) => {
  //     console.error('Errore nella creazione:', error);
  //   },
  // });

  const registerFormSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['company', 'waiter']).default('waiter'),
      companyName: z.string().optional(),
      vatNumber: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.role === 'company') {
          return !!data.companyName && !!data.vatNumber;
        }
        return true;
      },
      {
        message: 'Company fields are required when registering as a company',
        path: ['companyName', 'vatNumber'],
      }
    );

  type RegisterFormSchema = z.infer<typeof registerFormSchema>;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const registerForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    try {
      await app.signUpWithCredential({
        email: data.email,
        password: data.password,
        noRedirect: true,
      });

      const user = await app.getUser();
      if (user) {
        if (data.role === 'company' && data.companyName && data.vatNumber) {
          await user.update({
            clientMetadata: {
              role: data.role,
              companyTableId: user.id,
            },
          });
          await createCompany({
            id: user.id,
            name: data.companyName,
            email: data.email,
            vatNumber: data.vatNumber,
          });
        }

        if (data.role === 'waiter') {
          await user.update({
            clientMetadata: {
              role: data.role,
              waiterTableId: user.id,
            },
          });
          await createWaiter({
            id: user.id,
            email: data.email,
          });
        }
        router.push('/');
      }
    } catch (error) {
      const user = await app.getUser();
      if (user) {
        console.log(
          "Errore durante la registrazione, eliminazione dell'utente:",
          error
        );
        await user.delete();
      }
      console.log('Errore durante la registrazione:', error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <form
        onSubmit={handleSubmit(registerForm)}
        className='space-y-4 max-w-sm w-full'
      >
        <div>
          <a href={app.urls.signOut}>logout</a>
          <h1 className=' text-2xl font-semibold'>Register</h1>
          <p className='text-muted-foreground'>Accedi al tuo account</p>
        </div>
        <div className='space-y-2'>
          <div>
            <Label>Email</Label>
            <Input {...register('email')} role='email' placeholder='Email' />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>
          <div>
            <Label>Scegli una password</Label>
            <Input
              {...register('password')}
              role='password'
              placeholder='Password'
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='isCompany'
              checked={watch('role') === 'company'}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setValue('role', isChecked ? 'company' : 'waiter');
              }}
            />
            <label
              htmlFor='isCompany'
              className='text-sm font-medium leading-none'
            >
              Sono un'azienda
            </label>
          </div>
          {watch('role') === 'company' && (
            <>
              <div>
                <Label>Nome azienda</Label>
                <Input
                  {...register('companyName')}
                  role='text'
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
                  role='text'
                  placeholder='Partita IVA'
                />
                {errors.vatNumber && (
                  <FormError>{errors.vatNumber.message}</FormError>
                )}
              </div>
            </>
          )}
        </div>

        <Button role='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Loading...' : 'Register'}
        </Button>
        <Button variant='ghost' role='button' asChild className='w-full'>
          <Link href='/login'>Login</Link>
        </Button>
        {errors.root && <FormError>{errors.root.message}</FormError>}
      </form>
    </div>
  );
}
